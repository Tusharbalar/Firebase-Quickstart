// Initialize Firebase
var config = {
  apiKey: "AIzaSyAWxOAAdYCisto2og_eu3YBZSyEIzvGX6w",
  authDomain: "web-quickstart-cc229.firebaseapp.com",
  databaseURL: "https://web-quickstart-cc229.firebaseio.com",
  storageBucket: "web-quickstart-cc229.appspot.com",
  messagingSenderId: "1090473395200"
};
firebase.initializeApp(config);

var bigOne = document.getElementById('bigOne');
var dbRef = firebase.database().ref().child('text');
dbRef.on('value', snap => bigOne.innerText = snap.val());

var object = document.getElementById('object');
var dbRef1 = firebase.database().ref().child('object');
dbRef1.on('value', snap => object.innerText = JSON.stringify(snap.val(), null, 3));

var childObject = dbRef1.child("hobbied");

const ulList = document.getElementById("list");

// sync list changes
childObject.on("child_added", snap => {
  var li = document.createElement("li");
  li.innerText = snap.val();
  li.id = snap.key;
  ulList.appendChild(li);
});

// sync list changes
childObject.on("child_removed", snap => {
  const liToRemove = document.getElementById(snap.key);
  liToRemove.remove();
});

// sync list changes
childObject.on("child_changed", snap => {
  var liChanged = document.getElementById(snap.key);
  liChanged.innerText = snap.val();
});
