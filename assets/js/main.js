const characterCard = {
  submitChar: document.querySelector('#addCharBtn'),
  updateCharCard: document.querySelectorAll('.editCard'),
  actualUpdateBtn: document.querySelector('#updateCardBtn'),
  updateForm: document.querySelector('.updateCard'),
  deleteCard: document.querySelector('#deleteCard'),
  createChar: document.querySelector('#createChar'),
  addCharacter: document.querySelector('.addCharacter'),
  characterCard: document.querySelectorAll('.characterCard'),
  characterId: ""
}

const cardEditSection = {
  charNameU: document.querySelector('#charNameU'),
  charAgeU: document.querySelector('#charAgeU'),
  charFruitU: document.querySelector('#charHakiU'),
  imgURLU: document.querySelector('#imgURLU'),
  charHakiU: document.querySelector('#charHakiU')
}

Array.from(characterCard.updateCharCard).forEach((x, i) =>{
  characterCard.updateCharCard[i].onclick = getCardId;
})

characterCard.updateForm.classList.add('hidden');
characterCard.addCharacter.classList.add('hidden');
characterCard.actualUpdateBtn.addEventListener('click', updateCard);
characterCard.deleteCard.addEventListener('click', deleteCard);
characterCard.createChar.addEventListener('click', appear);

function getInfo(){
  Array.from(characterCard.characterCard).forEach(element =>{
    if(data.id == characterCard.characterId){
      cardEditSection.charNameU.value = data.
      cardEditSection.charAgeU.value = charAge.innerText;
      cardEditSection.charFruitU.value = charFruit.innerText;
      cardEditSection.charHakiU.value = charHaki.innerText;
      cardEditSection.imgURLU.value = imgURL.innerText;
    }
  })
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
  console.log(characterCard.characterId);
  unHideIt(characterCard.updateForm);
  getInfo();
}

function unHideIt(element){
  element.classList.remove('hidden');
}

function appear(){
  characterCard.addCharacter.classList.remove('hidden');
}