//----------------------General-----------------------------------------
const characterCard = {
  submitChar: document.querySelector('#addCharBtn'),
  updateCharCard: document.querySelectorAll('.editCard'),
  actualUpdateBtn: document.querySelector('#updateCardBtn'),
  updateForm: document.querySelector('.updateCard'),
  deleteCard: document.querySelector('#deleteCard'),
  addCharBtn: document.querySelector('#createChar'),
  addCharacterFormBtn: document.querySelector('#addCharacter'),
  characterCard: document.querySelectorAll('.characterCard'),
  listOfAbilities: [],
  charInfo: document.querySelectorAll('.characterInfo'),
  characterId: "",
}

const generalButtons = {
  xOut: document.querySelectorAll('.closeIt'),
  hideIt: function(event){
    console.log(event);
    event.path[1].classList.add('hidden');
    generalStuff.overlay.classList.add('hidden');
  },
}

const generalStuff = {
  overlay: document.querySelector('#overlay'),
}

const allConditions = {
  toggleMyView: false,
  isProfileOpen: false,
  isUploadFormOpen: false,
}

function unHideIt(element){
  element.classList.remove('hidden');
  generalStuff.overlay.classList.remove('hidden');
}

whosStronger();

Array.from(generalButtons.xOut).forEach((element) =>{
  element.onclick = generalButtons.hideIt;
})

//--------------More info on the character----------------------------
const customSeeMore = {
  closeButton: document.querySelector('.closeSeeMore'),
  isItOpen: false,
}

customSeeMore.closeButton.addEventListener('click', closeSeeMore);

Array.from(characterCard.charInfo).forEach((element) =>{
  element.addEventListener('click', seeMore);
});

function closeSeeMore(){
  location.reload();
}
async function seeMore(event){
  const characters = await fetchCharacters();
  const bountyImg = document.querySelector('#bountyImg');
  const charDesc = document.querySelector('#charDesc');
  const imagery = document.createElement('iframe');
  const imagery2 = document.createElement('img');
  const ability = document.createElement('h2');
  const abilityDesc = document.createElement('p');
  const container = document.createElement('div');
  const characterMoreInfoDiv = document.querySelector('#characterMoreInfo');
  characterCard.characterId = event.path[3].id;
  console.log(event);
  if(customSeeMore.isItOpen){
    
  }
  else{
    for(let i = 0; i < characters.length; i++){
      if(characterCard.characterId === characters[i].id){
        bountyImg.src = characters[i].description[0].bounty.posterBountyURL;
        charDesc.textContent = characters[i].description[0].charDesc;
        
        for(let j = 0; j < characters[i].description[0].numAbilities.length; j++){
          
          const abilityDiv = characterMoreInfoDiv.appendChild(container.cloneNode());
          abilityDiv.className = "abilityDiv";

          const abilityTrailerContainer = abilityDiv.appendChild(container.cloneNode());
          abilityTrailerContainer.className = "abilityTrailerContainer";
          
          const abilityName = abilityDiv.appendChild(ability.cloneNode());
          abilityName.textContent = characters[i].description[0].numAbilities[j].ability;
          
          const abilityDescription = abilityDiv.appendChild(abilityDesc.cloneNode());
          abilityDescription
          abilityDescription.textContent = characters[i].description[0].numAbilities[j].abilityDesc;
          
          const abilityTrailer = abilityTrailerContainer.appendChild(imagery.cloneNode());
          abilityTrailer.className ="abilityTrailer";
          abilityTrailer.id = `trailer${j}`;
          abilityTrailer.src = characters[i].description[0].numAbilities[j].abilityURL;

          const abilityImage = abilityTrailerContainer.appendChild(imagery2.cloneNode());
          abilityImage.className ="abilityImage hidden";
          abilityImage.id = `image${j}`;
          abilityImage.src = characters[i].description[0].numAbilities[j].abilityURL;
        }
        generalStuff.overlay.classList.remove('hidden');
        characterMoreInfoDiv.classList.remove('hidden');

        if(bountyImg.src != ""){
          bountyImg.classList.remove('hidden');
        }
        customSeeMore.isItOpen = true;
      }
    } 
  }
  //Check Imagery Type
  for(let i = 0; i < characters.length; i++){
    if(characterCard.characterId === characters[i].id){
      for(let j = 0; j < characters[i].description[0].numAbilities.length; j++){
        let arrayGalore = characters[i].description[0].numAbilities[j].viewType;
          if(arrayGalore === "Video"){
            document.getElementById(`image${j}`).classList.add('hidden');
            //document.getElementById(`trailer${j}`).classList.remove('hidden');
          }
          else if(arrayGalore === "Image"){
            document.getElementById(`trailer${j}`).classList.add('hidden');
            document.getElementById(`image${j}`).classList.remove('hidden');
          }
      }
    }
  }
  //********************************************************************/
}

