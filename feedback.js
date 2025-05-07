document.addEventListener("DOMContentLoaded", function () {
  const eventSelect = document.getElementById("event");
  const nameInput = document.getElementById("name");
  const feedbackForm = document.getElementById("feedbackForm");

  // Function to get logged in user
  function getLoggedInUser() {
    const userJson = localStorage.getItem("loggedInUser");
    return userJson ? JSON.parse(userJson) : null;
  }

  // Function to fetch events from the server
  async function fetchEvents() {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return [];
    }
  }

  // Function to populate event dropdown from the server
  async function populateEventDropdown() {
    try {
      const events = await fetchEvents();
      // Clear existing options except the default one
      while (eventSelect.options.length > 1) {
        eventSelect.remove(1);
      }

      events.forEach((event) => {
        const option = document.createElement("option");
        option.value = event.title;
        option.textContent = event.title;
        eventSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error populating event dropdown:", error);
    }
  }

  // Check if a user is logged in
  const loggedInUser = getLoggedInUser();

  // Populate event dropdown and update form based on login status
  fetchEvents().then((events) => {
    populateEventDropdown();

    // If user is logged in, set their name in the form
    if (loggedInUser) {
      nameInput.value = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
      nameInput.disabled = true; // Optionally disable the field if you don't want them to change it
    } else {
      // If user is not logged in, disable the form
      feedbackForm.reset();
      feedbackForm.classList.add("disabled");
      feedbackForm.querySelectorAll("input, select, textarea, button").forEach((el) => {
        el.disabled = true;
      });
    }
  });

  // Handle form submission
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Collect form data
      const formData = {
        event: eventSelect.value,
        name: nameInput.value,
        rating: document.querySelector('input[name="rating"]:checked')?.value || "",
        comments: document.getElementById("comments").value,
        timestamp: new Date().toISOString(),
      };

      // Validate form data
      if (!formData.event || !formData.name || !formData.rating || !formData.comments) {
        alert("Please fill in all required fields");
        return;
      }

      // Save feedback to the server
      saveFeedbackToServer(formData);
    });
  }

  // Function to save feedback to the server
  function saveFeedbackToServer(feedback) {
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    })
      .then((response) => response.text())
      .then((responseText) => {
        if (responseText === "Feedback saved successfully") {
          // Show updated success message
          alert(
            "Thank you for your feedback! Your response has been sent for admin verification and will be posted soon."
          );

          // Reset form
          feedbackForm.reset();
        } else {
          alert("Failed to save feedback. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error saving feedback:", error);
        alert("Error saving feedback. Please try again.");
      });
  }

  // Function to convert rating to stars
  function ratingToStars(rating) {
    const stars = "⭐".repeat(rating);
    return stars;
  }

  // Function to display feedback from the server
  function displayFeedback() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((feedbackData) => {
        const filteredFeedback = feedbackData.filter(
          (feedback) => feedback.approved === true
        );
        const feedbackContainer = document.querySelector("#feedbackContainer");
        feedbackContainer.innerHTML = ""; // Clear existing items

        filteredFeedback.forEach((feedback) => {
          const feedbackItem = document.createElement("div");
          feedbackItem.className = "card mb-3";

          feedbackItem.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">${feedback.event}</h5>
              <p class="card-text">
                <strong>Rating:</strong> ${ratingToStars(parseInt(feedback.rating))}<br>
                <strong>Comment:</strong> ${feedback.comments}
              </p>
              <footer class="blockquote-footer user-name">
                ${feedback.name}
              </footer>
            </div>
          `;

          feedbackContainer.appendChild(feedbackItem);
        });
      })
      .catch((error) => {
        console.error("Error loading feedback:", error);
      });
  }

  // Add rating label text update
  const ratingInputs = document.querySelectorAll('input[name="rating"]');
  const ratingText = document.querySelector(".rating-text");

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  ratingInputs.forEach((input) => {
    input.addEventListener("change", function () {
      ratingText.textContent = ratingLabels[this.value];
    });
  });

  // Initial display of feedback
  displayFeedback();
});