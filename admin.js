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
      renderFeedbacks(data.feedbacks, data.events);
    });
}

function renderUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = users
    .map(
      (u) =>
        `<div class="admin-list-item">${u.firstName || ""} ${u.lastName || ""} (${u.username}, ${u.email}) <button class="admin-btn btn-sm" onclick="removeUser('${u.username}')">Remove</button></div>`
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
        </div>`
    )
    .join("");
}

function addUser() {
  const firstName = document.getElementById("new-firstName").value;
  const lastName = document.getElementById("new-lastName").value;
  const username = document.getElementById("new-username").value;
  const email = document.getElementById("new-email").value;
  const password = document.getElementById("new-password").value;
  fetch("/admin/addUser", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ username, email, firstName, lastName, password }),
  }).then(() => loadAdminData());
}

function removeUser(username) {
  fetch("/admin/removeUser", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ username }),
  }).then(() => loadAdminData());
}

function addEvent() {
  const title = document.getElementById("new-event-title").value;
  const location = document.getElementById("new-event-location").value;
  const interest = document.getElementById("new-event-interest").value;
  const date = document.getElementById("new-event-date").value;
  const description = document.getElementById("new-event-description").value;
  const image = document.getElementById("new-event-image").value;
  const link = document.getElementById("new-event-link").value;
  const ticketPrice = document.getElementById("new-event-ticketPrice").value;
  fetch("/admin/addEvent", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ title, location, interest, date, description, image, link, ticketPrice }),
  }).then(() => loadAdminData());
}

function removeEvent(id) {
  fetch("/admin/removeEvent", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ id }),
  }).then(() => loadAdminData());
}

function approveFeedback(id) {
  fetch("/admin/approveFeedback", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: adminToken },
    body: JSON.stringify({ id }),
  }).then(() => loadAdminData());
}
