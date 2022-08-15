const characterCard = {
  submitChar: document.querySelector('#addCharBtn'),
  updateCharCard: document.querySelectorAll('.editCard'),
  actualUpdateBtn: document.querySelector('#updateCardBtn'),
  updateForm: document.querySelector('.updateCard'),
  characterId: ""
}

Array.from(characterCard.updateCharCard).forEach((x, i) =>{
  characterCard.updateCharCard[i].onclick = getCardId;
})

characterCard.updateForm.classList.add('hidden');
characterCard.actualUpdateBtn.addEventListener('click', updateCard);

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

function getCardId(event){
  characterCard.characterId = event.srcElement.id
  console.log(characterCard.characterId);
  unHideIt(characterCard.updateForm);
}

function unHideIt(element){
  element.classList.remove('hidden');
}