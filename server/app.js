const express = require('express');
const bodyParser = require('body-parser');
var mongo = require('mongodb');
var request = require('request');
var cors = require('cors');
const NodeCouchDb = require('node-couchdb');
var merge = require('lodash.merge');
const app = express();



app.use(cors());







// node-couchdb instance with default options
const couch = new NodeCouchDb();



// node-couchdb instance with Memcached
// const MemcacheNode = require('node-couchdb-plugin-memcached');
// const couchWithMemcache = new NodeCouchDb({
//     cache: new MemcacheNode
// });



// not admin party
const couchAuth = new NodeCouchDb({
  auth: {
      user: 'mahesh',
      pass: 'mahesh123'
  }
});



couch.listDatabases().then(function(dbs){
 console.log(dbs)
});


const dbName = "newsdb";
const viewUrl = "_design/view3/_view/id";


app.get('/getData', function (req, res) {
  console.log("comming here : ");
  couch.get(dbName, viewUrl).then(function (data, headers, status) {
    res.send(data);
    console.log("data is here : "+data);
},
  function (err) {
    console.log(err);
  });
});




const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
//app.use(express.static(path.join(__dirname, 'public'))); // 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



var CnnApiKey = "te7k5fGXivpr";
var CnnProjectToken = "tbTVcF961m1J";
var CnnRunToken = "tYe5_0uKNWSB";


var JagranApiKey = "te7k5fGXivpr";
var JagranProjectToken = "tkS1MPZMTGLw";
var JagaranRunToken = "tMjRD31S4Spc";


var BccApiKey = "te7k5fGXivpr";
var BccProjectToken = "tLmkJKO9bpqG";
var BccRunToken = "tJ_QP-h_0tZC";



var cnnNews;
var bccNews;
var jagranNews;

//run project
// request({
//     uri: 'https://www.parsehub.com/api/v2/projects/'+projectToken+'/run',
//     method: 'POST',
//     form: {
//       api_key: apiKey,
//       start_url: "http://www.example.com",
//       start_template: "main_template",
//       start_value_override: "{\"query\": \"San Francisco\"}",
//       send_email: "1"
//     }
//   }, function(err, resp, body) {
//     console.log("run project : "+body);
//   });

//get run
//   request({
//     uri: 'https://www.parsehub.com/api/v2/runs/'+runToken+'',
//     method: 'GET',
//     qs: {
//       api_key: apiKey
//     }
//   }, function(err, resp, body) {
//     console.log("get run : "+body);
//   });


// //get data for run

// request({
//     uri: 'https://www.parsehub.com/api/v2/runs/'+runToken+'/data',
//     method: 'GET',
//     gzip: true,
//     qs: {
//       api_key: apiKey,
//       format: "csv"
//     }
//   }, function(err, resp, body) {
//     console.log("get data for run : "+body);
//   });


