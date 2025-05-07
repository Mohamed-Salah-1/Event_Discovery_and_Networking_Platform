document.addEventListener("DOMContentLoaded", function () {
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

  // Function to render events
  function renderEvents(eventsToRender) {
    const eventsContainer = document.getElementById("eventsContainer");
    if (!eventsContainer) return;

    eventsContainer.innerHTML = "";

    if (eventsToRender.length === 0) {
      eventsContainer.innerHTML = "<p>No events found.</p>";
      return;
    }

    eventsToRender.forEach((event) => {
      const eventCard = document.createElement("div");
      eventCard.className = "col-md-6 col-lg-4 mb-4";
      eventCard.innerHTML = `
        <div class="card h-100">
          <a href="${event.link}">
            <img src="${event.image}" alt="${event.title}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${event.title}</h5>
            </div>
          </a>
          <div class="card-body">
            <p class="card-text">
              <strong>Date:</strong> ${event.date}<br>
              <strong>Location:</strong> ${event.location}<br>
              <strong>Interest:</strong> ${event.interest}<br>
              <strong>Ticket Price:</strong> ${event.ticketPrice === 0 ? 'Free' : `${event.ticketPrice} SAR`}<br>
              <strong>Description:</strong> ${event.description}
            </p>
          </div>
        </div>
      `;
      eventsContainer.appendChild(eventCard);
    });
  }

  // Function to filter events
  function filterEvents() {
    const location = document.getElementById("location").value;
    const interest = document.getElementById("interest").value;
    const month = document.getElementById("month").value;

    fetchEvents()
      .then((events) => {
        const filteredEvents = events.filter((event) => {
          const [day, monthStr, year] = event.date.split("/");
          const eventDate = new Date(year, monthStr - 1, day);
          const eventMonthYear = `${year}-${String(monthStr).padStart(2, "0")}`;

          const locationMatch = location ? event.location === location : true;
          const interestMatch = interest ? event.interest === interest : true;
          const monthMatch = month ? eventMonthYear === month : true;

          return locationMatch && interestMatch && monthMatch;
        });

        renderEvents(filteredEvents);
      })
      .catch((error) => {
        console.error("Error filtering events:", error);
      });
  }

  // Initial render of events
  fetchEvents()
    .then((events) => {
      renderEvents(events);
    })
    .catch((error) => {
      console.error("Error loading initial events:", error);
    });

  // Handle form submission
  const form = document.getElementById("eventSearchForm");
  const clearButton = document.getElementById("clearSearch");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    filterEvents();
  });

  // Clear search functionality
  clearButton.addEventListener("click", function () {
    document.getElementById("location").value = "";
    document.getElementById("interest").value = "";
    document.getElementById("month").value = "";

    fetchEvents()
      .then((events) => {
        renderEvents(events);
      })
      .catch((error) => {
        console.error("Error resetting events:", error);
      });
  });
});