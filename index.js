const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const checkbox = document.getElementById("checkbox");
const successPopup = document.getElementById("success-popup");
const closePopupButton = document.getElementById("close-popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateInputs()) {
    showSuccessPopup();
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    // error function
    setError(username, "Username is required");
  } else {
    // success function
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    // error function
    setError(password, "password is required");
  } else if (passwordValue.length < 2) {
    // success function
    setError(password, "password must be at least 2 characters");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    // error function
    setError(password2, "please confirm your password");
  } else if (password2Value !== passwordValue) {
    // checking if passwords match
    setError(password2, "passwords does not match");
  } else {
    setSuccess(password2);
  }

  const checkboxError = document.getElementById("checkbox-error");
  if (!checkbox.checked) {
    checkboxError.textContent = "Please check this box to continue";
  } else {
    checkboxError.textContent = "";
  }

  const allInputsValid = [username, email, password, password2].every((input) =>
    input.parentElement.classList.contains("success")
  );

  return allInputsValid && checkbox.checked;
};

const showSuccessPopup = () => {
  successPopup.style.display = "block";
};

closePopupButton.addEventListener("click", () => {
  successPopup.style.display = "none";
  resetForm();
  // form.reset();
});

function resetForm() {
  form.reset();
  document.querySelectorAll(".input-control").forEach((el) => {
    el.classList.remove(".error");
    const errorDisplay = el.querySelector(".error");
    if (errorDisplay) {
      errorDisplay.textContent = "";
    }
    console.log(errorDisplay);
  });
  const checkboxError = document.getElementById("checkbox-error");
  if (checkboxError) {
    checkboxError.textContent = "";
  }
}
