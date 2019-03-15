module.exports = Reply;
const MongoClient = require('mongodb').MongoClient;
const deasync = require('deasync');
// default replies
const REPLY_ERROR = "An error has occured. Please try again.";
const REPLY_DID_NOT_UNDERSTAND = "I didn't understand that. Can you rephrase?";
//const REPLY_SUCCESSFUL = "I understood your message. You can tailor my responses to your messages by analysing the metadata attached with this message.";
db_url = "mongodb://localhost:27017/botdb";
const mysql = require('mysql');
var con = mysql.createConnection({ host: "localhost", user: "root", password: "tcs@12345", database: "botdb" });

let response;


function Reply(message, intent, entities) {

    this.message = message;

    this.reply = this.getReply(message, intent, entities);
    console.log("reply" + this.reply);
    this.intent = intent;
    this.entities = entities;
    this.context = "global";


}

Reply.prototype.toJson = function () {
    var json = {};
    json['intent'] = this.intent;
    json['entities'] = this.entities;
    json['reply'] = this.reply;
    json['message'] = this.message;

    return json;
};

Reply.prototype.getReply = function (message, intent, entities) {

    if (intent.name == "Unclassified") {
        MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("botdb");
            console.log("connected inside unclassified block");

            feedback_obj = {
                // "feedback": feedback,
                "input": message,
                "intent": "None",
                //  "answer": reply
            };
            console.log("feedobj" + feedback_obj.intent, feedback_obj.input);

            dbo.collection("unclassifieds").insertOne(feedback_obj, function (err, inserted) {
                if (err) throw err;
                console.log("==####****###== inserted into Unclassified", inserted.ops);
                response = inserted;
            });

        });
        deasync.loopWhile(() => { process.stdout.write('.'); return !response });

        return REPLY_DID_NOT_UNDERSTAND;
    }
    else {

        switch (intent.name) {
            
            case "init2": return " Hi , I am HR Virtual Assistant , how can I help you?";
            //case "nointent": return "Sorry, I did not understand your input. Please try again.";
            default:
                let response;
                try {
                    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("botdb");
                        console.log("connected in default");
                        dbo.collection("legalfaq").find({ "Intent": intent.name }, { 'Answer': 2, '_id': 0 }).toArray(function (err, result) {
                            console.log("connected: " + intent.name);
                            if (err) throw err;
                            response = result[0].Answer;
                            console.log("result" + result[0].Answer);
                            db.close;

                        });
                    });
                    deasync.loopWhile(() => { console.log('.'); return !response });

                } catch (err) {

                    response = "Sorry, I did not understand your input. Please try again.";

                }
                return response;
        }
    }
};
