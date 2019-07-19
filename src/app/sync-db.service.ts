import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';


@Injectable({
  providedIn: 'root'
})
export class SyncDbService {

  
  data: any;
  db: any;
  remote: any;
  


  constructor() { 


    this.db = new PouchDB('testing');
  this.remote = new PouchDB('http://localhost:5984/testing');

  this.db.replicate.to(this.remote);
  this.db.replicate.from(this.remote);


// fetch mittens
// db.get('mittens').then(function (doc) {
//   // update their age
//   this.doc.name = "mahesh";
//   // put them back
//   return db.put(doc);
// }).then(function () {
//   // fetch mittens again
//   return db.get('mittens');
// }).then(function (doc) {
//   console.log(doc);
// });



    // var doc = {
    //   "_id": "mittens",
    //   "name": "Mittens",
    //   "occupation": "kitten",
    //   "age": 3,
    //   "hobbies": [
    //     "playing with balls of yarn",
    //     "chasing laser pointers",
    //     "lookin' hella cute"
    //   ]
    // };
    // db.put(doc);

    // localDB.get("5b41404d247fe505fe9ce488eb012cee").then(function (doc) {
    //   console.log(doc);
    // });

    // db.info().then(function (info) {
    //   console.log(info);
    // })
    
    // remotedb.info().then(function (info) {
    //   console.log(info);
    // })

  //   this.remote = 'http://localhost:5984/testdb/';
  //   this.db = new PouchDB('cloudo');
	// 	let options = {
	// 		live: true,
	// 		continuous: true
	// 	};
	// 	this.db.sync(this.remote, options);
	
  //   console.log(this.db);
  //   this.db.replicate.to(this.remote);
  //   console.log("Databases synchronized successfully");
  //   this.db.get('001', function(err, doc) {
  //     if (err) {
  //        return console.log(err);
  //     } else {
  //        console.log(doc);
  //     }
  //   });
   }

  handleChange(change){

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 

      //A document was added
      else {
        this.data.push(change.doc); 
      }

    }

  }
//Reading the contents of a Document

  getTodos() {

    if (this.data) {
      console.log(this.data);
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      }); 

    });

  }
}
