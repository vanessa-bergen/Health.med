module.exports = function(app){
  var treatment_controller = require('../controllers/treatment.controller.js');
  treatment_controller = treatment_controller(); 
  //runs the function which creates var c ie the contorller and all of its methos and puts the output "c" in treatment_controller
  
  app.post('/treatment', treatment_controller.create);
  app.get('/treatment/:treatment_id', treatment_controller.get);

  app.param('treatment_id', treatment_controller.findById);

  app.get('/treatment', treatment_controller.index);

  console.log ('        treatment routes initialized');
    
};
