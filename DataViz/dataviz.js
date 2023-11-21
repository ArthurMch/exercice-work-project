// let api = api.meteomatics.com/2023-11-20T14:36:43Z/t_2m:C/longitude,latitude/html;
const latitude = 45.7571413;           //navigator.position.coords.latitude;
const longitude = 45.6553354;         //navigator.position.coords.longitude;
/* const Day = navigator.getDay();
const Year = navigator.getFullYear();
const month = navigator.getMonth();
const hour = navigator.getHours();
const min = navigator.getMinutes();
const sec = navigator.getSecondes(); */
var datas ;

async function callapi() {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=5d02e70991a1daa5f8144ab196d1e9ac`;
	let response = await fetch(api);
	datas = await response.json();
	console.log(datas);
	let temperatur = datas.main.temp;
	console.log(temperatur);
	document.getElementById("temperature-value").innerText += "la température est : " + temperatur + " K";
};

callapi();

