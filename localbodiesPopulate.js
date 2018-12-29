var admin = require("firebase-admin");
var fs = require("fs");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timeout-sparrow.firebaseio.com"
});

var district = fs.readFileSync("./run_results.json");

var jasonData = JSON.parse(district);
var districtArr = jasonData.districts;
var data = {
  name: "",
  district: "",
  bodyType: "",
  localBodyCode: "",
  state: "Kerala"
};
districtArr.forEach((item, districtIndex) => {
  data["district"] = item.name;
  var localBodyTypes = item.localBodyTypes;
  localBodyTypes.forEach(typelocal => {
    var bodyType = typelocal.name;
    data["bodyType"] = bodyType;

    var localBodies = typelocal.localBodies;
    localBodies.forEach((item, index) => {
      data["name"] = item.name;
      data["localBodyCode"] = getCode(bodyType, districtIndex, index);
      const db = admin.firestore();
      db.collection("localbodies")
        .add(data)
        .then(() => console.log("hello you"))
        .catch(error => console.log(err));
    });
  });
});
// console.log(jsonData.districts.length);

// const db = admin.firestore();
// db.collection("localbodies")
//   .add({ test: 1 })
//   .then(() => console.log("hello you"));

function getCode(bodyType, districtIndex, index) {
  var bodyTypeCode = "G";
  switch (bodyType) {
    case "Grama Panchayat":
      break;
    case "Muncipality":
      bodyTypeCode = "M";
      break;
    case "Corporation":
      bodyTypeCode = "C";
      break;
  }
  return "KL" + (districtIndex + 1) + bodyTypeCode + index;
}
