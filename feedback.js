document.addEventListener("DOMContentLoaded", function () {
  const eventSelect = document.getElementById("event");
  const nameInput = document.getElementById("name");
  const feedbackForm = document.getElementById("feedbackForm");

  // Function to get logged in user
  function getLoggedInUser() {
    const userJson = localStorage.getItem("loggedInUser");
    return userJson ? JSON.parse(userJson) : null;
  }

  // Check if a user is logged in
  const loggedInUser = getLoggedInUser();

  // Function to populate event dropdown from the events array
  function populateEventDropdown(events) {
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
  }

  // Wait for the events to be ready
  window.eventsReady.then((events) => {
    populateEventDropdown(events);

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
      };

      // Validate form data
      if (!formData.event || !formData.name || !formData.rating) {
        alert("Please fill in all required fields (event, name, and rating)");
        return;
      }

      // Here you would typically send this data to your server
      console.log("Feedback submitted:", formData);

      // For demo purposes, save to localStorage
      saveFeedback(formData);

      // Show success message
      alert("Thank you for your feedback! Your response has been sent for review.");

      // Reset form
      feedbackForm.reset();
    });
  }

  function saveFeedback(feedback) {
    // Get existing feedback or initialize empty array
    const savedFeedback = JSON.parse(localStorage.getItem("eventFeedback") || "[]");

    // Add new feedback with timestamp
    savedFeedback.push({
      ...feedback,
      timestamp: new Date().toISOString(),
    });

    // Save back to localStorage
    localStorage.setItem("eventFeedback", JSON.stringify(savedFeedback));
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
});
