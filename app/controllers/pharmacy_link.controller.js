module.exports = function(){
    var PharmacyLink = require('mongoose').model('pharmacyLink');
    var Perscription = require('mongoose').model('Prescription');
    var Doctor = require('mongoose').model('Doctor');
    var hmSession = require('./session.controller.js');

    var reqError = require('./reqError.js');
    var isEmpty = require('./isEmpty.js');
    
    var c = {};
 
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

            res.status(201).json({
                pharmacy_link_url : "http://52.32.102.227/"+newPharmacyLink._id
            });
        });
    };

    var doctorPublicAttributes = "_id minc name_first name_last specialization";
    var PatientPublicAttributes = "health_card_number name_last name_first birthday address gender allergies"
    c.getById = function(req, res, next){
        if (!req.params.pharmacyLink_id) return reqError(res, 400, "pharmacyLink_id param", "missing");
        var pharmacyLink_id = req.params.pharmacyLink_id;
        PharmacyLink.findOne({ _id : pharmacyLink_id })
        .populate({ path : 'prescription',
            populate : [{
                path : 'patient',
                model : 'Patient',
                select : PatientPublicAttributes
            },
            {
                path : 'doctor',
                model : 'Doctor',
                select : doctorPublicAttributes
            }]
        })        
        .exec(function(err, pharmacyLink){
            if (err) return reqError(res, 500, err);
            var moment = require('moment');
            var startDate = moment(pharmacyLink.date_generated, 'YYYY-M-DD HH:mm:ss');
            //Date endDateOld = Date.now;
            var endDate = moment(Date.now, 'YYYY-M-DD HH:mm:ss')
            var hoursDiff = endDate.diff(startDate, 'hours')
            if(hoursDiff>24) return reqError(res, 400, "pharmacy link", "expired")
            
            res.json(pharmacyLink);
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