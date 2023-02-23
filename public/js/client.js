const positionElement = document.getElementById("position");
const updatedElement = document.getElementById("updated");
const updatedCountElement = document.getElementById("updated-count");
const locationOptions = {maximumAge:0,enableHighAccuracy:true};
let changeIdCount = 0;

function getLocationNow(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPositionNow, showError, locationOptions);
    };
};
function showPositionNow(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var speed = typeof null ? '0' : position.coords.speed;
    var timestamp = new Date().toISOString(position.timestamp);
    var updates = [changeIdCount, lat, lon, speed, accuracy, timestamp]
    updateTable(updates);
    changeIdCount++;

    /*
    var geoTxt = "Your geolocation: <br>" + "Latitude: " + lat + "<br>Longitude: " + lon;
    positionElement.innerHTML = geoTxt;
    updatedElement.innerHTML = "UpdateTime: " + time.toStr();
    updatedCountElement.innerHTML = "UpdateCount: " + updatedCountInt;
    console.log("UpdatedValue: ", {
        coords: [lat, lon],
        time: time.toStr(),
        count: updatedCountInt
    });
    updatedCountInt++;
    */
};
function showError(error){
    console.log(error);
};

function updateTable(updates) {
    // Get a reference to the table
    let tableRef = document.getElementById('position-updates');
    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);
    for (let i = 0; i < tableRef.rows[0].cells.length; i++) {
        let newCell = newRow.insertCell(i);
        let newText = document.createTextNode(updates[i]);
        newCell.appendChild(newText);
    }
}