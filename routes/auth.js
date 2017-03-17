var express = require('express');
var router = express.Router();
var User = require('../models/user');
var _ = require('lodash');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  User.authenticate()(req.body.username, req.body.password,(err, user, options)=>{
    if (err) return res.status(500).json({
      success:false,
      title:'Error',
      response: err
    });
    if (user === false) {
      console.log("unauthroized")
      res.json({
        success: false,
        title: 'Error',
        response: options.message
      });
    } else {
        req.login(user,(err)=>{
           if (err) return res.status(500).json({
            success:false,
            title:'Error',
            response:err
          });
          console.log(req.user);
          res.status(200).json({
            success: true,
            title: 'Success',
            response: user,
            redirect:'/todos'
          });
        });
      }
  });
});

function checkDataBeforeDb(data){
  let err={
    errors:{}
  };
  var r = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if(data.password.length<6){
    err.errors["password"] = {message:'Password should be at least 6 characters'};
  }
  if(data.firstName.length===0){
    err.errors["firstName"] = {message:'First name should not be empty'};
  }
  if(data.lastName.length===0){
    err.errors["lastName"] = {message:'Last mame name should not be empty'};
  }
  if(r.test(data.username)===false){
    err.errors["username"]= {message:'Invalid email'};
  }
  return err;
}

router.post('/signup', function(req, res){
  let checkErr = checkDataBeforeDb(req.body);
  if(!_.isEmpty(checkErr.errors)){
    return res.json({
      success:false,
      response: checkErr
    });
  }
  User.register(new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }), req.body.password, function(err, user){
    if(err){  
      return res.send({
        success: false,
        response: err
      }); 
    }
    console.log("onsuccess")
    return res.status(201).json({
      success: true,
      redirect: '/login'
    });
  });
});


router.get('/getUser', (req, res)=>{
  const user = req.user;
  console.log(user);
  res.json({
    response: user
  });
});


router.post('/logout', (req, res)=>{
  req.logout();
  req.session.destroy();
  res.json({
    redirect:'/'
  });
});

module.exports = router;
