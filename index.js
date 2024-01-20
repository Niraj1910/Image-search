const API_key = "L2PAHNQ15I51A8HPXToecdQdl_Sz_dBI7QyceQqXE-8";
const img_results = document.querySelector(".img-results");
const container = document.querySelector(".container");
const main = document.querySelector(".main");

let pageNo = 1;

async function getImages() {
  let query = document.querySelector("input").value;
  const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${query}&client_id=${API_key}`;

  const response = await fetch(url);
  const result = await response.json();

  const imgArray = result.results;

  for (let index = 0; index < imgArray.length && index < 9; index++) {
    const img = document.createElement("img");

    img.src = imgArray[index].urls.full;

    img_results.appendChild(img);

    // Add event listener for mouseenter event
    img.addEventListener("mouseenter", function () {
      main.style.backgroundImage = `url(${img.src})`;
      main.style.backgroundSize = "cover"; // Cover the entire container
      main.style.backgroundPosition = "center"; // Center the image
      main.style.backgroundColor = "rgba(0, 0, 0, 0.2)"; // Adjust the alpha channel for transparency
    });
  }

  if (!document.querySelector(".show-more")) {
    const bottomBtn = document.createElement("button");
    bottomBtn.classList.add("show-more");
    bottomBtn.textContent = "Show more";
    container.appendChild(bottomBtn);

    bottomBtn.addEventListener("click", getNextPage);
  }
}

main.style.background = `linear-gradient(45deg, rgb(250, 45, 45), rgb(138, 7, 208));`;

function getNextPage() {
  pageNo++;
  getImages();
}

document.querySelector("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") getImages();
});
