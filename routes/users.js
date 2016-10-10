'use strict';
var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//router.get('/', function(req, res) {
 //   res.render('index', { title: 'This is the conactus app.' });
//});


/* GET contactus page. */
//var inspectors =JSON.parse(fs.readFileSync('./inspector.json'));
var sess;
var conData;
var con;
var success;
router.get('/contactus', function(req, res) {
    sess =req.session;
    sess.success= true;
    conData ={csrfToken: req.csrfToken(),success:sess.success};
    res.render('contactus',{con:conData});

});

//post data
router.post('/contactus', function(req, res) {
    //res.locals ={ csrf: req.csrfToken()};
    console.log('check1');
   req.assert('fullName','Full Name is required').notEmpty();
   req.assert('message','Message is required').notEmpty();
console.log('check1');
   var errors = req.validationErrors();
   if(errors){
       sess.success=false;
       conData ={csrfToken: req.csrfToken(),errors:errors,success:sess.success};
       console.log(errors);
       res.render('contactus',{con:conData});
   }
   else{       
        var data ={fullName: req.body.fullName,type:req.body.type,message:req.body.message};
        console.log(data.fullName);
        fs.writeFile('./contactus.txt',JSON.stringify(data),function(error){
            if(error) throw error;

            console.log('File successfully written.');           
        });       
         res.send("Thank you!.");      
   }
  
});

module.exports = router;
