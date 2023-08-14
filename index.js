const searchInput = document.querySelector("search-input");

const addNames = (shows) => {
  (show) => {
    // create const for new name span/div/header//
    const showName = document.createElement("span")(
      //set textContent to show.name
      (showName.textContent = show.name)
    );
    //const for where new show name is put//
    const showList = document.querySelector("show-list");
    //append first const to the second//
    showList.appendChild(showName);
  };

  let shows = [];
  //not sure if needed//

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    shows.forEach((show) => {
      if (show.name.includes(value)) {
        className.add("visible");
      } else {
        className.remove("visible");
      }
    });
  });

  fetch("https://api.tvmaze.com/shows")
    .then((r) => r.json())
    .then((shows) => {
      shows.forEach((show) => {
        addNames(show);
      });
    });
};
