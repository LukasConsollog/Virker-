let selectedRating = 0;

function writeReview(juiceName) {
  const overlay = document.getElementById("review-overlay");
  overlay.style.display = "block";
  const popupTitle = document.getElementById("popup-title");
  popupTitle.textContent = `Write a review for ${juiceName}`;
  const submitButton = document.querySelector(".submit-button");
  submitButton.onclick = function () {
    submitReview(juiceName);
  };
}

function closeOverlay() {
  const overlay = document.getElementById("review-overlay");
  overlay.style.display = "none";
  resetRating();
}

function setRating(rating) {
  selectedRating = rating;
  updateStars();
}
// hej

function updateStars() {
  const stars = document.querySelectorAll(".star-rating i");
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < selectedRating);
  });
}

function resetRating() {
  selectedRating = 0;
  updateStars();
}

function submitReview(juiceName) {
  const reviewText = document.getElementById("reviewText").value;
  const stars = document.querySelectorAll(".star-rating i.active").length;

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  const username = userData.username;

  if (username === null) {
    alert("Please sign in to submit a review.");
    return;
  }

  // Make a POST request to your server
  fetch("/submitreview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      juiceName,
      stars,
      review: reviewText,
    }),
  })
    .then((response) => response.text()) // Read the response as text
    .then((responseText) => {
      console.log("Response from server:", responseText);
      alert(responseText); // Display the response as a plain string
      closeOverlay();
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    });
}

async function fetchJuices() {
  let response;

  try {
    response = await fetch("/getreview");

    // Check if the response is JSON

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching juices:", error);

    // Log the entire response for debugging
    console.error("Entire response:", response);

    // Check if response is defined before using it
    if (response) {
      try {
        // Log the actual response text for further debugging
        const responseText = await response.text();
        console.error("Actual response text:", responseText);
      } catch (textError) {
        console.error("Error reading response text:", textError);
      }
    }

    return [];
  }
}

async function showReview(juiceName) {
  try {
    // Fetch the juices from the server
    const juices = await fetchJuices();

    // Find the corresponding juice object from the fetched data
    const juice = juices.find((juice) => juice.juice_name === juiceName);

    console.log("Found juice:", juice);

    if (!juice) {
      console.error("Juice not found:", juiceName);
      return;
    }

    // Filter reviews based on the juice_name
    const juiceReviews = juices.filter(
      (review) => review.juice_name === juiceName
    );

    // Create a modal container
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Create a modal content div
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Create a close button for the modal
    const closeButton = document.createElement("button");
    closeButton.textContent = "";
    closeButton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
    modalContent.appendChild(closeButton);

    // Create a container for the juice details
    const juiceDetailsContainer = document.createElement("div");
    juiceDetailsContainer.classList.add("juice-details-container");

    // Juice Name
    const juiceNameElement = document.createElement("h2");
    juiceNameElement.textContent = juice.juice_name;
    juiceDetailsContainer.appendChild(juiceNameElement);

    // Juice Image
    const juiceImageElement = document.createElement("img");
    juiceImageElement.src = document.getElementById("juiceImage").src; // Use the juice image from the HTML
    juiceDetailsContainer.appendChild(juiceImageElement);

    modalContent.appendChild(juiceDetailsContainer);

    // Create a container for the reviews
    const reviewsContainer = document.createElement("div");
    reviewsContainer.classList.add("reviews-container");

    if (
      !juiceReviews ||
      !Array.isArray(juiceReviews) ||
      juiceReviews.length === 0
    ) {
      const noReviewsMessage = document.createElement("div");
      noReviewsMessage.textContent = "No reviews available for this juice.";
      reviewsContainer.appendChild(noReviewsMessage);
    } else {
      juiceReviews.forEach((review) => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

        const usernameElement = document.createElement("div");
        usernameElement.classList.add("review-username");
        usernameElement.textContent = `Username: ${review.username}`;

        const starsElement = document.createElement("div");
        starsElement.classList.add("review-stars");

        // Assuming review.stars is a number between 1 and 5
        starsElement.innerHTML = `${"★".repeat(review.stars)}`;

        const reviewTextElement = document.createElement("div");
        reviewTextElement.classList.add("review-text");
        reviewTextElement.textContent = `Review: ${review.review_text}`;

        reviewElement.appendChild(usernameElement);
        reviewElement.appendChild(starsElement);
        reviewElement.appendChild(reviewTextElement);

        reviewsContainer.appendChild(reviewElement);
      });
    }

    modalContent.appendChild(reviewsContainer);
    modalContainer.appendChild(modalContent);

    // Append the modal container to the body
    document.body.appendChild(modalContainer);

    // Display the modal
    modalContainer.style.display = "block";

    // Update stars if needed
    updateStars();
  } catch (error) {
    console.error("Error fetching and displaying reviews:", error);
  }
}
