const positionElement = document.getElementById("position");
const updatedElement = document.getElementById("updated");
const updatedCountElement = document.getElementById("updated-count");
var updatedCountInt = 0;
const locationOptions = {maximumAge:0,enableHighAccuracy:true};
var time = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds(),
    toStr: function(){
        return `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:${this.second}`;
    }
};
function getLocationNow(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPositionNow, showError, locationOptions);
    };
};
function showPositionNow(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
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
};
function showError(error){
    console.log(error);
};