// get last run data CNN news
request({
    uri: 'https://www.parsehub.com/api/v2/projects/'+CnnProjectToken+'/last_ready_run/data',
    method: 'GET',
    gzip: true,
    qs: {
      api_key: CnnApiKey,
      format: "json"
    }
  }, function(err, resp, body) {
    this.cnnNews = JSON.parse(body);
    let cnnBreaking =  this.cnnNews.breaking;
    let cnnBusiness =  this.cnnNews.business;
    let cnnEntertainment =  this.cnnNews.entertainment;
    let cnnPolitics =  this.cnnNews.politics;
    let cnnSport =  this.cnnNews.sport;
  //  let cnnTechnology =  this.cnnNews.technology;

//console.log(this.cnnNews.business);





// get last run data BCC news
request({
  uri: 'https://www.parsehub.com/api/v2/projects/'+BccProjectToken+'/last_ready_run/data',
  method: 'GET',
  gzip: true,
  qs: {
    api_key: BccApiKey,
    format: "json"
  }
}, function(err, resp, body) {
  this.bccNews = JSON.parse(body);
    let bccBreaking =  this.bccNews.breaking;
    let bccBusiness =  this.bccNews.business;
    let bccEntertainment =  this.bccNews.entertainment;
    let bccPolitics =  this.bccNews.politics;
    let bccSport =  this.bccNews.sport;
    let bccTechnology =  this.bccNews.technology;




//console.log(bccObj);
request({
  uri: 'https://www.parsehub.com/api/v2/projects/'+JagranProjectToken+'/last_ready_run/data',
  method: 'GET',
  gzip: true,
  qs: {
    api_key: JagranApiKey,
    format: "json"
  }
}, function(err, resp, body) {
  this.jagranNews =  JSON.parse(body);
//console.log(data.business);
let jagranBreaking =  this.jagranNews.breaking;
let jagranBusiness =  this.jagranNews.business;
let jagranEntertainment =  this.jagranNews.entertainment;
let jagranPolitics =  this.jagranNews.politics;
//let jagranSport =  this.jagranNews.sport;
let jagranTechnology =  this.jagranNews.technology;
//console.log(this.jagranNews.business);


var allNews = {Breaking: [...cnnBreaking, ...bccBreaking, ...jagranBreaking], Business: [...cnnBusiness, ...bccBusiness, ...jagranBusiness], Entertainment: [...cnnEntertainment, ...bccEntertainment, ...jagranEntertainment], Politics: [...cnnPolitics, ...bccPolitics, ...jagranPolitics],
   Sport: [...cnnSport, ...bccSport], Technology: [...bccTechnology, ...jagranTechnology]};

//console.log(allNews);



    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
       // var dbo = db.db("newsdb2");
       var myobj = allNews;

couch.insert("testing",myobj).then(({data, headers, status}) => {
     console.log("data : "+data);
  // data is json response
  // headers is an object with all response headers
  // status is statusCode number
}, err => {
  // either request error occured
  // ...or err.code=EDOCCONFLICT if document with the same id already exists
});
});


});
});
//var obj4 = {business: [...cnnObj, ...jagranObj]};


//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//        // var dbo = db.db("newsdb2");
//        var myobj = JSON.parse(body);

// couch.insert("newsdb",myobj).then(({data, headers, status}) => {
//      console.log("data : "+data);
//   // data is json response
//   // headers is an object with all response headers
//   // status is statusCode number
// }, err => {
//   // either request error occured
//   // ...or err.code=EDOCCONFLICT if document with the same id already exists
// });
 });
      
//       //  myobj["Name"]="Mahesh";
//       //  myobj['theTeam']={"teamId":"4","status":"pending"};
//       //  console.log("new Obj : "+myobj.theTeam);
//         dbo.collection("newsCol").findOneAndReplace({_id:'5cff3e51055ef7095cb7c80a'},myobj, function(err, res) {
//           if (err) throw err;
//           console.log("1 document Replace");
//           db.close();
//         // dbo.collection("newsCol").findOne({}, function(err, result) {
//         //     if (err) throw err;
//         //     console.log(result);
//         //     db.close();
//         //});
//      });
//   });
// });
//user ragistration

app.post('/userRegistration', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    let newUserRegistration = {
        //seller info goes in seller table
        user_id: req.body.user_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userDob: req.body.userDob,
        userGender: req.body.userGender,
        userEmail: req.body.userEmail,
        userMnumber: req.body.userMnumber,
        userPassword: req.body.userPassword,
   
    }


    user_id = newUserRegistration.user_id;
    firstName = newUserRegistration.firstName;
    lastName = newUserRegistration.lastName;
    userDob = newUserRegistration.userDob;
    userGender = newUserRegistration.userGender;
    userEmail = newUserRegistration.userEmail;
    userMnumber = newUserRegistration.userMnumber;
    userPassword = newUserRegistration.userPassword;

    console.log("id "+user_id);
    console.log("firstName "+firstName);
    console.log("lastName "+lastName);
    console.log("userDob "+userDob);
    console.log("userGender "+userGender);
    console.log("userEmail "+userEmail);
    console.log("userMnumber "+userMnumber);
    console.log("userPassword "+userPassword);


    //query to store user registration form
    var userRegistrationSQL = "INSERT INTO counselling_user (user_id, user_first_name, user_last_name, user_dob, user_gender, user_email, user_mobile_num, user_password) VALUES  ('" 
    + user_id +"','" + firstName + "','" + lastName + "','" + userDob + "','" + userGender + "','" + userEmail + "', '"+userMnumber + "', '"+userPassword +"')";

    con.query(userRegistrationSQL, function (err, result) {
        if (err) {
            res.json(firstName + " Registration Failed...");
            throw err;
        }
        res.json(firstName + " Registration successfully...");
        console.log("1 record inserted in seller table");
    });


});





