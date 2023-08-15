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
});

// //create new div element to contain display area
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
//   };
// });

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

// fetch("https://api.tvmaze.com/shows")
//   .then((r) => r.json())
//   .then((data) => {
//     shows = data; //store the fetched data in the 'shows' array
//     console.log(shows);
//     shows.forEach((show) => {
//       addNames(show);
//     });
//   })
//   .catch((error) => {
//     //moved '.catch' block back to promise by fetch and not to the event listener to resolve error.
//     console.error("Error fetching data:", error);
//   });

// let shows = [];
