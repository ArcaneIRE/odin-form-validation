import zipCodePatterns from "./zipCodePatterns.js";

const form = document.querySelector("form");

function updateValidityStatus(inputNode, errorMsgNode) {
  if (inputNode.validationMessage) {
    inputNode.classList.add("invalid");
  } else {
    inputNode.classList.remove("invalid");
  }
  errorMsgNode.textContent = inputNode.validationMessage;
}

const emailInput = form.querySelector("#email");
const emailErrorMsg = form.querySelector("#email-error-message");
emailInput.addEventListener("focusout", () => {
  updateValidityStatus(emailInput, emailErrorMsg);

  emailInput.addEventListener("input", () => {
    updateValidityStatus(emailInput, emailErrorMsg);
  });
});

const countryInput = form.querySelector("#country");
const countryErrorMsg = form.querySelector("#country-error-message");
countryInput.addEventListener("focusout", () => {
  updateValidityStatus(countryInput, countryErrorMsg);

  countryInput.addEventListener("change", () => {
    updateValidityStatus(countryInput, countryErrorMsg);
  });
});

const zipInput = form.querySelector("#zip");
const zipErrorMsg = form.querySelector("#zip-error-message");

function validateCountryZip() {
  const countryCode = countryInput.value;
  const countrySpecificZipInfo = zipCodePatterns[countryCode];
  const countrySpecificPattern = countrySpecificZipInfo[0];
  const countrySpecificError = countrySpecificZipInfo[1];

  zipInput.pattern = countrySpecificPattern;
  if (zipInput.validity.patternMismatch) {
    zipInput.setCustomValidity(countrySpecificError);
  } else {
    zipInput.setCustomValidity("");
  }
}

zipInput.addEventListener("focusout", () => {
  validateCountryZip();
  updateValidityStatus(zipInput, zipErrorMsg);

  zipInput.addEventListener("input", () => {
    validateCountryZip();
    updateValidityStatus(zipInput, zipErrorMsg);
  });
});
form.addEventListener("submit", () => {
  validateCountryZip();
  updateValidityStatus(zipInput, zipErrorMsg);
});

const passwordInput = form.querySelector("#password");
const passwordErrorMsg = form.querySelector("#password-error-message");

const confirmPasswordInput = form.querySelector("#confirm-password");
const confirmPasswordErrorMsg = form.querySelector(
  "#confirm-password-error-message"
);

passwordInput.addEventListener("focusout", () => {
  updateValidityStatus(passwordInput, passwordErrorMsg);

  passwordInput.addEventListener("input", () => {
    updateValidityStatus(passwordInput, passwordErrorMsg);
  });
});

function validateMatchingPasswords() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword) {
    confirmPasswordInput.setCustomValidity("Passwords do not match.");
  } else {
    confirmPasswordInput.setCustomValidity("");
  }
}
confirmPasswordInput.addEventListener("focusout", () => {
  validateMatchingPasswords();
  updateValidityStatus(confirmPasswordInput, confirmPasswordErrorMsg);

  confirmPasswordInput.addEventListener("input", () => {
    validateMatchingPasswords();
    updateValidityStatus(confirmPasswordInput, confirmPasswordErrorMsg);
  });
});

const submitButton = form.querySelector("button[type='submit']");
const allControls = form.querySelectorAll("input, select");

function allControlsValid() {
  for (let i = 0; i < allControls.length; i++) {
    const node = allControls[i];
    if (node.validationMessage) {
      return false;
    }
  }
  return true;
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (allControlsValid()) {
    // eslint-disable-next-line no-alert
    alert("Woo! Everything looks good. High five!");
  } else {
    submitButton.classList.add("invalid-submission");
    setTimeout(() => {
      submitButton.classList.remove("invalid-submission");
    }, 4000);
  }
});
