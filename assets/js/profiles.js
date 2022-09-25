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

//------------------------Style Cards------------------------------------
async function whosStronger(){
  const characters = Array.from(document.querySelectorAll('.characterCard'));
  if(characters.length >= 1){
    for(let i = 0; i < characters.length; i++){
      switch(characters[i].querySelector('.cardHaki > span').textContent)
      {
        case "Supreme": 
        characters[i].classList.add('supreme');
        break;

        case "Legendary": 
        characters[i].classList.add('legendary');
        break;

        case "Mighty": 
        characters[i].classList.add('mighty');
        break;
      } 
    }
  }
}
