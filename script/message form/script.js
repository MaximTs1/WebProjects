const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const message = document.getElementById("message").value;

  // Save the user's data to LocalStorage
  localStorage.setItem("fullName", fullName);
  localStorage.setItem("email", email);
  localStorage.setItem("phoneNumber", phoneNumber);
  localStorage.setItem("message", message);

  // Redirect to the "Thank You" page
  window.location.href = "../../script/message form/thankyou.html";
});
