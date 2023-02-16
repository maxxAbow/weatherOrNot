const signinForm = document.querySelector("#signinForm");
const signupForm = document.querySelector("#signupForm");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const signInButton = document.querySelector("#signInButton");
const displayNameInput = document.querySelector("#display-name-input")
const signUpEmailInput = document.querySelector("#sign-up-email-input")
const signUpPasswordInput = document.querySelector("#sign-up-password-input")
const signUpButton = document.querySelector("#sign-up-button")

const showSignup = document.querySelector("#showSignup").addEventListener('click', () => {
  if (signupForm.style.display === "none") {
    signupForm.style.display = "block";
    signinForm.style.display = "none";
  } else {
    signupForm.style.display === "none";
  }
});
const showSignin = document.querySelector("#showSignin").addEventListener('click', () => {
  if (signinForm.style.display === "none") {
    signinForm.style.display = "block";
    signupForm.style.display = "none";
  } else {
    signinForm.style.display = "none";
  }
});

signInButton.addEventListener('click', async (e) => {
  e.preventDefault()
  const emailInputValue = emailInput.value
  const passwordInputValue = passwordInput.value
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailAddress: emailInputValue,
      password: passwordInputValue
    })
  })
  const parsedResponse = await response.json()
  localStorage.setItem('activeUser', JSON.stringify(parsedResponse))
  window.location.replace('/scheduler')
})

signUpButton.addEventListener('click', async (e) => {
  e.preventDefault()
  
  const emailInputValue = signUpEmailInput.value
  const passwordInputValue = signUpPasswordInput.value
  const displayNameValue = displayNameInput.value
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
  })
  const parsedResponse = await response.json()
  localStorage.setItem('activeUser', JSON.stringify(parsedResponse))
  window.location.replace('/scheduler')
})



