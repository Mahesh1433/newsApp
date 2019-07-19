import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
var SyncDbService = /** @class */ (function () {
    function SyncDbService() {
        console.log("inside constructor");
        this.db = new PouchDB('ubuntudb');
        this.remote = new PouchDB('http://ec2-18-208-182-52.compute-1.amazonaws.com:5984/ubuntudb');
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
    SyncDbService.prototype.handleChange = function (change) {
        var changedDoc = null;
        var changedIndex = null;
        // console.log("inside handleChangea");
        this.data.forEach(function (doc, index) {
            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }
        });
        //A document was deleted
        if (change.deleted) {
            this.data.splice(changedIndex, 1);
        }
        else {
            //A document was updated
            if (changedDoc) {
                this.data[changedIndex] = change.doc;
            }
            //A document was added
            else {
                this.data.push(change.doc);
            }
        }
    };
    //Reading the contents of a Document
    SyncDbService.prototype.getTodos = function () {
        var _this = this;
        if (this.data != null) {
            console.log("inside getTodos if this.data new");
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            console.log("inside promise new");
            _this.db.allDocs({
                include_docs: true
            }).then(function (result) {
                _this.data = [];
                var docs = result.rows.map(function (row) {
                    _this.data.push(row.doc);
                });
                resolve(_this.data);
                _this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', function (change) {
                    _this.handleChange(change);
                });
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    SyncDbService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SyncDbService);
    return SyncDbService;
}());
export { SyncDbService };
//# sourceMappingURL=sync-db.service.js.map