const searchInput = document.querySelector("search-input");
const showList = document.querySelector("show-list"); //hoisted to top for organization

const addNames = (show) => {
  //changed function declaration declaring arrow function in arrow function

  // create const for new name span/div/header//
  const showName = document.createElement("span");
  //set textContent to show.name
  showName.textContent = show.name;
  //const for where new show name is put//
  // showList = document.querySelector("show-list"); hoisted show-list
  //append first const to the second//
  showList.appendChild(showName);
};

let shows = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase(); //.toLowerCase makes it case insensitive

  shows.forEach((show) => {
    if (show.name.toLowerCase().includes(value)) {
      className.add("visible");
    } else {
      className.remove("visible");
    }
  });
});

fetch("https://api.tvmaze.com/shows%22")
  .then((r) => r.json())
  .then((shows) => {
    // shows = data;
    shows.forEach((show) => {
      addNames(show);
    });
  });
//create new div element to contain display area
const createHoverDisplay = () => {
  const hoverInfo = document.createElement("div");
  hoverInfo.classList.add("hover-info"); // might need to change when able to view CSS?
  //create elements to display name, image, summary for hovered show
  const hoverName = document.createElement("name");
  const hoverImage = document.createElement("image");
  const hoverSum = document.createElement("sum");
  //const hoverInfo = document.createElement("div");

  hoverInfo.append(hoverName);
  hoverInfo.append(hoverImage);
  hoverInfo.append(hoverSum);
  //add hover display to body of webpage
  document.body.append(hoverInfo);

  return { hoverName, hoverImage, hoverSum, hoverInfo };
};
const setupHoverInteraction = () => {
  const { hoverName, hoverImage, hoverSum, hoverInfo } = createHoverDisplay(); //assign for easier access

  showList.addEventListener("mouseover", (event) => {
    const showId = event.target.dataset.showId;

    if (showId) {
      //checks value to show valid ID
      const hoveredShow = shows.find((show) => show.id == parseInt(showId));

      if (hoveredShow) {
        // updates content of the hover display with info of show and makes it visible
        hoverName.textContent = hoveredShow.name;
        hoverImage.src = hoveredShow.image
          ? hoveredShow.image.medium
          : "placeholder-img";
        hoverSum.textContent = hoveredShow.summary || "No summary available.";
        hoverInfo.style.display = "block";
      }
    }
  }); //make trigger for when mouse moves away from list to make hoverInfo hidden.
  showList.addEventListener("mouseout", () => {
    hoverInfo.style.display = "none";
  });
};

//showList.addEventListener("mouseover", (event) => {
// const showId = event.target.dataset.showId;

// if (showId) {
//  const hoveredShow = shows.find((show) => show.id == parseInt(showId));

// if (hoveredShow) {
//   hoverName.textContent = hoveredShow.name;
//  hoverImage.src = hoveredShow.image ? hoveredShow.image.medium : "placeholder-img";
//  hoverSum.textContent = hoveredShow.summary || "No summary available.";
//hoverInfo.style.display = "block";
//}
//}
// });

//showList.addEventListener("mouseout", () => {
// hoverInfo.style.display = "none";
// });