//-----------------------Update More Info-----------------------------
document.querySelector('#editSeeMoreButton').addEventListener('click', addInfoToSeeMoreEdit);
document.querySelector('#updateSeeMoreBtn').addEventListener('click', updateSeeMore);
document.querySelector('#updateSeeMoreExitBtn').addEventListener('click', closeUpdateSeeMoreForm);

function openSeeMoreForm(){
  const updateSeeMoreForm = document.querySelector('.updateSeeMore');
  updateSeeMoreForm.classList.remove('hidden');
  generalStuff.overlay.classList.remove('hidden');
}
async function addInfoToSeeMoreEdit(){
  const characters = await fetchCharacters();
  const abilityName = document.createElement('input');
  const abilityDesc = document.createElement('textarea');
  const abilityView = document.createElement('input');
  const changeImageryType = document.createElement('button');
  const abilityContainers = document.createElement('div');
  const abilitySection = document.querySelector('#abilitySection');
  const bountyImgURL = document.querySelector('#bountyImgURL');
  const charDescription = document.querySelector('#charDescription');
  const updateSeeMore = document.querySelector('.updateSeeMore');

  if(updateSeeMore.childElementCount >= 4){

  }
  else{
    for(let i = 0; i < characters.length; i++){
      if(characterCard.characterId == characters[i].id){
        for(let j = 0; j < characters[i].description[0].numAbilities.length; j++){
  
          let whatsTheType = characters[i].description[0].numAbilities[j].viewType;
          const abilityBoxes = updateSeeMore.appendChild(abilityContainers.cloneNode());
          abilityBoxes.className = "abilityContainers";
  
          const abilityNameInput = abilityBoxes.appendChild(abilityName.cloneNode());
          abilityNameInput.className = "cardDisplayInfo updateSeeMoreFormInputs";
          abilityNameInput.placeholder = "Ability Name";
          abilityNameInput.type = "text";
          abilityNameInput.id = "abilityName";
          abilityNameInput.value = characters[i].description[0].numAbilities[j].ability;
  
          const abilityViewInput = abilityBoxes.appendChild(abilityView.cloneNode());
          abilityViewInput.className = "cardDisplayInfo abilityImagery updateSeeMoreFormInputs";
          abilityViewInput.placeholder = "Video URL";
          abilityViewInput.id = `abilityTrailerURL${j}`;
          abilityViewInput.type = "text";
          abilityViewInput.value = characters[i].description[0].numAbilities[j].abilityURL;
  
          const containChangeView = abilityBoxes.appendChild(abilityContainers.cloneNode());
          containChangeView.className = "changeViewContainer";
  
          const changeView = containChangeView.appendChild(changeImageryType.cloneNode());
          changeView.className = "changeViewType";
          changeView.textContent = "Click Me!";
          changeView.id = `abilityTrailerURL${j}`;
  
          
          const abilityDescInput = abilityBoxes.appendChild(abilityDesc.cloneNode());
          abilityDescInput.className = "cardDisplayInfo";
          abilityDescInput.placeholder = "Ability Description";
          abilityDescInput.id = "abilityDescription";
          abilityDescInput.rows = "5"
          abilityDescInput.cols = "33";
          abilityDescInput.value = characters[i].description[0].numAbilities[j].abilityDesc;
  
          //Imagery Type
          const dontMindHim = document.querySelector('.dontmindme');
          const typeOfImagery = dontMindHim.appendChild(document.createElement('span'));
            typeOfImagery.textContent = whatsTheType;
            typeOfImagery.className = "typeOfImagery hidden";
            typeOfImagery.id = `imageryType${j}`;
        }
        bountyImgURL.value = characters[i].description[0].bounty.posterBountyURL;
        charDescription.value = characters[i].description[0].charDesc;
      }
    }
  }
  Array.from(document.querySelectorAll('.changeViewType')).forEach(element =>{
    element.addEventListener('click', changeViewType);
  });
  openSeeMoreForm();
}

