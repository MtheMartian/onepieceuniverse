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
  charArray: [],
  charInfo: document.querySelectorAll('.characterInfo'),
  characterId: ""
}

const generalButtons = {
  xOut: document.querySelectorAll('.closeIt'),
  hideIt: function(event){
    console.log(event);
    event.path[1].classList.add('hidden');
  },
}

function unHideIt(element){
  element.classList.remove('hidden');
}

storeInfo();

Array.from(generalButtons.xOut).forEach((element) =>{
  element.onclick = generalButtons.hideIt;
})

//-------------------------Create Character-----------------------------
const addCharForm = document.querySelector('.addCharacter');
const createCharacterButton = document.querySelector('#createChar');
const formAddCharButton = document.querySelector('#addCharBtn');
function appear(){
  addCharForm.classList.remove('hidden');
}
addCharForm.classList.add('hidden');

createCharacterButton.addEventListener('click', appear);
formAddCharButton.addEventListener('click', createCharacter);

async function createCharacter(){
  const charName = document.querySelector('#charName');
  const charAge = document.querySelector('#charAge');
  const charFruit = document.querySelector('#charFruit');
  const charHaki = document.querySelector('#charHaki');
  const imgURL = document.querySelector('#imgURL');
  const isItChecked = document.querySelector('#isPirate');
  const bounty = document.querySelector('#bounty');
  const bountyImgURL = document.querySelector('#bountyImgURL');
  const charLocation = document.querySelector('#location');
  let isItPirate = false;
  if(isItChecked.checked){
    isItPirate = true;
  }
  try{
    const response = await fetch('/addCharacter', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'charName': charName.value,
        'charAge': charAge.value,
        'charFruit': charFruit.value,
        'charHaki': charHaki.value,
        'imgURL': imgURL.value,
        'bounty': bounty.value,
        'bountyImgURL': bountyImgURL.value,
        'location': charLocation.value,
        'pirate': isItPirate
      })
    })
    location.reload();
  }
  catch(err){
    console.log(`Was unable to add to Database! ${err}`);
  }
}

//--------------More info on the character----------------------------
Array.from(characterCard.charInfo).forEach((element) =>{
  element.addEventListener('click', seeMore);
})

function seeMore(event){
  const seeMoreCharName = document.querySelector('#seeMoreCharName');
  characterCard.characterId = event.path[1].id;
  console.log(event);
  for(let i = 0; i < characterCard.charArray.length; i++){
    if(characterCard.characterId === characterCard.charArray[i].id){
      seeMoreCharName.textContent = characterCard.charArray[i].charName;
    }
  } 
}

//------------------Store character info-------------------------------
Array.from(characterCard.updateCharCard).forEach((x, i) =>{
  characterCard.updateCharCard[i].onclick = getCardId;
})

async function storeInfo(){
  try{
    const response = await fetch('/getinfo', {
      method: 'get'
    })
    const data = await response.json();
      characterCard.charArray = data; 
  }
  catch(err){
    console.log(`Couldn't do it! ${err}`);
  }
}

function getCardId(event){
  characterCard.characterId = event.srcElement.id
  addInfoToEdit();
  console.log(characterCard.characterId);
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
  const charHakiU = document.querySelector('#charHakiU').value;
  const imgURLU = document.querySelector('#imgURLU').value;
  try{
    const response = await fetch('/updateCard', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': cardId,
        'charNameU': charNameU,
        'charAgeU': charAgeU,
        'charFruitU': charFruitU,
        'charHakiU': charHakiU,
        'imgURLU': imgURLU
      })
    });
    location.reload();
  }
  catch(err){
    console.log(`Didn't work! ${err}`);
  }
}

function addInfoToEdit(){
  const charNameU = document.querySelector('#charNameU');
  const charAgeU = document.querySelector('#charAgeU');
  const charFruitU = document.querySelector('#charFruitU');
  const charHakiU = document.querySelector('#charHakiU');
  const imgURLU = document.querySelector('#imgURLU');
  for(let i = 0; i < characterCard.charArray.length; i++){
    if(characterCard.characterId == characterCard.charArray[i].id){
      charNameU.value = characterCard.charArray[i].charName;
      charAgeU.value = characterCard.charArray[i].charAge;
      charFruitU.value = characterCard.charArray[i].charFruit;
      charHakiU.value = characterCard.charArray[i].charhaki;
      imgURLU.value = characterCard.charArray[i].imgURL;
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
