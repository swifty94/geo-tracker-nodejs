const tableContainer = document.getElementById('live-table');
const mapContainer = document.getElementById('static-map');
const updatedElement = document.getElementById("updated");
const updatedCountElement = document.getElementById("updated-count");
const locationOptions = {maximumAge:0,enableHighAccuracy:true};
let changeIdCount = 0;

function watchLocationNow(){
    mapContainer.style.display = "none";
    tableContainer.style.display = "block";
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
};

function showError(error){
    console.log(error);
};

function updateTable(updates) {
    let tableRef = document.getElementById('position-updates');
    let newRow = tableRef.insertRow(-1);
    for (let i = 0; i < tableRef.rows[0].cells.length; i++) {
        let newCell = newRow.insertCell(i);
        let newText = document.createTextNode(updates[i]);
        newCell.appendChild(newText);
    }
}

function getLocationNow(){
    mapContainer.style.display = 'block';
    tableContainer.style.display = 'none';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(drawGoogleMap, showError, locationOptions);
    };
}

function drawGoogleMap(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var data = google.visualization.arrayToDataTable([
    ['Lat', 'Long'],
    [lat, lon]
    ]);
    var options = {showTip: true};
    var chart = new google.visualization.Map(mapContainer);
    chart.draw(data, options);
}