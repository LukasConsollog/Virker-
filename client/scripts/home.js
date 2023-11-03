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
  const overlay = document.getElementById("reviewOverlay");
  overlay.style.display = "none";
  resetRating();
}

function setRating(rating) {
  selectedRating = rating;
  updateStars();
}

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

  // You may replace 'username' with the actual username of the reviewer
  const username = "username";

  // Make a POST request to your server
  fetch("http://localhost:3000/submitreview", {
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
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      closeOverlay();
    })
    .catch((error) => {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    });
}
