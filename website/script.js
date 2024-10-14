async function updateClimate(country){
  
  let coordinates = getCoordinatesByCountry(country);
 	let temperature = await fetchClimate(coordinates);
 	let tag_numberClimate = document.getElementById("numberClimate");
  let background = document.getElementById('body');

  
  tag_numberClimate.innerHTML = temperature;
  
  //muda o background de acordo com o clima
  if(temperature <= 20){
  	//frio
  	background.style.backgroundColor = "blue";
        tag_numberClimate.style.color = "white";
  } else if(temperature > 30){
  	//quente
    background.style.backgroundColor = "red";
        tag_numberClimate.style.color = "white";
  } else {
  	//normal
  	background.style.backgroundColor = "yellow";
    tag_numberClimate.style.color = "blue";
  }

}

function getCoordinatesByCountry(country){
	  //countrie latitude longitude
  let coordinatesCountries = [
    {"Brasil" : [-23.5489, -46.6388]},
    {"Japao": [35.6895, 139.6917]},
    {"Inglaterra": [52.3555, -1.1743]},
    {"Australia": [27.00, 133.00]}
  ]

  let coordinate = coordinatesCountries.find(obj => obj[country])
  return coordinate ? coordinate[country] : null;
}


async function fetchClimate(latLongitude){
	//customised url
	let url = "https://api.open-meteo.com/v1/forecast?latitude="+latLongitude[0]+"&longitude="+latLongitude[1]+"&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
  
  let data = await fetch(url)
  .then( data => data.json())
  return data.current.temperature_2m;
}
