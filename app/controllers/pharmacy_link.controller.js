module.exports = function(dirname){
    var PharmacyLink = require('mongoose').model('pharmacyLink');
    var Prescription = require('mongoose').model('Prescription');
    var hmSession = require('./session.controller.js');

    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');
    
    var c = {};
 
    c.getPharmacyLinkPage = function(req, res, next){
        console.log("    getPharmacyLinkPage");
        if (req.expired){
            console.log("        expired");
            res.send("expired link"); // TODO -> have nice page for this
        } else if (req.pharmacy_link){
            console.log("        pharmacy_link");
            
            req.session.pharmacy_link = req.pharmacy_link;
            res.sendFile(dirname + "/app/views/pharmacy_links/pharmacy_link.html");
        } else {
            res.send("ok");
        }
        /* TODO -> access denied page
        } else {
            res.sendFile(dirname + "/access_denied.html");
        }
        */
    };

    c.getCurrentPharmacyLink = function(req, res, next){
        if (req.session.pharmacy_link) {
            res.json(req.session.pharmacy_link);
        } else {
            res.json({});
        }
    } 

    c.create = function(req, res, next){
        if (isEmpty(req.body)) return reqError(res, 400, "body", "missing");
        if (!req.session.patient) { 
            return reqError(res, 403, {
                logged_in : false,
                msg : "not logged in as a patient"
            });
        }

        var newPharmacyLink = new PharmacyLink(req.body);
        newPharmacyLink.save(function(err){
            if (err) return reqError(res, 500, err);
            console.log(req.body.prescription_id)
            Prescription.update({
                _id : req.body.prescription_id
            },
            {
                $addToSet : {
                    'pharmacy_links'
                     : newPharmacyLink._id
                    }
            },
            function(err, updatedPrescription){
                if(err) return reqError(res, 500, err);
                res.status(202).json({
                    pharmacy_link_url : "/pharmacy_link/id/"+newPharmacyLink._id,
                    updatedPrescription : updatedPrescription
                });
            });

        });
    };

    var doctorPublicAttributes = "_id minc name_first name_last specialization phone_number";
    var PatientPublicAttributes = "health_card_number name_last name_first birthday address phone_number gender allergies"
    
    c.findById = function(req, res, next){
        if (!req.params.pharmacyLink_id) return reqError(res, 400, "pharmacyLink_id param", "missing");
        var pharmacyLink_id = req.params.pharmacyLink_id;
        
        PharmacyLink.findOne({ _id : pharmacyLink_id })
        .populate({ 
            path : 'prescription_id',
            populate : [{
                path : 'patient',
                model : 'Patient',
                select : PatientPublicAttributes
            },
            {
                path : 'doctor',
                model : 'Doctor',
                select : doctorPublicAttributes
            }],
            model : "Prescription"

        })        
        .exec(function(err, pharmacyLink){
            if (err) return reqError(res, 500, err);

            var now = (new Date()).getTime();
            var oldDate = pharmacyLink.date_generated.getTime();
            var day = 24 * 60 *60 * 1000;
         
            if (now - oldDate > day) {
                req.expired = true;
                // reqError(res, 400, "pharmacy link", "expired")
            } else {
                req.pharmacy_link = pharmacyLink;
                console.log(JSON.stringify(pharmacyLink));
            }
            next();
        });
    };

    c.getByPrescriptionId = function (req,res,next){
        if (!req.params.prescription_id) return reqError(res, 400, "prescription_id param", "missing");
        var prescription_id = req.params.prescription_id;
        PharmacyLink.find({ prescription_id :  prescription_id}, 
            function(err, pharmacyLinks){
                res.json({
                    pharmacyLinksForPrescriptionId : pharmacyLinks});
        });
    };

    c.index = function (req,res,next){
        PharmacyLink.find({}, function(err,pharmacyLink){
            if(err) reqError(res,500,err);
            res.json(pharmacyLink);
        });
    };
    return c;
 };   