// const apiKey = "0504e243ea4a4765b9fb081101ae2ca9";
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");
const newsContainer = document.querySelector(".news-container");

const load = document.querySelector(".loading");
const home = document.querySelector(".home");
const heading = document.querySelector(".heading");

const general = document.getElementsByClassName("category-btn")[0];
const technology = document.getElementsByClassName("category-btn")[1];
const business = document.getElementsByClassName("category-btn")[2];
const sports = document.getElementsByClassName("category-btn")[3];
const movies = document.getElementsByClassName("category-btn")[4];
const games = document.getElementsByClassName("category-btn")[5];

const navBtn = document.querySelector(".nav-btn");
const cat_sect = document.querySelector(".category-section");

async function getData(que) {
  load.style.visibility = "visible";
//   const url = `https://newsapi.org/v2/everything?q=${que}&apiKey=0504e243ea4a4765b9fb081101ae2ca9`
  const url = `https://newsapi.org/v2/everything?q=${que}&from=2023-02-23&sortBy=publishedAt&apiKey=0504e243ea4a4765b9fb081101ae2ca9`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    load.style.visibility = "hidden";
    const articles = data.articles;
    newsContainer.innerHTML = "";
    if (articles.length === 0) {
      const message = document.createElement("p");
      message.innerHTML = "No articles found";
      newsContainer.appendChild(message);
    } else {
      articles.forEach((article) => {
        const articleX = document.createElement("article");
        articleX.classList.add("my-article");
        articleX.innerHTML = `
              <h2>${article.title}</h2>
              <p>${article.description}</p>
              <img src="${article.urlToImage}">
              <a href="${article.url}" target="_blank">Read More</a>
              `;
        // add click event listener to the article element
        articleX.addEventListener("click", function () {
          window.open(article.url, "_blank"); // open the article link in a new tab
        });
        newsContainer.appendChild(articleX);
      });
    }
  } catch (error) {
    console.error(error);
    const message = document.createElement("p")
    message.innerHTML = "Something went wrong. Please try again later"
    newsContainer.appendChild(message)
  }
}

navBtn.addEventListener("click", () => {
  cat_sect.classList.toggle("active");
});

getData("world");

function categories(ele) {
  console.log(ele.innerHTML);
  if (ele.innerHTML === "News App") {
    heading.textContent = "Home";
    getData("world");
  } else {
    heading.textContent = ele.innerHTML;
    getData(ele.innerHTML);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value;
  if (query) {
    getData(query);
  } else {
    getData("world");
  }
});

// home.addEventListener("click", () => {
//   heading.textContent = "Home";
//   getData("world");
// });
// general.addEventListener("click", () => {
//   heading.textContent = "General";
//   getData(general.textContent);
// });
// technology.addEventListener("click", () => {
//   heading.textContent = "Technology";
//   getData(technology.textContent);
// });
// business.addEventListener("click", () => {
//   heading.textContent = "Business";
//   getData(business.textContent);
// });
// sports.addEventListener("click", () => {
//   heading.textContent = "Sports";
//   getData(sports.textContent);
// });
// movies.addEventListener("click", () => {
//   heading.textContent = "Movies";
//   getData(movies.textContent);
// });
// games.addEventListener("click", () => {
//   heading.textContent = "Games";
//   getData(games.textContent);
// });




