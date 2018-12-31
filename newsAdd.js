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
const newsModel = {
  author: {
    name: "Jafar C",
    uid: "DkJGFlfZ61XiyjlZsklFC4JFmjc2",
    photoUrl:
      "https://lh4.googleusercontent.com/-syh6oNgBtHU/AAAAAAAAAAI/AAAAAAAAAAA/AKxrwcbqThq-8pm6ES3MbbsKeu7bZa_9LA/mo/photo.jpg"
  },
  title: "",
  content: "",
  createdDate: "",
  image: "",
  is_active: true,
  mainClub: {
    id: "",
    name: "",
    logo: "",
    tier: "first"
  },
  publishedDate: "",
  status: "published",
  summary: "",
  relatedSports: {
    football: true
  },
  taggedClubs: {
    xxxx: {
      id: "",
      name: "",
      tier: ""
    }
  }
};

var clubsToTaggFile = fs.readFileSync("./clubInfo.json");
var clubsToTagg = JSON.parse(clubsToTaggFile);

var sampleNewsfile = fs.readFileSync("./sampleNews.json");
var sampleNews = JSON.parse(sampleNewsfile);

var sampleNewsArr = sampleNews.selection1;

var formattedNewsArr = [];
sampleNewsArr.forEach(news => {
  var randArr = [
    getRandomInt(0, 25),
    getRandomInt(0, 25),
    getRandomInt(0, 25),
    getRandomInt(0, 25)
  ];

  var taggedClubs = getTaggedClubs(randArr);
  //   console.log(taggedClubs);
  var formattedNews = newsModel;
  formattedNews["taggedClubs"] = taggedClubs;
  //   console.log(formattedNews["taggedClubs"]);
  formattedNews["mainClub"] = clubsToTagg[getRandomInt(5, 25)];

  formattedNews["title"] = news.name;
  //   console.log(news.selection5);
  var newsContentArr = news.selection5;
  formattedNews["content"] = newsContentCreator(newsContentArr);

  formattedNews["summary"] = formattedNews["content"].substr(3, 150);
  // if (news.selection3) {
  formattedNews["createdDate"] = new Date();
  formattedNews["publishedDate"] = new Date();
  // } else {
  //   formattedNews["createdDate"] = "December 18, 2018 - 11:03 PM";
  //   formattedNews["publishedDate"] = "December 18, 2018 - 11:03 PM";
  // }
  if (news.selection4) {
    formattedNews["image"] = news.selection4;
  }
  formattedNewsArr.push(formattedNews);
  //   console.log(formattedNews);
  db.collection("news")
    .add(formattedNews)
    .then(res => console.log("happy"));
});

// console.log(formattedNewsArr[0]);
fs.writeFileSync("./newsMockedData.json", JSON.stringify(formattedNewsArr));
// sampleNewsArr.forEach(item => {});
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTaggedClubs(randArr) {
  var taggedclubs = {};
  randArr.forEach(item => {
    var selectedClub = clubsToTagg[item].id;
    taggedclubs[selectedClub] = {
      id: selectedClub,
      name: clubsToTagg[item].name,
      tier: clubsToTagg[item].tier
    };
  });
  return taggedclubs;
}

function newsContentCreator(newsContentArr) {
  var contentFromArr = "";
  if (newsContentArr) {
    newsContentArr.forEach(item => {
      //   console.log(item);
      contentFromArr = contentFromArr + "<p>" + item.name + "</p>";
      //   console.log(contentFromArr.toString());
    });
  }

  return contentFromArr;
}
