document.querySelector('#signUpButton').addEventListener('click', signUp);
async function signUp(){
  const userName = document.querySelector('#username');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confpassword');
  try{
    const response = await fetch('/signup/newuser', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'userName': userName.value,
        'email': email.value,
        'password': password.value,
        'confirmPassword': confirmPassword.value
      })
    })
  }
  catch(err){
    console.log(`Couldn't sign you up! ${err}`);
  }
}