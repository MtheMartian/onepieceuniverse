const signInBtn = document.querySelector('#signInBtn');
signInBtn.addEventListener('click', getEmail);
const customLogInPage = {
  email: '',
}
function getEmail(){
  const email = document.querySelector('#username').value;
   sessionStorage.setItem('email', email);
   console.log(customLogInPage.email);
}



