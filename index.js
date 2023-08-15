document.addEventListener("DOMContentLoaded", () => {
  //added a DOMContentLoaded to make sure code is being executed after DOM is loaded
  const searchInput = document.querySelector("#query-details"); //changed to the id of query-details
  const showList = document.querySelector(".search-list"); //hoisted to top for organization

  const addNames = (show) => {
    //changed function declaration declaring arrow function in arrow function
    // create const for new name span/div/header
    const showName = document.createElement("span");
    showName.textContent = show.name; //set textContent to show.name;
    showName.classList.add("hidden"); //changed from className to classList.add to add a class
    //const for where new show name is put
    showList.appendChild(showName); //append first const to the second
  };

  fetch("https://api.tvmaze.com/shows")
    .then((r) => r.json())
    .then((data) => {
      shows = data; //store the fetched data in the 'shows' array
      console.log(shows)
      shows.forEach((show) => {
        addNames(show);
      });
    })
    .catch((error) => {
      //moved '.catch' block back to promise by fetch and not to the event listener to resolve error.
      console.error("Error fetching data:", error);
    });

  let shows = [];

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase(); //.toLowerCase makes it case insensitive

    shows.forEach((show) => {
      const showName = showList.querySelector(`span[data-show="${show.id}"]`); // to iterate through the shows array & for each show the showList is queried to the specific span.

      if (show.name.toLowerCase().includes(value)) {
        showName.classList.remove("hidden"); //Changed from className to classList to remove class
      } else {
        showName.classList.add("hidden"); //changed className to classList to add a class
      }
    });
  });

  //});
  //create new div element to contain display area
  // const createHoverDisplay = () => {
  //   const hoverInfo = document.createElement("div");
  //   hoverInfo.classList.add("hover-info"); // might need to change when able to view CSS?
  //   //create elements to display name, image, summary for hovered show
  //   const hoverName = document.createElement("name");
  //   const hoverImage = document.createElement("image");
  //   const hoverSum = document.createElement("sum");
  //   //const hoverInfo = document.createElement("div");

  //   hoverInfo.append(hoverName);
  //   hoverInfo.append(hoverImage);
  //   hoverInfo.append(hoverSum);
  //   //add hover display to body of webpage
  //   document.body.append(hoverInfo);

  //   return { hoverName, hoverImage, hoverSum, hoverInfo };
  // };
  // const setupHoverInteraction = () => {
  //   const { hoverName, hoverImage, hoverSum, hoverInfo } = createHoverDisplay(); //assign for easier access

  //   showList.addEventListener("mouseover", (event) => {
  //     const showId = event.target.dataset.showId;

  //     if (showId) {
  //       //checks value to show valid ID
  //       const hoveredShow = shows.find((show) => show.id == parseInt(showId));

  //       if (hoveredShow) {
  //         // updates content of the hover display with info of show and makes it visible
  //         hoverName.textContent = hoveredShow.name;
  //         hoverImage.src = hoveredShow.image ? hoveredShow.image.medium : "placeholder-img";
  //         hoverSum.textContent = hoveredShow.summary || "No summary available.";
  //         hoverInfo.style.display = "block";
  //       }
  //     }
  //   }); //make trigger for when mouse moves away from list to make hoverInfo hidden.
  //   showList.addEventListener("mouseout", () => {
  //     hoverInfo.style.display = "none";
  //   });
  // };
});

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
