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

const eventSample = {
  author: { name: "Jafar happy", id: "xDOPgribklNFMggif6cbEoQLv6m1" },
  content: "details of the event.",
  date: "Tue Dec 04 2018 00:00:00 GMT+0530 (India Standard Time)",
  expiryDate: "Wed Dec 12 2018 00:00:00 GMT+0530 (India Standard Time)",
  mainClub: { name: "Mediguard", id: "bIGOO5RvnAMTwIEnkQQn" },
  relatedSports: { football: true, cricket: true, basketball: true },
  status: "draft",
  title: "title"
};

const description =
  "<p>ഒരു സാമ്പിൾ ഇവന്റുകളുടെ വിശദാംശങ്ങളാണ് ഇത്. രജിസ്റ്റർ ചെയ്ത എല്ലാ ക്ലബുകളും ഈ ഇവന്റുകൾ ഉപയോഗിച്ച് ഇവന്റുകൾ, അറിയിപ്പുകൾ, മറ്റ് ടൂർണമെന്റുകളുമായി ബന്ധപ്പെട്ട വിവരങ്ങൾ പ്രസിദ്ധീകരിക്കാൻ കഴിയും. നിങ്ങളുടെ ക്ലബിൽ ഇതുവരെ ഈ സൈറ്റിൽ രജിസ്റ്റർ ചെയ്തിട്ടില്ലെങ്കിൽ ദയവായി രജിസ്റ്റർ ചെയ്യുക </p><p>ലാറം ഇപ്‌സും ഡോളർ  സിറ്റ്  അമിത് , കോൺസെക്ടറേറ്റ്  അടിപിസിസിങ്. ഡയസ് നല്ല എനിമ, ല്ക്ട്സ് ഇൻ ഉൾട്രിയസ്ut, ഇഅക്യൂലിസ് എ ഔഗി.പ്രേസേന്റ് സുസ്‌ക്രിപ്പിറ്റി എക്സ് എന്റെ, അറ്റ് ഓര്ണരെ മി യൂജിസ്‌മോദ് ഉററ . ഡ്യട്ടി സ്മുറി സ്  ആർക്കു , ഹേന്ദ്രറിട് നോൺ  ടോർത്തൂർ  എ , ഗ്രാവിട സമ്പ്ര  ആർക്കു . നല്ല കോൺസെക്ടറേറ്റ്  സെലെരിസ്ഖ്  എന്റെ  നോൺ  ടെംപോർ . നല്ല  സമ്പ്ര , എക്സ്  സിറ്റ്  അമിത്  എഫിസിറ്റ് ഇൻസിടുണ്ട് , ലെക്ട്സ്  നുണക്ക  യൂജിസ്‌മോദ്  എനിമ , ഈജിപ്ത്  ഇന്റെർഡും   ടോർത്തൂർ  നിപ്  id ഔഗി   സീഡ് വെഹികളാ  ആർക്കു അസി ലിയോ സമ്പ്ര ,സെലെരിസ്ഖ്  സെലെരിസ്ഖ്  ക്വാൻ സോളിസിറ്റഡിന് . അങ്ങെനെയാണ്  ഹേന്ദ്രറിട്  കോൺവാലിസ്‌ ഇറോസ് അലിക്വാ  കോങ്ക് . ഒരുക്കി  വാരിയൂസ്  നാറ്റോക്‌  പെൺഠിപ്സ്  et മാങ്ഗനീസ്  dis  പാർട്ടറിന്റ  മോണ്ടെസ് , നസ്സ്റ്റ്  റൈഡിക്കല്സ്  മുസ് . നല്ല  വിവേറ  ഓടി o  ലാറം ,  നീക്കി  ബ്ലാണ്ടി ബെറോ  ഉൾട്രസ്സ്  നോൺ . അലിക്യുവും നാട് വോള്ട്ടപാട് .</p>";

var file = fs.readFileSync("./eventsSampleData.json");
var eventsJson = JSON.parse(file);
var eventsData = eventsJson.Sheet1;
var clubInfo = fs.readFileSync("./clubInfo.json");
var clubInfoData = JSON.parse(clubInfo);

Object.keys(eventsData).forEach(key => {
  var event = {};
  //   console.log(eventsData[key]);
  event["title"] = eventsData[key].title;
  const type = eventsData[key].type;
  event["relatedSports"] = {};
  event["relatedSports"][type] = true;
  event["status"] = "published";
  event["mainClub"] = getMainClub();
  event["date"] = getADate(0, 20);
  event["expiryDate"] = getADate(20, 40);
  event["publishedDate"] = new Date();
  event["createdDate"] = new Date();
  event["content"] = description;
  event["author"] = {
    name: "Jafar happy",
    id: "xDOPgribklNFMggif6cbEoQLv6m1"
  };
  console.log(event);

  db.collection("events")
    .add(event)
    .then(() => console.log("happy"));
});

function getMainClub() {
  return clubInfoData[getRandomInt(0, 24)];
}

function getADate() {
  var today = new Date();
  var rand = getRandomInt(0, 30);
  return new Date(today.setDate(today.getDate() + rand));
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
