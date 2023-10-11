const author = document.getElementById("author");
const cryptoTop = document.getElementById("crypto-top");
const crypto = document.getElementById("crypto");
const time = document.getElementById("time");
const weather = document.getElementById("weather");
function imgBackground() {
  fetch(
    "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
  )
    .then((res) => res.json())
    .then((data) => {
      document.body.style.backgroundImage = `url(${data.urls.regular})`;
      author.textContent = `By: ${data.user.name}`;
    })
    .catch((error) => {
      console.error(error);
      document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1694675856558-bc858408e60c?ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTY5MDk2ODN8&ixlib=rb-4.0.3)`;
      author.textContent = `By: Hossein Moghtafari`;
    });
}
imgBackground();

function getCrypto() {
  fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then((res) => {
      if (!res.ok) {
        console.log(res.status);
        throw Error("Something went wrong!");
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      cryptoTop.innerHTML = `
      <img src = ${data.image.small} />
      <span>${data.name}</span>
      `;

      crypto.innerHTML += `
      <p>🎯: $${data.market_data.current_price.usd}</p>
      <p>👆: $${data.market_data.high_24h.usd}</p>
      <p>👇: $${data.market_data.low_24h.usd}</p>
      `;

      // data.name,
      //   data.image.small,
      //   data.market_data.current_price.usd,
      //   data.market_data.high_24h.usd,
      //   data.market_data.low_24h.usd;
    })
    .catch((err) => console.error(Error));
}
getCrypto();
// setInterval(getCrypto, 30 * 1000)
function getCurrentTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-us", { timeStyle: "medium" });
  time.textContent = currentTime;
}
setInterval(getCurrentTime, 1000);

function getCurrentWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
          throw Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weather.innerHTML = `
        
          <img src=${iconUrl} />
          <span class = "weather-temp">${Math.round(data.main.temp)}º </span>
        
        <span class= "weather-city">${data.name} </span>
        `;
      })
      .catch((err) => console.error(err));
  });
}
getCurrentWeather();
setInterval(getCurrentWeather, 60 * 1000);
