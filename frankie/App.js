var request = require('request');
//var session = require('express-session');
var url = require('url');
var express = require('express');
var path = require('path');
var fs=require('fs');
var bodyParser = require('body-parser');
var uuid = require('uuid');

var app = express();






//var config = require(process.env.CONF||'/etc/nodejs-config/doby.json').frontend;

var logMiddleware = function() {
  return function(req, res, next) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(ip);
    req.log = function () {
      var first_parameter = arguments[0];
      var other_parameters = Array.prototype.slice.call(arguments, 1);

      function formatConsoleDate (date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return ip+' [' +
        day+
        '/'+
        month+
        '/'+
        year+
        ' '+
        ((hour < 10) ? '0' + hour: hour) +
        ':' +
        ((minutes < 10) ? '0' + minutes: minutes) +
        ':' +
        ((seconds < 10) ? '0' + seconds: seconds) +
                   //'.' +
                   //('00' + milliseconds).slice(-3) +
                   '] ';
                 }

                 console.log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
               };

               next();
             }
           }



           app.use(bodyParser.json());

//app.use(sessionMiddleware);
app.use(logMiddleware());


app.use(function(req, res, next) {
//loguear todo
  //console.log(req.url);
  next();
});

app.use("/ale", function(req, res, next) {
//loguear todo
console.log(req);
res.send("ale");

});

app.get("/apis", function(req, res, next) {
  fs.readFile('message.txt', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

//Parse da json
app.post("/apis", function(req, res, next) {
  console.log(req.body);
  var boolAdd= true; //flag to check if the element name already exist on the list

  fs.readFile('message.txt','utf8', (err, data) => {
    if (err) throw err;
    var fileJson=JSON.parse(data); //list of objects from file
    for(var i in fileJson){
      //compare if name exist
        if(fileJson[i].name.toUpperCase()==req.body.name.toUpperCase()){ 
           console.log(fileJson[i].name.toUpperCase()+" "+req.body.name.toUpperCase());
           boolAdd= false;
        }
      }
      console.log(boolAdd);
      if(boolAdd){
      var myJson={"id": uuid.v4(),
      "name":req.body.name,
      "address":req.body.address
      };     
    fileJson.push(myJson);
  }else res.send("This Api already exist, try /apis -> GET in order to check the existent api addresses, "+
    "then  you can use /apis -> PUT to edit it");


  fs.writeFile('message.txt', JSON.stringify(fileJson), function (err) {
    if (err) {
      return console.log("Error writing file: " + err);
    }
    res.send(fileJson);
    console.log(fileJson);
  });
});
});



app.delete("/apis", function(req, res, next) {
  var deleteFlag=false;
  fs.readFile('message.txt','utf8', (err, data) => {
    if (err) throw err;
    var fileJson=JSON.parse(data); //list of objects from file
    for(var i in fileJson){
      //compare if name exist
      if(fileJson[i].id==req.body.id){
        console.log(fileJson[i].id==req.body.id);
        console.log(fileJson[i].id); 
        console.log(req.body.id);
       fileJson.splice(i,1);
       deleteFlag=true;
     }
   }
   if(deleteFlag){
    fs.writeFile('message.txt', JSON.stringify(fileJson), function (err) {
      if (err) {
        return console.log("Error writing file: " + err);
      }
      res.send(fileJson);
      console.log(fileJson);
    });
  }else res.send("Element not found, check the element id you are trying to delete");
  });
});

app.put("/apis", function(req, res, next) {
  var editFlag=false;
  fs.readFile('message.txt','utf8', (err, data) => {
    if (err) throw err;
    var fileJson=JSON.parse(data); //list of objects from file
    for(var i in fileJson){
      //compare if name exist
      if(fileJson[i].id==req.body.id){
        console.log(fileJson[i].id==req.body.id);
        console.log(fileJson[i].id); 
        console.log(req.body.id);
       fileJson[i].name=req.body.name;
       fileJson[i].address=req.body.address;
       editFlag=true;
     }
   }
   if(editFlag){
    fs.writeFile('message.txt', JSON.stringify(fileJson), function (err) {
      if (err) {
        return console.log("Error writing file: " + err);
      }
      res.send(fileJson);
      console.log(fileJson);
    });
  }else res.send("Element not found, check the element id you are trying to edit");
  });
});


  app.use('/', express.static(path.join(__dirname, 'App')));

  app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));


  var ser = app.listen(7886);

/*app.use('/backend', function(req, res, next){ //isAuthenticated(),
  if(req.session){
    var options = {
      url: config.backendProtocol+'://'+config.backendIP+req.url,//https
      headers: {
        // 'userSystemId': req.session.uid
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      }
    };
  }else{
    var options = {
      url: config.backendProtocol+'://'+config.backendIP+req.url
    };
  }
  console.log(options.url)
  req.pipe(request(options)).pipe(res);
});

function isAuthenticated(){


  return function(req, res, next) {
// console.log("aunt", req.sesssion.uid);
    if (req.session.uid){
         //puede pasar
      next();
    }
    else{
         //no puede pasar
           //next();
    }
  }

}*/

process.on('uncaughtException', function (exception) {
  // handle or ignore error
  console.log("error")
  console.log(exception);
});