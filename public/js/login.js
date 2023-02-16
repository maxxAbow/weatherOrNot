// declaring consts and querySelectors
const signinForm = document.querySelector("#signinForm"); // id
const signupForm = document.querySelector("#signupForm"); // id
const emailInput = document.querySelector("#emailInput"); // id
const passwordInput = document.querySelector("#passwordInput"); // id
const signInButton = document.querySelector("#signInButton"); // id
const displayNameInput = document.querySelector("#display-name-input"); // id
const signUpEmailInput = document.querySelector("#sign-up-email-input"); // id
const signUpPasswordInput = document.querySelector("#sign-up-password-input"); // id
const signUpButton = document.querySelector("#sign-up-button"); // id

// adding a click event listener to the element with Id of 'showSignup'
const showSignup = document.querySelector("#showSignup").addEventListener('click', () => {
  if (signupForm.style.display === "none") { // 
    signupForm.style.display = "block"; // 
    signinForm.style.display = "none"; // 
  } else { // 
    signupForm.style.display = "none"; // 
  }
});
// adding a click event listener to the element with Id of 'showSignin'
const showSignin = document.querySelector("#showSignin").addEventListener('click', () => {
  if (signinForm.style.display === "none") { // 
    signinForm.style.display = "block"; // 
    signupForm.style.display = "none"; // 
  } else { // 
    signinForm.style.display = "none"; // 
  }
});
// adding click event listener to the element with ID of 'signInButton'
signInButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const emailInputValue = emailInput.value;
  const passwordInputValue = passwordInput.value;
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailAddress: emailInputValue,
      password: passwordInputValue
    })
  });
  const parsedResponse = await response.json();
  localStorage.setItem('activeUser', JSON.stringify(parsedResponse));
  window.location.replace('/scheduler');
});
// adding a click event listener to element Id 'signUpButton'
signUpButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const emailInputValue = signUpEmailInput.value;
  const passwordInputValue = signUpPasswordInput.value;
  const displayNameValue = displayNameInput.value;
  const response = await fetch('/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailAddress: emailInputValue,
      password: passwordInputValue,
      displayName: displayNameValue,

    })
  });
  const parsedResponse = await response.json();
  localStorage.setItem('activeUser', JSON.stringify(parsedResponse));
  window.location.replace('/scheduler');
});