const signinForm = document.querySelector("#signinForm");
const signupForm = document.querySelector("#signupForm");

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