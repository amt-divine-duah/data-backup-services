// JavaScript to show/hide the appropriate fields based on the selected option
const selectField = document.getElementById("select-field");
const whatsappFields = document.getElementById("whatsapp-fields");
const gmailFields = document.getElementById("gmail-fields");
const snapchatFields = document.getElementById("snapchat-fields");

selectField.addEventListener("change", () => {
  const selectedOption = selectField.value;
  console.log(selectedOption);
  console.log(whatsappFields, "Whatsapp ");
  // Hide all fields initially
  whatsappFields.style.display = "none";
    gmailFields.style.display = "none";
    snapchatFields.style.display = "none";

  // Show the relevant fields based on the selected option
  if (selectedOption === "WhatsApp") {
    whatsappFields.style.display = "block";
  } else if (selectedOption === "Gmail") {
    gmailFields.style.display = "block";
  } else if (selectedOption === "Snapchat") {
    snapchatFields.style.display = "block";
  }
});
