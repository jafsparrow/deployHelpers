var admin = require("firebase-admin");

// var serviceAccount = require("./TestServer.json"); // this is for test server

var serviceAccount = require("./serviceAccountKey.json"); // this is for production server

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timeouttest-f5324.firebaseio.com"
});

var collectionName = "requests";
var clubRequestData = {
  address: {
    bodyType: "Not updated",
    district: "Not updated",
    line1: "Not updated",
    line2: "Not updated",
    localBody: "Not updated",
    localBodyCode: "FTS",
    location: "Not updated",
    pin: "Not updated"
  },
  contact: "Not updated",
  name: "full name",
  requestType: "club",
  requestedUser: {
    uid: "DkJGFlfZ61XiyjlZsklFC4JFmjc2",
    displayName: "Jafar Chembatty",
    photoUrl:
      "https://lh4.googleusercontent.com/-syh6oNgBtHU/AAA…A/AAN31DW19DOuxdcM0wizQwtlZ3DfiQ6cyg/mo/photo.jpg"
  },
  shortName: "SHORTNAME",
  status: "initiated",
  tier: "first"
};
var fs = require("fs");
var clubs = fs.readFileSync("./sevensClubs.json");

var clubsObj = JSON.parse(clubs);
// console.log(clubsObj);
var clubRequestArr = [];
Object.keys(clubsObj).forEach(key => {
  //   console.log(clubsObj[key]);
  var clubData = clubsObj[key];
  var requestContent = formReqestData(clubData);
  console.log(requestContent);
  const db = admin.firestore();
  db.collection("requests")
    .add(requestContent)
    .then(() => console.log("hello you"))
    .catch(error => console.log(err));
});

function formReqestData(clubData) {
  var tempData = clubRequestData;
  var clubName = clubData.name;
  tempData["name"] = clubName;
  var shortName = clubData.shortName;
  tempData["shortName"] = shortName;

  var line1 = clubData.address1;
  tempData.address["line1"] = line1;
  var bodyType = clubData.bodyType;
  tempData.address["bodyType"] = bodyType;
  var localBody = clubData.boyname;
  tempData.address["localBody"] = localBody;
  var location = clubData.location;
  tempData.address["location"] = location;

  var district = clubData.district;

  tempData.address["district"] = district;

  return tempData;
}
