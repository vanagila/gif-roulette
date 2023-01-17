const API_KEY = "IuSylkr4O49mCDh0RFRv1cbvjql5PxNi";
const searchInput = document.querySelector(".header__input");
const searchBtn = document.querySelector(".header__btn");
const gifsContainer = document.querySelector(".gifs__container");
const hint = document.querySelector(".feedback__hint");

const randomGif = (arr) => {
  const random = Math.floor(Math.random() * arr.length);

  return arr[random];
};

const createVideo = (src) => {
  const video = document.createElement("video");

  video.src = src;
  video.autoplay = true;
  video.muted = "muted";
  video.loop = true;
  video.className = "video";

  return video;
};

const toggleLoading = (state) => {
  if (state) {
    document.body.classList.add("loading");
    searchInput.disable = true;
  } else {
    document.body.classList.remove("loading");
    searchInput.disable = false;
    searchInput.focus();
  }
};

const searchGiphy = (searchTerm) => {
  toggleLoading(true);

  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const gif = randomGif(json.data);
      const src = gif.images.original.mp4;
      const video = createVideo(src);

      gifsContainer.append(video);

      video.addEventListener("loadeddata", () => {
        video.classList.add("visible");

        toggleLoading(false);

        document.body.classList.add("has-results");

        hint.innerHTML = `Hit enter or click on <i class="fa-solid fa-magnifying-glass header__btn-img"></i>  to search more ${searchTerm}`;
      });
    })
    .catch(() => {
      toggleLoading(false);

      hint.innerText = `Nothing found for ${searchTerm}`;
    });
};

const doSearch = () => {
  const searchTerm = searchInput.value;

  if (searchTerm.length > 2) {
    hint.classList.add("show-hint");
    hint.innerHTML = `Hit enter or click on <i class="fa-solid fa-magnifying-glass header__btn-img"></i> to search ${searchTerm}`;

    searchGiphy(searchTerm);
  } else {
    hint.classList.remove("show-hint");
  }
};

searchBtn.addEventListener("click", doSearch);
document.addEventListener("keyup", (ev) => {
  const searchTerm = searchInput.value;

  if (searchTerm.length > 2) {
    hint.classList.add("show-hint");
  } else {
    hint.classList.remove("show-hint");
  }

  if (ev.key === "Enter" && searchTerm.length > 2) {
    searchGiphy(searchTerm);
  }
});