function changeViewType(event){
  const abilityImageArr = Array.from(document.querySelectorAll('.abilityImage'));
  const abilityVideoArr = Array.from(document.querySelectorAll('.abilityTrailer'));
  const abilityImagery = Array.from(document.querySelectorAll('.abilityImagery'));
  const inputArr = Array.from(abilityImagery);

  for(let i = 0; i <inputArr.length; i ++){
    if(inputArr[i].id == event.target.id){
      if(inputArr[i].placeholder == "Image URL"){
        document.getElementById(`image${i}`).classList.add('hidden');
        document.getElementById(`trailer${i}`).classList.remove('hidden');
        document.getElementById(`imageryType${i}`).textContent = "Video";
        inputArr[i].placeholder = "Video URL";
        if(document.getElementById(`imageryType${i}`).textContent = "Video"){
          event.srcElement.innerText = "Change to Image";
        }
        else{
          event.srcElement.innerText = "Change to Video";
        } 
      }
      else{
        document.getElementById(`image${i}`).classList.remove('hidden');
        document.getElementById(`trailer${i}`).classList.add('hidden');
        document.getElementById(`imageryType${i}`).textContent = "Image";
        inputArr[i].placeholder = "Image URL";
        event.srcElement.innerText = "Change to Video"
        if(document.getElementById(`imageryType${i}`).textContent = "Image"){
          event.srcElement.innerText = "Change to Video";
        }
        else{
          event.srcElement.innerText = "Change to Image";
        } 
      }
    }
  }
}

function closeUpdateSeeMoreForm(){
  const updateSeeMoreForm = document.querySelector('.updateSeeMore');
  const abilityContainers = Array.from(document.querySelectorAll('.abilityContainers'));
  const changeViewTypeButtons = Array.from(document.querySelectorAll('.changeViewContainer'));
  updateSeeMoreForm.classList.add('hidden');
  if(customSeeMore.isItOpen){
    if(updateSeeMoreForm.childElementCount >= 4){
      abilityContainers.forEach(element =>{
        element.remove();

      changeViewTypeButtons.forEach(element =>{
        element.remove();
      })
      })
    }
  }
  else{
    generalStuff.overlay.classList.add('hidden');
  }
  
}

async function updateSeeMore(){
    const abilityName = document.querySelectorAll('#abilityName');
    const abilityDescription = document.querySelectorAll('#abilityDescription');
    const abilityTrailer = document.querySelectorAll('.abilityImagery');
    const typeOfImagery = document.querySelectorAll('.typeOfImagery');
    const bountyImgURL = document.querySelector('#bountyImgURL');
    const charDescription = document.querySelector('#charDescription');
    let abilitiesArray = [];
    const abilitiesArrLength = Array.from(abilityName).length;

    let abilityNameArr = [];
    Array.from(abilityName).forEach((element) =>{
      abilityNameArr.push(element.value);
    });
    let abilityDescArr = [];
    Array.from(abilityDescription).forEach((element) =>{
      abilityDescArr.push(element.value);
    });
    let abilityURLArr = [];
    Array.from(abilityTrailer).forEach((element) =>{
      abilityURLArr.push(element.value);
    });
    let viewTypeArr = [];
    Array.from(typeOfImagery).forEach(element =>{
      viewTypeArr.push(element.textContent);
    });

    for(let i = 0; i < abilitiesArrLength; i++){
      abilitiesArray.push({
        ability: abilityNameArr[i],
        abilityDesc: abilityDescArr[i],
        abilityURL: abilityURLArr[i],
        viewType: viewTypeArr[i],
      })
    }

    console.log(abilitiesArray);

    const cardId = characterCard.characterId;
    try{
      const response = await fetch('/updateseemore', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'cardId': cardId,
          'numAbilities': abilitiesArray,
          'bountyImgURL': bountyImgURL.value,
          'charDesc': charDescription.value
        })
      });
      location.reload();
    }
    catch(err){
      console.log(`Didn't work! ${err}`);
    }
}
//------------------Get Characters-------------------------------
Array.from(characterCard.updateCharCard).forEach((x, i) =>{
  characterCard.updateCharCard[i].onclick = getCardId;
})

async function fetchCharacters(){
  try{
    const response = await fetch('/getinfo', {
      method: 'get'
    })
    const data = await response.json(); 
      return data;
  }
  catch(err){
    console.log(`Couldn't do it! ${err}`);
  }
}

