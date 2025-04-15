document.addEventListener("DOMContentLoaded", function () {
  const events = [
    {
      title: "Saudi Arabian Grand Prix 2025",
      location: "Riyadh",
      interest: "Sports",
      date: "18/04/2025",
      description: "Excitement is in the air as the Saudi Arabian Grand Prix returns to Jeddah Corniche Circuit.",
      image: "images/Saudi_Arabian_Grand_Prix_2025.jpg",
      link: "https://tickets.saudiarabiangp.com/?utm_source=sem&utm_medium=zmkn&utm_campaign=en&gad_source=1&gclid=CjwKCAjw5PK_BhBBEiwAL7GTPSSdo9inmL5VhrhvV0T0oWtmhWYgWUqgZkuAPTGEe7aNpoPwpo-DvBoC1I8QAvD_BwE",
      ticketPrice: 300, 
    },
    {
      title: "Riyadh Racing Season Race Night",
      location: "Riyadh",
      interest: "Sports",
      date: "18/01/2025",
      description: "A race night at King Abdulaziz Racecourse is an evening like no other.",
      image: "https://images.ctfassets.net/vy53kjqs34an/3wQMX7ZkHM4UF0q9mSNhY6/6e4d60fcbb1ee17959a22e2f84e55f8b/v.jpg",
      link: "https://webook.com/en/events/riyadh-racing-season-rsace-night-42",
      ticketPrice: 20 
    },
    {
      title: "English Club",
      location: "Khafji",
      interest: "Education",
      date: "03/06/2025",
      description: "The yearly English Club event.",
      image: "images/English_Club.jpg",
      link: "events/english_club.html",
      ticketPrice: 50, // Added ticket price
    },
    {
      title: "Arab Music Concert",
      location: "Dammam",
      interest: "Music",
      date: "31/03/2025", // Ensure this date is correct
      description: "A Concert in Dammam for Arab Music lovers and artists.",
      image: "images/Arab Music Concert.jpg",
      link: "events/arab_music_concert.html",
      ticketPrice: 100, // Added ticket price
    },
    {
      title: "Ai Discovery Conference",
      location: "Jeddah",
      interest: "Technology",
      date: "04/04/2025",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "images/what-is-ai-artificial-intelligence.webp",
      link: "events/Ai_Discovery_Conference.html",
      ticketPrice: 300, // Added ticket price
    },
  ];

  // Export the events array to the global window object
  window.events = events;

  // Resolve a promise when events are ready
  window.eventsReady = new Promise((resolve) => {
    resolve(events);
  });

  // Function to render events
  function renderEvents(filteredEvents = events) {
    const eventsContainer = document.getElementById("eventsContainer");
    eventsContainer.innerHTML = "";
    filteredEvents.forEach((event) => {
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
                            <strong>Ticket Price:</strong> ${event.ticketPrice} SAR<br> <!-- Added ticket price -->
                            <strong>Description:</strong> ${event.description}
                        </p>
                    </div>
                </div>
            `;
      eventsContainer.appendChild(eventCard);
    });
  }

  // Initial render of events
  renderEvents();

  // Handle form submission
  const form = document.getElementById("eventSearchForm");
  const clearButton = document.getElementById("clearSearch");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const location = document.getElementById("location").value;
    const interest = document.getElementById("interest").value;
    const month = document.getElementById("month").value;

    // Filter events based on search criteria
    const filteredEvents = events.filter((event) => {
      // Parse the event date correctly (DD/MM/YYYY)
      const [day, monthStr, year] = event.date.split("/");
      const eventDate = new Date(year, monthStr - 1, day); // JavaScript months are 0-based
      const eventMonthYear = `${year}-${String(monthStr).padStart(2, "0")}`;

      const locationMatch = location ? event.location === location : true;
      const interestMatch = interest ? event.interest === interest : true;
      const monthMatch = month ? eventMonthYear === month : true;

      return locationMatch && interestMatch && monthMatch;
    });

    console.log("Filtered Events:", filteredEvents);

    renderEvents(filteredEvents);
  });

  // Clear search functionality
  clearButton.addEventListener("click", function () {
    // Reset form fields
    document.getElementById("location").value = "";
    document.getElementById("interest").value = "";
    document.getElementById("month").value = "";

    // Render all events
    renderEvents();
  });
});
