const characterCard = {
  submitChar: document.querySelector('#addCharBtn'),
  updateCharCard: document.querySelectorAll('.editCard'),
  actualUpdateBtn: document.querySelector('#updateCardBtn'),
  updateForm: document.querySelector('.updateCard'),
  deleteCard: document.querySelector('#deleteCard'),
  createChar: document.querySelector('#createChar'),
  addCharacter: document.querySelector('.addCharacter'),
  characterCard: document.querySelectorAll('.characterCard'),
  charArray: [],
  characterId: ""
}
storeInfo();

Array.from(characterCard.updateCharCard).forEach((x, i) =>{
  characterCard.updateCharCard[i].onclick = getCardId;
})

characterCard.updateForm.classList.add('hidden');
characterCard.addCharacter.classList.add('hidden');
characterCard.actualUpdateBtn.addEventListener('click', updateCard);
characterCard.deleteCard.addEventListener('click', deleteCard);
characterCard.createChar.addEventListener('click', appear);

async function storeInfo(){
  try{
    const response = await fetch('/getinfo', {
      method: 'get'
    })
    const data = await response.json();
    for(let i = 0; i < data.length; i++){
      characterCard.charArray.push(data[i]);
    }
  }
  catch(err){
    console.log(`Couldn't do it! ${err}`);
  }
}

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
    const data = await response.json();
    location.reload();
  }
  catch(err){
    console.log(`Didn't work! ${err}`);
    location.reload();
  }
}

async function deleteCard(){
  try{
    const response = await fetch('/deleteCard',{
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': characterCard.characterId
      })
    })
    const data = await response.json();
    location.reload();
  }
  catch(err){
    console.log(`Woopsie! ${err}`);
    location.reload();
  }

}

function getCardId(event){
  characterCard.characterId = event.srcElement.id
  addInfoToEdit();
  console.log(characterCard.characterId);
  unHideIt(characterCard.updateForm);
}

function unHideIt(element){
  element.classList.remove('hidden');
}

function appear(){
  characterCard.addCharacter.classList.remove('hidden');
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