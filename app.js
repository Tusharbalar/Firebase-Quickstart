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
