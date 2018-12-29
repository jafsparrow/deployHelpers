var admin = require("firebase-admin");
var fs = require("fs");
// var serviceAccount = require("./TestServer.json"); // this is for test server

// var writeFile = fs.write("./clubInfo.json");
var serviceAccount = require("./serviceAccountKey.json"); // this is for production server

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timeouttest-f5324.firebaseio.com"
});

var db = admin.firestore();
var clubBasicInfoArray = [];
db.collection("clubs")
  .get()
  .then(res => {
    res.docs.forEach(doc => {
      //   console.log(doc.id);
      var clubId = doc.id;
      var club = doc.data();
      var clubReq = {
        name: club["name"],
        id: clubId,
        tier: club["tier"]
      };
      clubBasicInfoArray.push(clubReq);
    });

    fs.writeFileSync("./clubInfo.json", JSON.stringify(clubBasicInfoArray));
  });
