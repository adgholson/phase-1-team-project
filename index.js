document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#query-details"); //changed to the id of query-details
  const showList = document.querySelector(".search-list"); //hoisted to top for organization
  const shows = [];
  console.log(shows);

  const addNames = (show) => {
    const showName = document.createElement("li");
    showName.textContent = show.name;
    showList.appendChild(showName);
    showName.classList.add("hidden");

    showName.addEventListener("click", () => {
      const showImage = document.querySelector(".show-pic");
      showImage.src = show.image.medium;
      const showTitle = document.querySelector("#show-name");
      showTitle.textContent = `Title: ${show.name}`;
      const showLength = document.querySelector("#show-length");
      showLength.textContent = `Runtime: ${show.runtime}`;
      const showLanguage = document.querySelector("#show-lang");
      showLanguage.textContent = ` Language: ${show.language}`;

      const showRating = document.querySelector("#show-rating");

      showImage.addEventListener("mouseover", () => {
        showRating.textContent = `Rating: ${show.rating.average || "N/A"}`;
        showRating.classList.remove("hidden");
      });

      showImage.addEventListener("mouseout", () => {
        showRating.classList.add("hidden");
      });
    });
  };

  fetch("https://api.tvmaze.com/shows")
    .then((r) => r.json())
    .then((data) => {
      shows.push(...data);
      shows.forEach((show) => {
        addNames(show);
      });
      searchBar(shows);
    });
  function searchBar(shows) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      shows.forEach((show) => {
        const showNameElements = showList.querySelectorAll("li"); // Select all li elements

        showNameElements.forEach((showNameElement) => {
          const showName = showNameElement.textContent.toLowerCase();

          if (showName.includes(value)) {
            showNameElement.classList.remove("hidden");
          } else {
            showNameElement.classList.add("hidden");
          }
        });
        if (value === "") {
          showNameElements.forEach((showNameElement) => {
            showNameElement.classList.add("hidden");
          });
        }
      });
    });
  }
  const newShowForm = document.querySelector("#new-show");
  newShowForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const showImageInput = document.querySelector("#form-image");
    const showNameInput = document.querySelector("#form-title");
    const showRuntimeInput = document.querySelector("#form-run");
    const showLanguageInput = document.querySelector("#form-lang");
    const showRatingInput = document.querySelector("#form-rating");
    const newShow = {
      image: showImageInput.value,
      name: showNameInput.value,
      runtime: showRuntimeInput.value,
      language: showLanguageInput.value,
      rating: { average: showRatingInput.value },
    };
    fetch("http://localhost:3000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShow),
    })
      .then((r) => r.json())
      .then((newShowResponse) => {
        shows.push(newShowResponse);
        addNames(newShowResponse);
      });
      showImageInput.value ="";
    showNameInput.value = "";
    showRuntimeInput.value = "";
    showLanguageInput.value = "";
    showRatingInput.value = "";
  });
 fetch("http://localhost:3000/userData")
  .then((r) => r.json())
  .then((data) => {
    shows.push(...data);
    shows.forEach((show) => {
      addNames(show);
    });
    searchBar(shows);
  });
});
