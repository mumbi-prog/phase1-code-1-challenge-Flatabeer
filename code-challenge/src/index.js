// Code here
function displayBeerInfo(beer){
    // Defining the variables based on IDs and classnames in HTML
    const beerName = document.getElementById("beer-name");
    const beerImage = document.getElementById("beer-image");
    const beerDescription = document.getElementById("beer-description");

    // Customer reviews
    const reviewList = document.getElementById("review-list");
    const descriptionText = document.getElementById("description");

    // Beer information
    beerName.textContent = beer.name;
    beerImage.src = beer.image_url;
    beerDescription.textContent = beer.description;
    descriptionText.value = beer.description;

    // Display beer information
    for(let review of beer.reviews){
        let beerReview = document.createElement('li');
        beerReview.textContent = review;
        reviewList.appendChild(beerReview);
    }

    // Update and submit beer description
    function updateAndSubmitDescription(description) {
        const descriptionForm = document.getElementById("description-form");
        descriptionForm.requestFullscreen();
        const descriptionText = document.getElementById("description");

        descriptionText.value = description;
        descriptionForm.submit();
    }

    // Add review
    function handleReviewAddition(event) {
        event.preventDefault();
      
        const newReview = review.value.trim();
        // Confirm that the review is not empty
        if (newReview !== "") {
          beer.reviews.push(newReview);
          updateBeerInfo(beer);
        } else {
          // Display an alert message in the case that no review has been written
          alert("Review cannot be empty!!");
        }
    }
  
     // Add an event listener to the review form
     const reviewForm = document.getElementById("review-form");
     const review = reviewForm.querySelector("input[name='review']");
     reviewForm.addEventListener("submit", handleReviewAddition);
 
     // Display reviews
     for(let review of beer.reviews){
         let newBeerReview = document.createElement('li');
         newBeerReview.textContent = review;
         reviewList.appendChild(newBeerReview);
     }
 };

// Display nav 
function navDisplay(beers) {
    const navBeerList = document.getElementById("beer-list");
    while (navBeerList.firstElementChild) {
        navBeerList.removeChild(navBeerList.lastElementChild);
    }

    beers.forEach(beer => {
        const li = document.createElement('li');
        li.textContent = beer.name;
        li.setAttribute('index', beer.id);
        navBeerList.append(li)

        li.addEventListener('click', (event) => {
            const beerId = event.target.getAttribute('index');
            fetchData(beerId)
            .then(beer => {
                displayBeerInfo(beer);
            });
        }, false);
    });
}

// Using PATCH method to fetch information about the beer
function updateBeerInfo(beer) {
    
    fetch(`http://localhost:3000/beers/${beer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(beer)
    })
    .then(response => response.json())
    .then(data => displayBeerInfo(data));
}

// Fetch beer information
async function fetchData(beer = null) {
    const baseURL = 'http://localhost:3000/beers/';
    try {
        const url = beer == null ? baseURL : `${baseURL + beer}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


// Functions to retrieve the list of beers and the details of the first beer respectively
function init() {
    // Fetch the list of beers
    fetchBeers().then(function(beers) {
        // Display the list of beers in the nav
        navDisplay(beers);

        // Fetch and display details of the first beer
        fetchBeer(1).then(function(beer) {
            displayBeerInfo(beer);
        });
    });
}
init();