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

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();

  //sign in
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => {
    console.log("err", e.message)
  });
});

btnSignup.addEventListener('click', e => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();

  //sign in
  const promise = auth.createUserWithEmailAndPassword(email, password);
  console.log("DSADAS", promise)
  promise.then(e => { console.log("DSADAS", e); }).catch(e => {
    console.log("err", e.message)
  });
});

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    btnLogout.classList.remove('hide');
  } else {
    btnLogout.classList.add('hide');
    console.log("not logged in",firebaseUser);
  }
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");

fileButton.addEventListener('change', e => {

  // Get fileButton
  var file = e.target.files[0];

  // Create storage ref
  var storageRef = firebase.storage().ref("sweet_gifs/" + file.name);

  // Upload a fileButton
  var task = storageRef.put(file);

  // Update progress bar
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
    uploader.value = percentage;
  }, function() {

  }, function() {

  });

});