// request({
//     uri: 'https://www.parsehub.com/api/v2/projects/tjsw87M5HOEb/last_ready_run/data',
//     method: 'GET',
//     gzip: true,
//     qs: {
//       api_key: "te7k5fGXivpr",
//       format: "csv"
//     }
//   }, function(err, resp, body) {
//     console.log("in my body "+body);
    
//   });







app.get('/getNews', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    let obj1 = [
      {
       "heading": "Huawei exec says it has to 'wait a little bit longer' to become the world's biggest smartphone brand",
       "detail": "mahesh details"
      },
      {
       "heading": "Why it's too early to hunker down for a recession",
       "detail": "New York (CNN Business)1. Making roger (KR) and Red Hat (RHT)\nFriday: US existing home sales, Markit flash US manufacturing PMI"
      },
      {
       "heading": "Google CEO says he wants to reach the next billion users, but has no plans to relaunch in China",
       "detail": "akshay details"
    
        }]
      
      
    
  
  let obj2 = [
        {
          "heading": "22222 Huawei exec says it has to 'wait a little bit longer' to become the world's biggest smartphone brand",
          "detail": "mahesh 2222 details"
        },
        {
          "heading": "222 Why it's too early to hunker down for a recession",
          "detail": "mahesh dhotre New ring PMI"
        },
        {
          "heading": "222Google CEO says he wants to reach the next billion users, but has no plans to relaunch in China",
          "detail": "akshay 222 details"

        }
      
    
    
    
      ]

      
  let obj3 = [
    {
      "heading": "333 Huawei exec says it has to 'wait a little bit longer' to become the world's biggest smartphone brand",
      "detail": "mahesh 333 details"
    },
    {
      "heading": "333 Why it's too early to hunker down for a recession",
      "detail": "mahesh dhotre New ring PMI"
    },
    {
      "heading": "333 CEO says he wants to reach the next billion users, but has no plans to relaunch in China",
      "detail": "akshay 3333 details"

    }]
         
  let obj4 = [
    {
      "heading": "333 Huawei exec says it has to 'wait a little bit longer' to become the world's biggest smartphone brand",
      "detail": "mahesh 333 details"
    },
    {
      "heading": "333 Why it's too early to hunker down for a recession",
      "detail": "mahesh dhotre New ring PMI"
    },
    {
      "heading": "333 CEO says he wants to reach the next billion users, but has no plans to relaunch in China",
      "detail": "akshay 3333 details"

    }
  



  ]
 // var arr3 = (true, ...obj2, ...obj1);
 var obj5 = {business: [...obj2, ...obj1, ...obj3], politics:[...obj4]};
  console.log(obj5);


    couch.get(dbName, viewUrl).then(function (data, headers, status) {
      res.json(data.data.rows[0].value);
     // console.log("data is here : "+data.data.rows[0].value);
  },
    function (err) {
      console.log(err);
    });
  });
 
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("newsdb2");
    //      console.log(dbo.collection("newsCol").findOne());
    //     // dbo.collection("newsCol").insertOne(myobj, function(err, res) {
    //     //   if (err) throw err;
    //     //   console.log("1 document inserted");
    //     //   db.close();
    //     dbo.collection("newsCol").findOne({}, function(err, result) {
    //         if (err) throw err;
    //          console.log(result);
    //         // console.log(Object.key(result));
    //         for (x in result) {
    //             console.log(x);
    //           }
    //         var news = result;
    //         res.json(news);
    //         db.close();
    //     });
    //   });
    //});
  


//});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});