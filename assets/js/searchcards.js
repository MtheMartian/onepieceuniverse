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

Array.from(generalButtons.xOut).forEach((element) =>{
  element.onclick = generalButtons.hideIt;
})

//---------------- Append Cards to page ----------------------------------
async function appendCardsToPage(cards){
  const cardSection = document.querySelector('.cardSection');
  cardSection.innerHTML = "";
  const div = document.createElement('div');
  const span = document.createElement('span');
  const image = document.createElement('img');
  const a = document.createElement('a');

  for(let i = 0; i < cards.length; i++){
      const characterCard = cardSection.appendChild(div.cloneNode());
      characterCard.className = 'characterCard';
      characterCard.id = cards[i].id;
  
      const cardName = characterCard.appendChild(div.cloneNode());
      cardName.className = "cardName";
      const charName = cardName.appendChild(span.cloneNode());
      charName.textContent = cards[i].charName;
  
      const cardCharImg = characterCard.appendChild(div.cloneNode());
      cardCharImg.className = "cardCharImg";
      const cardImg = cardCharImg.appendChild(image.cloneNode());
      cardImg.className = "cardImg";
      cardImg.src = cards[i].imgURL;
  
      const cardHaki = characterCard.appendChild(div.cloneNode());
      cardHaki.className = "cardHaki";
      const charHaki = cardHaki.appendChild(span.cloneNode());
      charHaki.textContent = cards[i].charhaki.hakiUsageLevel;
  
      const cardInfo = characterCard.appendChild(div.cloneNode());
      cardInfo.className = "cardInfo";
      const cardRank = cardInfo.appendChild(div.cloneNode());
      cardRank.className = "cardRank";
      const rank = cardRank.appendChild(span.cloneNode());
      rank.textContent = "Rank:";
      const charRank = cardRank.appendChild(span.cloneNode());
      charRank.textContent = cards[i].charRank;
      const cardAge = cardInfo.appendChild(div.cloneNode());
      cardAge.className = "cardAge";
      const charAge = cardAge.appendChild(span.cloneNode());
      charAge.textContent = `${cards[i].charAge} years old`;
      const cardFruitName = cardInfo.appendChild(div.cloneNode());
      cardFruitName.className = "cardFruitName";
      const fruitImg = cardFruitName.appendChild(image.cloneNode());
      fruitImg.className = "fruitImg";
      fruitImg.src = "/images/fruit.webp";
      const charFruit = cardFruitName.appendChild(span.cloneNode());
      charFruit.textContent = cards[i].charFruit.fruitName;
      const cardFruitType = cardInfo.appendChild(div.cloneNode());
      cardFruitType.className = "cardFruitType";
      const typeSpan = cardFruitType.appendChild(span.cloneNode());
      typeSpan.className = "typeSpan";
      typeSpan.textContent = "Type:";
      const charFruitType = cardFruitType.appendChild(span.cloneNode());
      charFruitType.textContent = cards[i].charFruit.fruitType;
      const cardBounty = cardInfo.appendChild(div.cloneNode());
      cardBounty.className = "cardBounty";
      const bounty = cardBounty.appendChild(image.cloneNode());
      bounty.className = "bounty";
      bounty.src = "/images/Beli.webp";
      const bountyAmount = cardBounty.appendChild(span.cloneNode());
      bountyAmount.textContent = cards[i].description[0].bounty.bountyAmount;
      const seeMore = cardInfo.appendChild(div.cloneNode());
      seeMore.className = "seeMore";
      const characterInfo = seeMore.appendChild(span.cloneNode());
      characterInfo.className = "characterInfo";
      characterInfo.textContent = "See more";
  
      const madeBy = characterCard.appendChild(div.cloneNode());
      madeBy.className = "madeBy";
      const cardCreator = madeBy.appendChild(a.cloneNode());
      cardCreator.className = "cardCreator";
      cardCreator.href = `/home/userprofile/${cards[i].userID}`;
    }
    whosStronger();
    createdBy();
  
  Array.from(document.querySelectorAll('.characterInfo')).forEach((element) =>{
    element.addEventListener('click', seeMore);
  });
  customSeeMore.closeButton.addEventListener('click', closeSeeMore);
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
  const charHakiType = document.querySelector('#charHakiTypeU');
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
  document.getElementById('characterAbilitiesDesc').innerHTML = "";
  document.getElementById('comments').innerHTML = "";
  document.getElementById('characterMoreInfo').classList.add('hidden');
  generalStuff.overlay.classList.add('hidden');
  customSeeMore.isItOpen = false;
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
  const cardIdForComment = document.getElementById('cardID');
  const characterMoreInfoDiv = document.querySelector('#characterMoreInfo');
  const characterAbilitiesDesc = document.getElementById('characterAbilitiesDesc');
  characterCard.characterId = event.path[3].id;
  if(cardIdForComment !== null){
    cardIdForComment.value = characterCard.characterId;
  }
  await addCommentsToSection();
  // await addComments(characterCard.characterId);
  console.log(event);
  if(customSeeMore.isItOpen){
    
  }
  else{
    for(let i = 0; i < characters.length; i++){
      if(characterCard.characterId === characters[i].id){
        bountyImg.src = characters[i].description[0].bounty.posterBountyURL;
        charDesc.textContent = characters[i].description[0].charDesc;
        
        for(let j = 0; j < characters[i].description[0].numAbilities.length; j++){
          
          const abilityDiv = characterAbilitiesDesc.appendChild(container.cloneNode());
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
//-------------------------Users and cards----------------------------------------
  async function createdBy(){
    const cardCreators = Array.from(document.querySelectorAll('.cardCreator'));
    const users = await fetchCharacters();
    for(let i = 0; i < users.length; i++){
      for(let j = 0; j < cardCreators.length; j++){
        if(cardCreators[j].href.includes(users[i].userID)){
          cardCreators[j].textContent = users[i].userName;
        }
      }
    }
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

//-------------------Profile---------------------------------------------
if(document.getElementById('profilePicture') !== null){
  document.getElementById('profilePicture').addEventListener('click', openProfileMenu);
}

function openProfileMenu(){
  const profilPicContainer = document.getElementById('profilePictureContainer');
  const profileMenu = document.getElementById('profileMenu');
  const profileTooltip = document.querySelector('#profilePictureContainer .tooltip');
  const header = document.querySelector('header');
  if(allConditions.isProfileOpen == false){
    profileTooltip.classList.add('hidden');
    profileMenu.classList.remove('hidden');
    setTimeout(lol, '1');
    profilPicContainer.classList.add('colorMyBackground');
    generalStuff.overlay.classList.remove('hidden');
    header.style.zIndex = 1;
    allConditions.isProfileOpen = true;
  }
  else{
    profileTooltip.classList.remove('hidden');
    profileMenu.classList.add('hidden');
    setTimeout(yoho, '1');
    profilPicContainer.classList.remove('colorMyBackground');
    generalStuff.overlay.classList.add('hidden');
    header.style.zIndex = 0;
    allConditions.isProfileOpen = false;
  }
}

function yoho(){
  const profileMenu = document.getElementById('profileMenu');
  profileMenu.classList.remove('expand');
}

function lol(){
  const profileMenu = document.getElementById('profileMenu');
  profileMenu.classList.add('expand');
}

//--------------------- Get comments and replies ------------------------------
async function getComments(){
  try{
    const response = await fetch(`/comments/${characterCard.characterId}`,{
      method: 'get'
    });
    const comments = response.json();
    return comments;
  }
  catch(err){
    console.log(`Oops! ${err}`);
  }
}

async function getReplies(){
  try{
    const response = await fetch('/replies',{
      method: 'get'
    });
    const replies = response.json();
    return replies;
  }
  catch(err){
    console.log(`Oops! ${err}`);
  }
}
//----------------------- Add comments/replies to see more ----------------------------
if(document.getElementById('postComment') !== null){
  document.getElementById('postComment').addEventListener('click', reloadCommentSection);
}


async function addCommentsToSection(){
  const commentsDiv = document.getElementById('comments');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const p = document.createElement('p');
  const form = document.createElement('form');
  const button = document.createElement('button');
  const input = document.createElement('input');
  const a = document.createElement('a');
  const commentsArr = await getComments();
  const repliesArr = await getReplies();

  for(let i = 0; i < commentsArr.length; i++){
    const commentContainer = commentsDiv.appendChild(div.cloneNode());
    commentContainer.className = 'commentContainer';
    commentContainer.id = `comment${commentsArr.length-1-i}`;

    //Card Comment
    const whoPosted = commentContainer.appendChild(div.cloneNode());
    whoPosted.className = 'whoPosted';
    const userPic = whoPosted.appendChild(img.cloneNode());
    userPic.className = 'userPic';
    userPic.src = commentsArr[commentsArr.length-1-i].userProfilePicture;
    userPic.alt = "userPic";
    const userName = whoPosted.appendChild(a.cloneNode());
    userName.textContent = commentsArr[commentsArr.length-1-i].userName;
    userName.href = `/home/userprofile/${commentsArr[commentsArr.length-1-i].userID}`;

    const cardComment = commentContainer.appendChild(p.cloneNode());
    cardComment.className = "cardComment";
    cardComment.textContent = commentsArr[commentsArr.length-1-i].comment;

    //Likes and reply form
    const likeReplyContainer = commentContainer.appendChild(div.cloneNode());
    likeReplyContainer.className = "likeReplyContainer";
    if(document.getElementById('userID') !== null){
      const upvoteContainer = likeReplyContainer.appendChild(form.cloneNode());
      upvoteContainer.action = `/home/likecomment/${commentsArr[commentsArr.length-1-i]._id}?_method=PUT`;
      upvoteContainer.method = "POST";
      upvoteContainer.class = "upvoteContainer";
      const upvoteButton = upvoteContainer.appendChild(button.cloneNode());
      upvoteButton.type = "submit";
      upvoteButton.className = "upvoteButton";
      const upvoteButtonImage = upvoteButton.appendChild(img.cloneNode());
      upvoteButtonImage.src = "/images/dflag.webp";
      upvoteButtonImage.alt = "flag";
      upvoteButtonImage.className = "upvotePic";
      const numberOfLikes = upvoteContainer.appendChild(span.cloneNode());
      numberOfLikes.textContent = `${commentsArr[commentsArr.length-1-i].likes.numberOfLikes}`;
    }

    if(document.getElementById('userID') !== null){
        const postReplyForm = likeReplyContainer.appendChild(form.cloneNode());
        postReplyForm.className = "postReplyForm";
        postReplyForm.action = `/home/reply/${commentsArr[commentsArr.length-1-i]._id}?_method=PUT`;
        postReplyForm.method = "POST";
        const reply = postReplyForm.appendChild(input.cloneNode());
        reply.type = "text";
        reply.name = "reply";
        reply.id = "reply";
        reply.placeholder = "Reply...";
        const postReply = postReplyForm.appendChild(button.cloneNode());
        postReply.type = "submit";
        postReply.className = "postReply";
        postReply.textContent = "Reply";  
      }
    
    
    //Replies
    const replyButton = commentContainer.appendChild(div.cloneNode());
    replyButton.className = "replyButton";
    replyButton.id = `${commentsArr.length-1-i}`;

    const repliesContainer = commentContainer.appendChild(div.cloneNode());
    repliesContainer.className = "repliesContainer hidden";
    repliesContainer.id = `reply${commentsArr.length-1-i}`;
    for(let j = 0; j < repliesArr.length; j++){
      if(repliesArr[repliesArr.length-1-j].commentID == commentsArr[commentsArr.length-1-i]._id){
        const actualReplyContainer = repliesContainer.appendChild(div.cloneNode());
        actualReplyContainer.className = "actualReplyContainer";
        actualReplyContainer.id = `reply${repliesArr.length-1-j}`;
        const whoPosted = actualReplyContainer.appendChild(div.cloneNode());
        whoPosted.className = 'whoPosted';
        const userPic = whoPosted.appendChild(img.cloneNode());
        userPic.className = 'userPic';
        userPic.src = repliesArr[repliesArr.length-1-j].userProfilePic;
        userPic.alt = "userPic";
        const userName = whoPosted.appendChild(a.cloneNode());
        userName.textContent = repliesArr[repliesArr.length-1-j].userName;
        userName.href = `/home/userprofile/${repliesArr[repliesArr.length-1-j].userID}`;
        const commentReply = actualReplyContainer.appendChild(p.cloneNode());
        commentReply.className = "commentReply";
        commentReply.textContent = repliesArr[repliesArr.length-1-j].comment;
        if(document.getElementById('userID') !== null){
          const upvoteContainer = actualReplyContainer.appendChild(form.cloneNode());
          upvoteContainer.action = `/home/likereply/${repliesArr[repliesArr.length-1-j]._id}?_method=PUT`;
          upvoteContainer.method = "POST";
          upvoteContainer.class = "upvoteContainer";
          const upvoteButton = upvoteContainer.appendChild(button.cloneNode());
          upvoteButton.type = "submit";
          upvoteButton.className = "upvoteButton";
          const upvoteButtonImage = upvoteButton.appendChild(img.cloneNode());
          upvoteButtonImage.src = "/images/dflag.webp";
          upvoteButtonImage.alt = "flag";
          upvoteButtonImage.className = "upvotePic";
          const numberOfLikes = upvoteContainer.appendChild(span.cloneNode());
          numberOfLikes.textContent = `${repliesArr[repliesArr.length-1-j].likes.numberOfLikes}`;
        }
      }
    }
  }
  setTimeout(numberOfReplies, 100);
  // await addComments(characterCard.characterId);
  Array.from(document.querySelectorAll('.replyButton')).forEach(element =>{
    element.addEventListener('click', openReplies);
  });
  
  Array.from(document.querySelectorAll('.postReply')).forEach(element =>{
    element.addEventListener('click', reloadCommentSection);
  });
  
  Array.from(document.querySelectorAll('.upvoteButton')).forEach(element =>{
    element.addEventListener('click', reloadCommentSection);
  });
}

function openReplies(event){
  console.log(event);
  const openRepliesOf = event.target.id;
  const repliesContainer = Array.from(document.querySelectorAll('.repliesContainer'));
  for(let i = 0; i < repliesContainer.length; i++){
    if(repliesContainer[i].id.includes(openRepliesOf) && allConditions.isReplyOpen == false){
      repliesContainer[i].classList.remove('hidden');
      document.getElementById(openRepliesOf).style.color = 'rgb(40, 126, 255)';
      allConditions.isReplyOpen = true;
    }
    else if(repliesContainer[i].id.includes(openRepliesOf) && allConditions.isReplyOpen){
      repliesContainer[i].classList.add('hidden');
      document.getElementById(openRepliesOf).style.color = 'rgb(255, 255, 255)';
      allConditions.isReplyOpen = false;
    }
  }
}

function numberOfReplies(){
  const replyButtons = Array.from(document.querySelectorAll('.replyButton'));
  const repliesContainers = Array.from(document.querySelectorAll('.repliesContainer'));
  for(let i = 0; i < replyButtons.length; i++){
    if(repliesContainers[i].id.includes(replyButtons[i].id)){
      if(repliesContainers[i].childElementCount == 0){
        replyButtons[i].classList.add('hidden');
      }
      else if(repliesContainers[i].childElementCount == 1){
        replyButtons[i].textContent = `See Reply`;
      }
      else if(repliesContainers[i].childElementCount > 1){
        replyButtons[i].textContent = `See ${repliesContainers[i].childElementCount} Replies`;
      }
    }
  }
}

async function reloadCommentSection(){
  setTimeout(async () =>{
    document.getElementById('comment').value = "";
    // $('#comments').load(' #comments>*');
    document.getElementById('comments').innerHTML = "";
    await addCommentsToSection();
  }, 500);
}

//----------------- Search Engine ------------------------------
document.getElementById('searchBar').addEventListener('keyup', searchForCards);
async function searchForCards(){
  const searchCards = document.getElementById('searchBar').value;
  try{
    const results = await fetch(`/home/search?entry=${searchCards.toLowerCase()}`, {
      method: 'get'
    });
    const cards = await results.json();
    appendCardsToPage(cards);
  }
  catch(err){
    console.log(`Couldn't get the cards`);
  }
}

document.getElementById('clear-search').addEventListener('click', () => {
  document.getElementById('searchBar').value = "";
  searchForCards();
})

//---------------------------- Page Styling ---------------------------//
document.getElementById('search-container').classList.add('hidden');
