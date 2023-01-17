const API_KEY = "IuSylkr4O49mCDh0RFRv1cbvjql5PxNi";
const searchInput = document.querySelector(".header__input");
const searchBtn = document.querySelector(".header__btn");

const randomGif = (arr) => {
  const random = Math.floor(Math.random() * arr.length);

  return arr[random];
};

const searchGiphy = (searchTerm) => {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const gif = randomGif(json.data);
      const src = gif.images.original.mp4;
    })
    .catch((err) => {
      console.log(err);
    });
};

const doSearch = () => {
  const searchTerm = searchInput.value;

  if (searchTerm.length > 2) {
    searchGiphy(searchTerm);
  } else {
  }
};

searchBtn.addEventListener("click", doSearch);
