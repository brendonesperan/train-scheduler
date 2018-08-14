// https://console.firebase.google.com/project/train-scheduler-7def2/overview
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBlr9sQrc9np2EQe2l5nG6BsybZrDbpOZo",
    authDomain: "train-scheduler-7def2.firebaseapp.com",
    databaseURL: "https://train-scheduler-7def2.firebaseio.com",
    projectId: "train-scheduler-7def2",
    storageBucket: "train-scheduler-7def2.appspot.com",
    messagingSenderId: "632654979282"
};
firebase.initializeApp(config);

var database = firebase.database();

var timeFormat = "HH:mm";

$(document).ready(function() {

});

// 2. Button for adding trains
$("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format(timeFormat);
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: firstTrainTime,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
   
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

  // var newRow = $("<tr>").append(
  //   $("<td>").text(trainName),
  //   $("<td>").text(destination),
  //   $("<td>").text(firstTrainTime),
  //   $("<td>").text(trainFrequency),
  // );

  // // Append the new row to the table
  // $("#train-table > tbody").append(newRow);

  //console.log("Table append.");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Logs everything to console
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    firstTrainTime + "</td><td>" + trainFrequency + "</td></tr>");
  });
  