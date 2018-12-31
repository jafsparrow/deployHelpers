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

var eventfile = fs.readFileSync("./eventsSampleData.json");
var eventDataObj = JSON.parse(eventfile);
var eventData = eventDataObj.Sheet1;
var eventsArray = [];
Object.keys(eventData).forEach(key => {
  eventsArray.push(eventData[key].title);
});

db.collection("clubs")
  .get()
  .then(res => {
    res.docs.forEach(doc => {
      var clubId = doc.id;
      console.log(clubId);
      //   roles.forEach(role => {
      //     db.collection("clubs")
      //       .doc(clubId)
      //       .collection("management")
      //       .add({
      //         name: management[getRandomInt(0, 27)],
      //         role: role,
      //         contact: "9000000003"
      //       })
      //       .then(() => console.log("mangement done"));
      //   });

      for (i = 0; i < eventsArray.length / 2; i++) {
        console.log(eventsArray[getRandomInt(1, 32)]);
        db.collection("clubs")
          .doc(clubId)
          .collection("achievements")
          .add({
            title: eventsArray[getRandomInt(1, 32)],
            description: description[i % 2],
            date: getADate()
          })
          .then(() => console.log("achivement done"));
      }
    });
  });

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getADate() {
  var today = new Date();
  var rand = getRandomInt(0, 30);
  return new Date(today.setDate(today.getDate() - rand));
}
var management = [
  "Satheesh K",
  "Mohammed PK",
  "Vineed Srinivas",
  "Abdul Samad",
  "Alex Kurien",
  "Bobin Mahesh",
  "Sathar KC",
  "Antony Mampilly",
  "Ali C",
  "Rahees KM",
  "Vincith K",
  "Jismin Raj",
  "Sansar Danish",
  "Selman KK",
  "Shareef Thadathil",
  "Faheem Pakkada",
  "Irashad PP",
  "Amal Kannan",
  "Anu C",
  "Sobin Francis",
  "Justing Augestine",
  "Jobin Kuriyako",
  "Abdul Azeez",
  "Mujeeb Choonari",
  "Jafar C",
  "Pranav Manbu",
  "Mithun Chakra",
  "Anooj Philip"
];
var roles = [
  "Manager",
  "Co-ordinator",
  "Treasurer",
  "Organizer",
  "Sponsor committee",
  "Secretary",
  "President",
  "Co-owner",
  "Founder",
  "Marketing Manger",
  "Kit Designer",
  "Care Taker",
  "Selection Manager"
];

var description = [
  "ഒരു സാമ്പിൾ ഇവന്റുകളുടെ വിശദാംശങ്ങളാണ് ഇത്. രജിസ്റ്റർ ചെയ്ത എല്ലാ ക്ലബുകളും ഈ ഇവന്റുകൾ ഉപയോഗിച്ച് ഇവന്റുകൾ, അറിയിപ്പുകൾ, മറ്റ് ടൂർണമെന്റുകളുമായി ബന്ധപ്പെട്ട വിവരങ്ങൾ പ്രസിദ്ധീകരിക്കാൻ കഴിയും. നിങ്ങളുടെ ക്ലബിൽ ഇതുവരെ ഈ സൈറ്റിൽ രജിസ്റ്റർ ചെയ്തിട്ടില്ലെങ്കിൽ ദയവായി രജിസ്റ്റർ ചെയ്യുക",
  "റം ഇപ്‌സും ഡോളർ  സിറ്റ്  അമിത് , കോൺസെക്ടറേറ്റ്  അടിപിസിസിങ്. ഡയസ് നല്ല എനിമ, ല്ക്ട്സ് ഇൻ ഉൾട്രിയസ്ut, ഇഅക്യൂലിസ് എ ഔഗി.പ്രേസേന്റ് സുസ്‌ക്രിപ്പിറ്റി എക്സ് എന്റെ, അറ്റ് ഓര്ണരെ മി യൂജിസ്‌മോദ് ഉററ . ഡ്യട്ടി സ്മുറി സ്  ആർക്കു , ഹേന്ദ്രറിട്"
];
