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

//-----------------------Update character card-------------------------
characterCard.deleteCard.addEventListener('click', deleteCard);
characterCard.actualUpdateBtn.addEventListener('click', updateCard);
characterCard.updateForm.classList.add('hidden');


function getCardId(event){
  characterCard.characterId = event.path[3].id
  addInfoToEdit();
  console.log(event);
  unHideIt(characterCard.updateForm);
}

Array.from(characterCard.updateCharCard).forEach((x, i) =>{
  characterCard.updateCharCard[i].onclick = getCardId;
})

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