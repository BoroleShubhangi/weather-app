const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const left = document.getElementById("left");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getByLocation(city) {
  const resp = await fetch(url(city), { origin: "cors" });
  const respData = await resp.json();

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  const details = document.createElement("div");
  details.classList.add("details");

   weather.innerHTML=`
   
   <h2>${temp}°C &nbsp;<span>${data.name}</span>&nbsp;<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>`

  details.innerHTML = ` 
  <p>Weather Details</p>
        <table>
        <td>      
            <tr>
                <td>humidity</td>
                <td>${data.main.humidity}%</td>
              </tr>
              <tr>
                <td>weather</td>
                <td>${data.weather[0].main}</td>
              </tr>
              <tr>
                  <td>winds</td>
                  <td>${data.wind.speed}km/h</td>
              </tr>
              <tr>
                  <td>cloudy</td>
                  <td>${data.clouds.all}%</td>
              </tr>
        </td>
    </table>
    `;
  left.innerHTML="";
  left.appendChild(weather);
  
  main.innerHTML = "";
  main.appendChild(details);

}

function KtoC(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getByLocation(city);
  } else alert("Error:City not found");
});
//     weather.innerHTML=`<h2>${temp}°C &nbsp;&nbsp; <span>${data.name}</span><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/></h2>  
