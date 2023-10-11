const author = document.getElementById("author");
const cryptoTop = document.getElementById("crypto-top");
const crypto = document.getElementById("crypto");
const time = document.getElementById("time");
function imgbackground() {
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
imgbackground();

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
      console.log(data);
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
function getCurrentTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-us", { timeStyle: "medium" });
  time.textContent = currentTime;
}
setInterval(getCurrentTime, 1000);
