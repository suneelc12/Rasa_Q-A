// JavaScript source code
//const trainObj = require('./nlu/rasa/test.js'); 
//trainObj.train();

//var fs = require('fs');
//var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/");
//var db = mongoose.connection;
//db.on("error", console.error.bind(console, "connection error"));
//var collectionSchema = new mongoose.Schema({
//    //timestamp: { type: Date, default: Date.now },
//    Intent: String,
//    answer: String
//});
//var faq = mongoose.model("faq", collectionSchema);
//const MongoClient = require('mongodb').MongoClient;
//fs.readFile('C:/Users/ramad/Downloads/legal.json', 'utf8', function (err, jsondata) {
//    if (err) throw err;
    
//    data = JSON.parse(jsondata);
//    //console.log(data[1]);
//    for (i in data) {
//        console.log(data[i]);
//    }
    
//})

//var csv = require('csvtojson');
//const csvfilepath = 'C:/Users/ramad/Downloads/legalbot.csv';

//csv({
//    delimiter: "|"
//}).fromFile(csvfilepath)
//    .then((jsonobj) => {
//        console.log(jsonobj)
//    })




var deasync = require('deasync');
var fs = require('fs');
var db_url = "mongodb://localhost:27017/botdb";
var path = require('path');
var csv = require('csvtojson');
var dir = 'C:/Users/ramad/Downloads/data';
const MongoClient = require('mongodb').MongoClient;
let response;
MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("botdb");
    console.log("connected");
    fs.readdir(dir, function (err, files) {
        if (err) throw err;
        files.forEach((file) => {
            var csvfilepath = path.join(dir, file);
            csv({
                delimiter: "|"
            }).fromFile(csvfilepath)
                .then(async(jsonobj) => {
                    //console.log(file + "content" + JSON.stringify(jsonobj));
                    for (item in jsonobj) {
                        obj = jsonobj[item];
                        console.log(obj);
                        console.log("jhhjvgjvgvgjvvgj");
                       // console.log(dbo.collection('legalfaq').countDocuments({ "Intent": obj.Intent, "Answer": obj.Answer }, { limit: 1 }));
                        var result =await dbo.collection('legalfaq').findOne({ "Intent": obj.Intent, "Answer": obj.Answer });

                        if (result == null) {
                                console.log("entered");
                                dbo.collection("legalfaq").insert(obj);
                                console.log("==####****###== inserted ", obj);

                            }


                        //    (err, result) => {
                        //    console.log("result" + result);
                        //    if (result == null) {
                        //        console.log("entered");
                        //        dbo.collection("legalfaq").insert(obj);
                        //        console.log("==####****###== inserted ", obj);

                        //    }

                        //});
                    }
                    //db.close();
                })
                .catch((error) => { console.log(error); });
        });

    });
});
   // deasync.loopWhile(() => { console.log('.'); return !response });



//MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
//    if (err) throw err;
//    var dbo = db.db("botdb");
//    console.log("connected in default");
//    dbo.collection("faq").find({ "Intent": intent.name }, { 'answer': 2, '_id': 0 }).toArray(function (err, result) {
//        console.log("connected: " + intent.name);
//        if (err) throw err;
//        response = result[0].answer;
//        console.log("result" + result[0].answer);
//        db.close;

//    });
//});
//deasync.loopWhile(() => { console.log('.'); return !response });



//const request = require('request');

   //axios.get('https://jsonplaceholder.typicode.com/todos/1')
                //    .then(response => {
                //        console.log('njknjk' + response);
                //    })
                //    .catch(err => {
                //        console.log(err);
                //    });

                //request.get('https://jsonplaceholder.typicode.com/todos/1', (err, res, body) => {
                //            if (err) console.log(err);
                //            console.log('njj' + body.json());
                //        });


                //https.get('https://jsonplaceholder.typicode.com/todos/1', (err,response)=>{


                //})



//con.connect(function (err) {
//    if (err)
//        throw err;
//    else
//        console.log("connected");
//    sql = "select answer from faq where question= " + mysql.escape(intent.name);
//    con.query(sql, function (err, result, fields) {
//        if (err) throw err;
//        else {
//            response1 = result[0].answer;
//            console.log("mysql" + response1);
//        }
//    });
//});
//deasync.loopWhile(() => { console.log('.'); return !response1 });
//return response1;