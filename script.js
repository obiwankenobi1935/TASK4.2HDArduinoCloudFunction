// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBv6pgXi_ke6pbYIQH-uCMkJfbfJpjIqRo",

  authDomain: "task210-hd.firebaseapp.com",

  databaseURL: "https://task210-hd-default-rtdb.firebaseio.com",

  projectId: "task210-hd",

  storageBucket: "task210-hd.appspot.com",

  messagingSenderId: "1061169080084",

  appId: "1:1061169080084:web:453785abe0e064c12e8401",

  measurementId: "G-EWEVM3ERYW"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function() {
  var database = firebase.database();
  var BlueStatus, GreenStatus, RedStatus;
  
  // Retrieve values from Firebase
  database.ref('lights').on("value", function(snap) {
    BlueStatus = snap.val().blue;
    GreenStatus = snap.val().green;
    RedStatus = snap.val().red;

    // Update blue LED UI
    if (BlueStatus === 1) {
      document.getElementById("unact").style.display = "none";
      document.getElementById("act").style.display = "block";
    } else {
      document.getElementById("unact").style.display = "block";
      document.getElementById("act").style.display = "none";
    }

    // Update green LED UI
    if (GreenStatus === 1) {
      document.getElementById("unact1").style.display = "none";
      document.getElementById("act1").style.display = "block";
    } else {
      document.getElementById("unact1").style.display = "block";
      document.getElementById("act1").style.display = "none";
    }

    // Update red LED UI
    if (RedStatus === 1) {
      document.getElementById("unact2").style.display = "none";
      document.getElementById("act2").style.display = "block";
    } else {
      document.getElementById("unact2").style.display = "block";
      document.getElementById("act2").style.display = "none";
    }
  });

  // Blue LED toggle button
  $(".toggle-btn").click(function() {
    var firebaseRef = firebase.database().ref('lights/blue');
    if (BlueStatus === 1) {
      firebaseRef.set(0) // Update in Firebase
      .then(function() {
        console.log("Blue LED turned off");
      }).catch(function(error) {
        console.log("Error: " + error.message);
      });
    } else {
      firebaseRef.set(1)
      .then(function() {
        console.log("Blue LED turned on");
      }).catch(function(error) {
        console.log("Error: " + error.message);
      });
    }
  });

  // Green LED toggle button
  $(".toggle-btn1").click(function() {
    var firebaseRef = firebase.database().ref('lights/green');
    if (GreenStatus === 1) {
      firebaseRef.set(0)
      .then(function() {
        console.log("Green LED turned off");
      }).catch(function(error) {
        console.log("Error: " + error.message);
      });
    } else {
      firebaseRef.set(1)
      .then(function() {
        console.log("Green LED turned on");
      }).catch(function(error) {
        console.log("Error: " + error.message);
      });
    }
  });

  // Red LED toggle button
  $(".toggle-btn2").click(function() {
    var firebaseRef = firebase.database().ref('lights/red');
    if (RedStatus === 1) {
      firebaseRef.set(0)
      .then(function() {
        console.log("Red LED turned off");
      }).catch(function(error) {
        console.log("Error: " + error.message);
      });
    } else {
      firebaseRef.set(1)
      .then(function() {
        console.log("Red LED turned on");
      }).catch(function(error) {
        console.log("Error: " + error.message);
      });
    }
  });
});