function getCardId(event){
  characterCard.characterId = event.path[3].id
  addInfoToEdit();
  console.log(event);
  unHideIt(characterCard.updateForm);
}

//-----------------------Update character card-------------------------
characterCard.deleteCard.addEventListener('click', deleteCard);
characterCard.actualUpdateBtn.addEventListener('click', updateCard);
characterCard.updateForm.classList.add('hidden');

async function updateCard(){
  const cardId = characterCard.characterId;
  const charNameU = document.querySelector('#charNameU').value;
  const charAgeU = document.querySelector('#charAgeU').value;
  const charFruitU = document.querySelector('#charFruitU').value;
  const charFruitTypeU = document.querySelector('#charFruitTypeU');
  const charFruit = {fruitType: charFruitTypeU.value, fruitName: charFruitU};
  const charHakiU = document.querySelector('#charHakiU').value;
  const charHakiTypeU = document.querySelector('#charHakiTypeU');
  const charHaki = {hakiUsageLevel: charHakiU, hakiType: charHakiTypeU.value};
  const bountyU = document.querySelector('#bountyU').value;
  const charRankU = document.querySelector('#charRankU').value;
  const generalLocationU = document.querySelector('#locationU').value;
  const specificLocationU = document.querySelector('#specificLocationU').value;

  const imgURLU = document.querySelector('#imgURLU').value;
  try{
    const response = await fetch('/updateCard', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': cardId,
        'charNameU': charNameU,
        'charAgeU': charAgeU,
        'charFruitU': charFruit,
        'charHakiU': charHaki,
        'charRankU': charRankU,
        'imgURLU': imgURLU,
        'bountyU': bountyU,
        'generalLocationU': generalLocationU,
        'specificLocationU': specificLocationU,
      })
    });
    location.reload();
  }
  catch(err){
    console.log(`Didn't work! ${err}`);
  }
}

async function addInfoToEdit(){
  const characters = await fetchCharacters();
  const charNameU = document.querySelector('#charNameU');
  const charAgeU = document.querySelector('#charAgeU');
  const charFruitU = document.querySelector('#charFruitU');
  const charFruitTypeU = document.querySelector('#charFruitTypeU');
  const charHakiU = document.querySelector('#charHakiU');
  const charHakiTypeU = document.querySelector('#charHakiTypeU');
  const imgURLU = document.querySelector('#imgURLU');
  const bountyU = document.querySelector('#bountyU');
  const charRankU = document.querySelector('#charRankU');
  const generalLocationU = document.querySelector('#locationU');
  const specificLocationU = document.querySelector('#specificLocationU');
  for(let i = 0; i < characters.length; i++){
    if(characterCard.characterId == characters[i].id){
      charNameU.value = characters[i].charName;
      charAgeU.value = characters[i].charAge;
      charFruitU.value = characters[i].charFruit.fruitName;
      charFruitTypeU.value = characters[i].charFruit.fruitType;
      charHakiU.value = characters[i].charhaki.hakiUsageLevel;
      charHakiTypeU.value = characters[i].charhaki.hakiType;
      charRankU.value = characters[i].charRank;
      imgURLU.value = characters[i].imgURL;
      bountyU.value = characters[i].description[0].bounty.bountyAmount;
      generalLocationU.value = characters[i].description[0].location;
      specificLocationU.value = characters[i].description[0].specificLocation;
    }
  }
}

async function deleteCard(){
  try{
    const response = await fetch('/deletecard',{
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': characterCard.characterId
      })
    })
    location.reload();
  }
  catch(err){
    console.log(`Woopsie! ${err}`);
  }
}

//------------------------Style Cards------------------------------------
async function whosStronger(){
  const characters = await fetchCharacters();
  if(characters.length >= 1){
    for(let i = 0; i < characters.length; i++){
      switch(characters[i].charhaki.hakiUsageLevel)
      {
        case "Supreme": 
        document.getElementById(`${characters[i].id}`).classList.add('supreme');
        break;

        case "Legendary": 
        document.getElementById(`${characters[i].id}`).classList.add('legendary');
        break;

        case "Mighty": 
        document.getElementById(`${characters[i].id}`).classList.add('mighty');
        break;
      } 
    }
  }
}
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
document.getElementById('changeProfilePictureBox').addEventListener('click', openChangeProfilePictureForm);

function openChangeProfilePictureForm(){
  const changeProfilePictureBox = document.getElementById('changeProfilePictureBox');
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
