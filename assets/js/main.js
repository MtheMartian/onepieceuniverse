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
  charArray: [],
  charInfo: document.querySelectorAll('.characterInfo'),
  characterId: "",
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
  const isMarineChecked = document.querySelector('#isMarine');
  const bounty = document.querySelector('#bounty');
  const charLocation = document.querySelector('#location');
  const numAbilities = document.querySelector('#numAbilities');
  const charFruitType = document.querySelector('#charFruitType');
  const charHakiType = document.querySelector('#charHakiTypeU');
  const bountyInfo = {bountyAmount: bounty.value, posterBountyURL: ""};
  const hakiInfo = {hakiUsageLevel: charHaki.value, hakiType: charHakiType.value};
  const fruitInfo = {fruitType: charFruitType.value, fruitName: charFruit.value};
  const charRank = document.querySelector('#charRank');
  for(let i = 1; i <= Number(numAbilities.value); i++){
    characterCard.listOfAbilities.push({ability: `Ability ${i}`, abilityDesc: "", abilityURL: ""});
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
        'pirate': isItPirate,
        'marine': isItMarine,
        'numAbilities': characterCard.listOfAbilities
      })
    })
    characterCard.listOfAbilities = [];
    location.reload();
  }
  catch(err){
    console.log(`Was unable to add to Database! ${err}`);
  }
}

//--------------More info on the character----------------------------
const customSeeMore = {
  closeButton: document.querySelector('.closeSeeMore'),
  isItOpen: false,
}

customSeeMore.closeButton.addEventListener('click', closeSeeMore);

Array.from(characterCard.charInfo).forEach((element) =>{
  element.addEventListener('click', seeMore);
});

function closeSeeMore(event){
  console.log(event);
  event.path[1].classList.add('hidden');
  customSeeMore.isItOpen = false;
  location.reload();
}
function seeMore(event){
  const bountyImg = document.querySelector('#bountyImg');
  const charDesc = document.querySelector('#charDesc');
  const imagery = document.createElement('iframe');
  const ability = document.createElement('span');
  const abilityDesc = document.createElement('p');
  const container = document.createElement('div');
  const characterMoreInfoDiv = document.querySelector('#characterMoreInfo');
  characterCard.characterId = event.path[3].id;
  console.log(event);
  if(customSeeMore.isItOpen){

  }
  else{
    for(let i = 0; i < characterCard.charArray.length; i++){
      if(characterCard.characterId === characterCard.charArray[i].id){
        bountyImg.src = characterCard.charArray[i].description[0].bounty.posterBountyURL;
        charDesc.textContent = characterCard.charArray[i].description[0].charDesc;
        
        for(let j = 0; j < characterCard.charArray[i].description[0].numAbilities.length; j++){
          const abilityDiv = characterMoreInfoDiv.appendChild(container.cloneNode());
          abilityDiv.className = "abilityDiv";
          const abilityName = abilityDiv.appendChild(ability.cloneNode());
          abilityName.textContent = characterCard.charArray[i].description[0].numAbilities[j].ability;
          const abilityDescription = abilityDiv.appendChild(abilityDesc.cloneNode());
          abilityDescription.textContent = characterCard.charArray[i].description[0].numAbilities[j].abilityDesc;
          const abilityTrailer = abilityDiv.appendChild(imagery.cloneNode());
          abilityTrailer.width = 400;
          abilityTrailer.height = 400;
          abilityTrailer.src = characterCard.charArray[i].description[0].numAbilities[j].abilityURL;
        }
        characterMoreInfoDiv.classList.remove('hidden');
        customSeeMore.isItOpen = true;
      }
    } 
  }
}

//-----------------------Update More Info-----------------------------
document.querySelector('#editSeeMoreButton').addEventListener('click', addInfoToSeeMoreEdit);
document.querySelector('#updateSeeMoreBtn').addEventListener('click', updateSeeMore);

