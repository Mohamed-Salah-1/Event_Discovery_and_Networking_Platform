// Assisted by watsonx Code Assistant 

// Assuming you have a function to get the logged-in user's name
function getUserName() {
  // Implement your logic to retrieve the user's name from local storage, cookies, or an API
  return 'John Doe'; // Replace with actual user name retrieval logic
}

// Update the user's name in the navigation bar whenever it changes
function updateUserName(newName) {
  const userNameElement = document.getElementById('userName');
  if (userNameElement) {
    userNameElement.textContent = newName;
  }
}

// Initialize the user's name in the navigation bar when the page loads
window.addEventListener('load', function() {
  const userName = getUserName();
  updateUserName(userName);
});
