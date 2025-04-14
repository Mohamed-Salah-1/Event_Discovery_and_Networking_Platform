document.addEventListener("DOMContentLoaded", function () {
  const joinEventButtons = document.querySelectorAll(".join-event-btn");
  const eventNameInput = document.getElementById("eventNameInput");

  joinEventButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const eventName = this.getAttribute("data-event-name");
      eventNameInput.value = eventName;
    });
  });
});
