// Admin dashboard logic
let adminToken = null;

function adminLogin() {
  const password = document.getElementById("admin-password").value;
  fetch("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        adminToken = data.token;
        document.getElementById("admin-login-section").style.display = "none";
        document.getElementById("admin-dashboard").style.display = "block";
        loadAdminData();
      } else {
        document.getElementById("admin-login-error").innerText = "Invalid password";
      }
    });
}

function loadAdminData() {
  fetch("/admin/stats", { headers: { Authorization: adminToken } })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("stats").innerHTML = `
        <strong>Total Events:</strong> ${data.eventCount} <br>
        <strong>Total Users:</strong> ${data.userCount}
      `;
      renderUsers(data.users);
      renderEvents(data.events);
      renderFeedbacks(
        data.feedbacks.filter((f) => !f.approved),
        data.events
      ); // Only show unapproved feedbacks
    });
}

function renderUsers(users) {
  const userListBody = document.getElementById("user-list-body");
  userListBody.innerHTML = users
    .map(
      (u) => `
        <tr>
          <td>${u.username}</td>
          <td>${u.firstName}</td>
          <td>${u.lastName}</td>
          <td>${u.email}</td>
          <td>
            <button class="admin-btn btn-sm" onclick="removeUser('${u.username}')">
              <i class="fa-solid fa-trash"></i> Remove
            </button>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderEvents(events) {
  const eventList = document.getElementById("event-list");
  eventList.innerHTML = events
    .map(
      (e) =>
        `<div class="admin-list-item">
          <strong>${e.title}</strong>
          <button class="admin-btn btn-sm" onclick="removeEvent('${e.id}')">Remove</button>
        </div>`
    )
    .join("");
}

function renderFeedbacks(feedbacks, events) {
  const feedbackList = document.getElementById("feedback-list");
  feedbackList.innerHTML = feedbacks
    .map(
      (f) =>
        `<div class="admin-list-item flex-column align-items-start">
          <div><strong>Event:</strong> ${f.event || "-"}</div>
          <div><strong>User:</strong> ${f.name || f.user || "-"}</div>
          <div><strong>Comment:</strong> ${f.comments || f.text || "-"}</div>
          <button class="admin-btn btn-sm mt-2" onclick="approveFeedback('${f.id}')">Approve</button>
          <button class="admin-btn btn-sm mt-2" onclick="rejectFeedback('${f.id}')">Reject</button>
        </div>`
    )
    .join("");
}

function addUser() {
  // Clear previous messages
  document.getElementById("addUserError").textContent = "";
  document.getElementById("addUserSuccess").textContent = "";

  const firstName = document.getElementById("new-firstName").value.trim();
  const lastName = document.getElementById("new-lastName").value.trim();
  const username = document.getElementById("new-username").value.trim();
  const email = document.getElementById("new-email").value.trim();
  const password = document.getElementById("new-password").value;

  // Basic validation
  if (!firstName || !lastName || !username || !email || !password) {
    document.getElementById("addUserError").textContent = "All fields are required.";
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    document.getElementById("addUserError").textContent = "Invalid email format.";
    return;
  }
  if (password.length < 6) {
    document.getElementById("addUserError").textContent = "Password must be at least 6 characters.";
    return;
  }

  fetch("/admin/addUser", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ username, email, firstName, lastName, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("addUserSuccess").textContent = "User added successfully!";
        document.getElementById("addUserForm").reset();
        setTimeout(() => {
          document.getElementById("addUserSuccess").textContent = "";
        }, 2000);
        loadAdminData(); // Refresh the user list
      } else {
        document.getElementById("addUserError").textContent = data.error || "Failed to add user.";
      }
    })
    .catch(() => {
      document.getElementById("addUserError").textContent = "Server error. Please try again.";
    });
}

function removeUser(username) {
  if (!confirm(`Are you sure you want to remove user ${username}?`)) {
    return;
  }

  fetch("/admin/removeUser", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ username }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        loadAdminData(); // Refresh the user list
      } else {
        alert("Failed to remove user: " + (data.error || "Unknown error"));
      }
    })
    .catch(() => {
      alert("Server error. Please try again.");
    });
}

function addEvent() {
  // Clear previous messages
  document.getElementById("addEventError").textContent = "";
  document.getElementById("addEventSuccess").textContent = "";

  const title = document.getElementById("new-event-title").value.trim();
  const location = document.getElementById("new-event-location").value.trim();
  const interest = document.getElementById("new-event-interest").value;
  const dateInput = document.getElementById("new-event-date").value;
  const description = document.getElementById("new-event-description").value.trim();
  const image = document.getElementById("new-event-image").value.trim();
  const link = document.getElementById("new-event-link").value.trim();
  const ticketPrice = document.getElementById("new-event-ticketPrice").value;

  // Basic validation
  if (!title || !location || !interest || !dateInput || !description || !image || !link || ticketPrice === "") {
    document.getElementById("addEventError").textContent = "All fields are required.";
    return;
  }
  if (isNaN(Number(ticketPrice)) || Number(ticketPrice) < 0) {
    document.getElementById("addEventError").textContent = "Ticket price must be a non-negative number.";
    return;
  }

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const [year, month, day] = dateInput.split('-');
  const formattedDate = `${day}/${month}/${year}`;

  fetch("/admin/addEvent", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ title, location, interest, date: formattedDate, description, image, link, ticketPrice }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("addEventSuccess").textContent = "Event added successfully!";
        document.getElementById("addEventForm").reset();
        setTimeout(() => {
          document.getElementById("addEventSuccess").textContent = "";
        }, 2000);
        loadAdminData();
      } else {
        document.getElementById("addEventError").textContent = data.error || "Failed to add event.";
      }
    })
    .catch(() => {
      document.getElementById("addEventError").textContent = "Server error. Please try again.";
    });
}

function removeEvent(id) {
  fetch("/admin/removeEvent", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ id }),
  }).then(() => loadAdminData());
}

// Modify the approveFeedback function to handle approval
function approveFeedback(id) {
  fetch("/admin/approveFeedback", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ id }),
  }).then(() => loadAdminData());
}

// Add a new function to handle rejection
function rejectFeedback(id) {
  fetch("/admin/rejectFeedback", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ id }),
  }).then(() => loadAdminData());
}
