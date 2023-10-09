const author = document.getElementById("author");
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
      document.body.style.backgroundColor = `green`;
    });
}
imgbackground();