async function openSeeMoreForm(){
  const updateSeeMoreForm = document.querySelector('.updateSeeMore');
  updateSeeMoreForm.classList.remove('hidden');
}
async function addInfoToSeeMoreEdit(){
  const abilityName = document.createElement('input');
  const abilityDesc = document.createElement('input');
  const abilityView = document.createElement('input');
  const abilitySection = document.querySelector('#abilitySection');
  const bountyImgURL = document.querySelector('#bountyImgURL');
  const charDescription = document.querySelector('#charDescription');
  
  for(let i = 0; i < characterCard.charArray.length; i++){
    if(characterCard.characterId == characterCard.charArray[i].id){
      for(let j = 0; j < characterCard.charArray[i].description[0].numAbilities.length; j++){
        const abilityNameInput = abilitySection.appendChild(abilityName.cloneNode());
        abilityNameInput.className = "cardDisplayInfo";
        abilityNameInput.placeholder = "Ability Name";
        abilityNameInput.type = "text";
        abilityNameInput.id = "abilityName";
        abilityNameInput.value = characterCard.charArray[i].description[0].numAbilities[j].ability;

        const abilityDescInput = abilitySection.appendChild(abilityDesc.cloneNode());
        abilityDescInput.className = "cardDisplayInfo";
        abilityDescInput.placeholder = "Ability Description";
        abilityDescInput.type = "text";
        abilityDescInput.id = "abilityDescription";
        abilityDescInput.value = characterCard.charArray[i].description[0].numAbilities[j].abilityDesc;

        const abilityViewInput = abilitySection.appendChild(abilityView.cloneNode());
        abilityViewInput.className = "cardDisplayInfo";
        abilityViewInput.placeholder = "Video URL/Image URL";
        abilityViewInput.id = "abilityTrailer";
        abilityViewInput.type = "text";
        abilityViewInput.value = characterCard.charArray[i].description[0].numAbilities[j].abilityURL;
      }
      bountyImgURL.value = characterCard.charArray[i].description[0].bounty.posterBountyURL;
      charDescription.value = characterCard.charArray[i].description[0].charDesc;
    }
  }
  openSeeMoreForm();
}

async function updateSeeMore(){
    const abilityName = document.querySelectorAll('#abilityName');
    const abilityDescription = document.querySelectorAll('#abilityDescription');
    const abilityTrailer = document.querySelectorAll('#abilityTrailer');
    const bountyImgURL = document.querySelector('#bountyImgURL');
    const charDescription = document.querySelector('#charDescription');
    let abilitiesArray = [];
    const abilitiesArrLength = Array.from(abilityName).length;

    let abilityNameArr = [];
    Array.from(abilityName).forEach((element) =>{
      abilityNameArr.push(element.value);
    })
    let abilityDescArr = [];
    Array.from(abilityDescription).forEach((element) =>{
      abilityDescArr.push(element.value);
    });
    let abilityURLArr = [];
    Array.from(abilityTrailer).forEach((element) =>{
      abilityURLArr.push(element.value);
    })

    for(let i = 0; i < abilitiesArrLength; i++){
      abilitiesArray.push({
        ability: abilityNameArr[i],
        abilityDesc: abilityDescArr[i],
        abilityURL: abilityURLArr[i] 
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
        'bountyU': bountyU
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
  const charFruitTypeU = document.querySelector('#charFruitTypeU');
  const charHakiU = document.querySelector('#charHakiU');
  const charHakiTypeU = document.querySelector('#charHakiTypeU');
  const imgURLU = document.querySelector('#imgURLU');
  const bountyU = document.querySelector('#bountyU');
  const charRankU = document.querySelector('#charRankU');
  for(let i = 0; i < characterCard.charArray.length; i++){
    if(characterCard.characterId == characterCard.charArray[i].id){
      charNameU.value = characterCard.charArray[i].charName;
      charAgeU.value = characterCard.charArray[i].charAge;
      charFruitU.value = characterCard.charArray[i].charFruit.fruitName;
      charFruitTypeU.value = characterCard.charArray[i].charFruit.fruitType;
      charHakiU.value = characterCard.charArray[i].charhaki.hakiUsageLevel;
      charHakiTypeU.value = characterCard.charArray[i].charhaki.hakiType;
      charRankU.value = characterCard.charArray[i].charRank;
      imgURLU.value = characterCard.charArray[i].imgURL;
      bountyU.value = characterCard.charArray[i].description[0].bounty.bountyAmount;
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
setTimeout(function whosStronger(){
  if(characterCard.charArray.length >= 1){
    for(let i = 0; i < characterCard.charArray.length; i++){
      switch(characterCard.charArray[i].charhaki.hakiUsageLevel)
      {
        case "Supreme": 
        document.getElementById(`${characterCard.charArray[i].id}`).classList.add('supreme');
        break;

        case "Legendary": 
        document.getElementById(`${characterCard.charArray[i].id}`).classList.add('legendary');
        break;

        case "Mighty": 
        document.getElementById(`${characterCard.charArray[i].id}`).classList.add('mighty');
        break;
      } 
    }
  }
}, "100");

//-------------------Sign In/ Sign Up--------------------------------------
document.querySelector('.signInBtn').addEventListener('click', showSignInForm);
const signInCustom = {
  isItOpen: false,
}

function showSignInForm(){
  const signInForm = document.querySelector('#signIn');
  if(signInCustom.isItOpen == false){
    signInForm.classList.remove('hidden');
    signInCustom.isItOpen = true;
  }
  else{
    signInForm.classList.add('hidden');
    signInCustom.isItOpen = false;
  }
}