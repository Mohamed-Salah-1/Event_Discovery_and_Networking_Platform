document.addEventListener("DOMContentLoaded", function () {
  const joinEventButtons = document.querySelectorAll(".join-event-btn");
  const eventNameInput = document.getElementById("eventNameInput");
  const eventJoinForm = document.getElementById("eventJoinForm");
  const startNetworkingBtn = document.getElementById("startNetworkingBtn");

  // Smooth scroll to social media section
  if (startNetworkingBtn) {
    startNetworkingBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = document.getElementById("socialMediaSection");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  joinEventButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const eventName = this.getAttribute("data-event-name");
      eventNameInput.value = eventName;
    });
  });

  if (eventJoinForm) {
    eventJoinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for joining the event! You will receive an email with more details shortly.");
      const modal = bootstrap.Modal.getInstance(document.getElementById("eventFormModal"));
      if (modal) {
        modal.hide();
      }
    });
  }
});