// navbar.js - Handle navigation bar updates based on login status

document.addEventListener("DOMContentLoaded", function () {
  // Function to get logged in user
  function getLoggedInUser() {
    const userJson = localStorage.getItem("loggedInUser");
    return userJson ? JSON.parse(userJson) : null;
  }

  // Function to update navigation bar based on login status
  function updateNavigationBar() {
    const navbarNav = document.getElementById("navbarNav");
    if (!navbarNav) return;

    const loggedInUser = getLoggedInUser();

    // Remove existing auth-related elements
    const existingUserInfo = document.getElementById("userInfo");
    const existingAuthButtons = document.getElementById("authButtons");
    if (existingUserInfo) existingUserInfo.remove();
    if (existingAuthButtons) existingAuthButtons.remove();

    if (loggedInUser) {
      // User is logged in, show their name and logout button
      const userInfo = document.createElement("div");
      userInfo.id = "userInfo";
      userInfo.className = "ms-3 d-flex align-items-center";
      userInfo.innerHTML = `
          <span class="me-3">${loggedInUser.firstName} ${loggedInUser.lastName}</span>
          <button id="logoutBtn" class="btn btn-outline-danger btn-sm">Logout</button>
        `;
      navbarNav.appendChild(userInfo);

      // Add logout functionality
      document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      });
    } else {
      // User is not logged in, show login/signup buttons
      const authButtons = document.createElement("div");
      authButtons.id = "authButtons";
      authButtons.className = "ms-3 d-flex align-items-center";
      authButtons.innerHTML = `
          <a href="signin.html" class="btn btn-outline-primary btn-sm me-2">Log In</a>
          <a href="signUp.html" class="btn btn-primary btn-sm">Sign Up</a>
        `;
      navbarNav.appendChild(authButtons);
    }
  }

  // Call this function when the page loads
  updateNavigationBar();
});
