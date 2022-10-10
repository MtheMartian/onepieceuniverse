//--------------- Upload an image for character card -------------------------------
Array.from(document.querySelectorAll('.changeImageBox')).forEach(element =>{
  element.addEventListener('click', openUploadImageForm);
})

function openUploadImageForm(event){
  console.log(event);
  const changeImageContainers = Array.from(document.querySelectorAll('.changeImageBox'));
  const uploadImageForm = Array.from(document.querySelectorAll('.characterCardUploadImg'));
  const characterCardId = event.target.parentElement.id;
  for(let i = 0; i < uploadImageForm.length; i++){
    if(uploadImageForm[i].action.includes(characterCardId) && allConditions.isUploadFormOpen == false){
      uploadImageForm[i].classList.remove('hidden');
      changeImageContainers[i].classList.add('hidden');
      allConditions.isUploadFormOpen = true;
    }
    else{
      uploadImageForm[i].classList.add('hidden');
      changeImageContainers[i].classList.remove('hidden');
      allConditions.isUploadFormOpen = false;
    }
  }
}
//--------------- Change Profile Picture --------------------------------
document.getElementById('change-profile-picture-overlay').addEventListener('click', openChangeProfilePictureForm);

function openChangeProfilePictureForm(){
  const changeProfilePictureBox = document.getElementById('change-profile-picture-overlay');
  const profilePictureUploadForm = document.getElementById('profilePictureUploadForm');
  if(allConditions.isUploadFormOpen == false){
    profilePictureUploadForm.classList.remove('hidden');
    changeProfilePictureBox.classList.add('hidden');
    allConditions.isUploadFormOpen = true;
  }
  else{
    profilePictureUploadForm.classList.add('hidden');
    changeProfilePictureBox.classList.remove('hidden');
    allConditions.isUploadFormOpen = false;
  }
}


