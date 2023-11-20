//variables
const apiKey = '5d02e70991a1daa5f8144ab196d1e9ac'
if ("geolocation" in navigator){
	navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = "<p>Browser doesn't support geolocation.</p>"
}

//location
function setPosition (position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	Weather(longitude, latitude)
}

//message d'erreur
function showError (error) {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//récup des données météo
function Weather(longitude, latitude) {
	const api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
	fetch(api)
		.then(function(retour){
			let data = retour.json();
			return(data);
		})
		.then(function(data) {
			city = data.name;
			temps = data.weather[0].description;
			tempMax = Math.round(data.main.temp_max - 273,15);
			tempMin = Math.round(data.main.temp_min - 273,15);
		})
		.then(function Affichage() {
			console.log("Vous etes à : " + city);
			if (temps == 'clear sky') {
				console.log("Le temps est : " + 'Ciel dégagé');
			} else {
				console.log("Le temps est : " + temps + "a trad")
			}
			console.log("La température maximal est : " + tempMax + "°C");
			console.log("La température minimal est : " + tempMin + "°C");
		})
}