// auth.js - Handle user authentication

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  // Function to handle login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      // Send login request to server
      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Store user data in localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            window.location.href = "events.html";
          } else {
            alert(data.error || "Invalid username or password");
          }
        })
        .catch(() => {
          alert("Server error. Please try again.");
        });
    });
  }

  // Function to handle signup
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Simple validation
      if (!firstName || !lastName || !email || !username || !password) {
        alert("Please fill in all required fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Send signup request to server
      fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Store user data in localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            alert("Welcome to Event Discovery! Your account has been created successfully.");
            window.location.href = "events.html";
          } else {
            alert(data.error || "Failed to create account");
          }
        })
        .catch(() => {
          alert("Server error. Please try again.");
        });
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Simulate a function that checks if the user is logged in
  function isUserLoggedIn() {
      // Replace this with your actual logic to check if the user is logged in
      return true; // Assume the user is logged in for demonstration
  }

  if (isUserLoggedIn()) {
      document.getElementById("signUpButton").style.display = "none";
      document.getElementById("logInButton").style.display = "none";
  }
});