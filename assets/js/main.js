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
  isReplyOpen: false,
}

function unHideIt(element){
  element.classList.remove('hidden');
  generalStuff.overlay.classList.remove('hidden');
}

whosStronger();

Array.from(generalButtons.xOut).forEach((element) =>{
  element.onclick = generalButtons.hideIt;
})

//------------------Get Characters-------------------------------
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

async function getSpecificCharacter(id){
  const response = await fetch(`/getcharacter/${id}`, {
    method: 'get',
  });
  const data = await response.json();
  return data;
}

//-------------------------Create Character-----------------------------
const addCharForm = document.querySelector('.addCharacter');
const createCharacterButton = document.querySelector('#createChar');
const formAddCharButton = document.querySelector('#addCharBtn');
function showCreateCharForm(){
  if(allConditions.isProfileOpen == false){
    generalStuff.overlay.classList.remove('hidden');
    addCharForm.classList.remove('hidden');
  }
  else{
    alert('Close the profile menu first.');
  }
}

if(createCharacterButton === null || formAddCharButton === null){

}
else{
  createCharacterButton.addEventListener('click', showCreateCharForm);
  formAddCharButton.addEventListener('click', createCharacter);
}

async function createCharacter(){
  const charName = document.querySelector('#charName');
  const charAge = document.querySelector('#charAge');
  const charFruit = document.querySelector('#charFruit');
  const charHaki = document.querySelector('#charHaki');
  const imgURL = document.querySelector('#imgURL');
  const isItChecked = document.querySelector('#isPirate');
  const isMarineChecked = document.querySelector('#isMarine');
  const bounty = document.querySelector('#bounty');
  const charLocation = document.querySelector('#location');
  const specificCharLocation = document.querySelector('#specificLocation');
  const numAbilities = document.querySelector('#numAbilities');
  const charFruitType = document.querySelector('#charFruitType');
  const charHakiType = document.querySelector('#charHakiType');
  const superAdmin = "391390167862gh354062i";
  const bountyInfo = {bountyAmount: bounty.value, posterBountyURL: ""};
  const userID = document.getElementById('userID').textContent;
  const hakiInfo = {hakiUsageLevel: charHaki.value, hakiType: charHakiType.value};
  const fruitInfo = {fruitType: charFruitType.value, fruitName: charFruit.value};
  const charRank = document.querySelector('#charRank');
  for(let i = 1; i <= Number(numAbilities.value); i++){
    characterCard.listOfAbilities.push({ability: `Ability ${i}`, abilityDesc: "", abilityURL: "", viewType: "Video"});
  }

  let isItPirate = false;
  let isItMarine = false;
  if(isItChecked.checked){
    isItPirate = true;
  }
  else if(isMarineChecked.checked){
    isItMarine = true;
  }

  try{
    const response = await fetch('/addCharacter', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'charName': charName.value,
        'charAge': charAge.value,
        'charFruit': fruitInfo,
        'charHaki': hakiInfo,
        'charRank': charRank.value,
        'imgURL': imgURL.value,
        'bounty': bountyInfo,
        'location': charLocation.value,
        'specificLocation': specificCharLocation.value,
        'pirate': isItPirate,
        'marine': isItMarine,
        'numAbilities': characterCard.listOfAbilities,
        'superAdmin': superAdmin,
        'userID': userID,
      })
    })
    characterCard.listOfAbilities = [];
    location.reload();
  }
  catch(err){
    console.log(`Was unable to add to Database! ${err}`);
  }
}

//------------------------Style Cards------------------------------------
async function whosStronger(){
  const characters = Array.from(document.querySelectorAll('.characterCard'));
  const featuredCards = Array.from(document.querySelectorAll('.featured-card'));
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
  if(featuredCards.length >= 1){
    for(let i = 0; i < featuredCards.length; i++){
      switch(featuredCards[i].querySelector('.featured-card-haki > span').textContent)
      {
        case "Supreme": 
        featuredCards[i].classList.add('supreme');
        break;

        case "Legendary": 
        featuredCards[i].classList.add('legendary');
        break;

        case "Mighty": 
        featuredCards[i].classList.add('mighty');
        break;
      } 
    }
  }
}

//-------------------Sign In, Up, Out--------------------------------------

if(document.querySelector('.signOut') !== null){
  document.querySelector('.signOut').addEventListener('click', clearStorageOnSignOut);
}

const signInCustom = {
  isItOpen: false,
  userIsSignedIn: false
}

function clearStorageOnSignOut(){
  sessionStorage.clear();
}

 async function currentSignedInUser(){
    try{
      const response = await fetch('/home/currentuser', {
        method: 'get'
      });
      const user = response.json();
      return user;
    }
    catch(err){
      console.log(`No user logged in! I think... ${err}`);
    }
  }

