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

appendCommentsToInbox();
whosStronger();

Array.from(generalButtons.xOut).forEach((element) =>{
  element.onclick = generalButtons.hideIt;
})

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

//------------------- Scroll  Featured Section ------------------------------------//
let carouselInterval = setInterval(() =>{
  document.getElementById('featured-cards-section').scrollLeft += 
  document.getElementById('featured-cards-section').clientWidth;
 }, 10000);

 let carouselReset = setInterval(() =>{
  if(document.getElementById('featured-cards-section').scrollLeft >= 
      document.getElementById('featured-cards-section').clientWidth * 4.5){
      document.getElementById('featured-cards-section').scrollTo({
        left: 0,
        behavior: 'smooth',
    });
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() =>{
    document.getElementById('featured-cards-section').scrollLeft += 
    document.getElementById('featured-cards-section').clientWidth;
   }, 10000);
   }
 }, 13000);

document.getElementById('scroll-left').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollLeft -= 
  document.getElementById('featured-cards-section').clientWidth -
  document.getElementById('featured-cards-section').clientWidth * 0.052;
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() =>{
    document.getElementById('featured-cards-section').scrollLeft += 
    document.getElementById('featured-cards-section').clientWidth;
   }, 10000);
 });

 document.getElementById('scroll-right').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollLeft += 
  document.getElementById('featured-cards-section').clientWidth;
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() =>{
    document.getElementById('featured-cards-section').scrollLeft += 
    document.getElementById('featured-cards-section').clientWidth;
   }, 10000);
 });

 document.getElementById('first-slide').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollTo({
    left: 0,
    behavior: 'smooth',
  });
 });

 document.getElementById('second-slide').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollTo({
    left: document.getElementById('featured-cards-section').clientWidth,
    behavior: 'smooth',
  });
 });

 document.getElementById('third-slide').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollTo({
    left: document.getElementById('featured-cards-section').clientWidth * 2.5,
    behavior: 'smooth',
  });
 });

 document.getElementById('fourth-slide').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollTo({
    left: document.getElementById('featured-cards-section').clientWidth * 4,
    behavior: 'smooth',
  });
 });

 document.getElementById('fifth-slide').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollTo({
    left: document.getElementById('featured-cards-section').clientWidth * 5,
    behavior: 'smooth',
  });
 });



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
  characterCard.characterId = event.path[3].id;
  const characters = await getSpecificCharacter(characterCard.characterId);
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
  const likeCardForm = document.getElementById('like-card-form');
  likeCardForm.action = `/character/likecard/${characterCard.characterId}?_method=PUT`;
  const numberOfLikesOnCard = document.querySelector('#like-card-form > span');
  if(cardIdForComment !== null){
    cardIdForComment.value = characterCard.characterId;
  }
  await addCommentsToSection();
  console.log(event);
  if(customSeeMore.isItOpen){
    
  }
  else{
        bountyImg.src = characters.description[0].bounty.posterBountyURL;
        charDesc.textContent = characters.description[0].charDesc;

        numberOfLikesOnCard.textContent = `${characters.likes.numberOfLikes}`;
        
        for(let j = 0; j < characters.description[0].numAbilities.length; j++){
          
          const abilityDiv = characterAbilitiesDesc.appendChild(container.cloneNode());
          abilityDiv.className = "abilityDiv";

          const abilityTrailerContainer = abilityDiv.appendChild(container.cloneNode());
          abilityTrailerContainer.className = "abilityTrailerContainer";
          
          const abilityName = abilityDiv.appendChild(ability.cloneNode());
          abilityName.textContent = characters.description[0].numAbilities[j].ability;
          
          const abilityDescription = abilityDiv.appendChild(abilityDesc.cloneNode());
          abilityDescription
          abilityDescription.textContent = characters.description[0].numAbilities[j].abilityDesc;
          
          const abilityTrailer = abilityTrailerContainer.appendChild(imagery.cloneNode());
          abilityTrailer.className ="abilityTrailer";
          abilityTrailer.id = `trailer${j}`;
          abilityTrailer.src = characters.description[0].numAbilities[j].abilityURL;

          const abilityImage = abilityTrailerContainer.appendChild(imagery2.cloneNode());
          abilityImage.className ="abilityImage hidden";
          abilityImage.id = `image${j}`;
          abilityImage.src = characters.description[0].numAbilities[j].abilityURL;
        }
        generalStuff.overlay.classList.remove('hidden');
        characterMoreInfoDiv.classList.remove('hidden');

        if(bountyImg.src != ""){
          bountyImg.classList.remove('hidden');
        }
        customSeeMore.isItOpen = true;  
      }
//Check Imagery Type
for(let j = 0; j < characters.description[0].numAbilities.length; j++){
  let arrayGalore = characters.description[0].numAbilities[j].viewType;
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
    document.getElementById('comments').innerHTML = "";
    await addCommentsToSection();
  }, 500);
}

//----------------------- Inbox Comments and Inbox Notifications -----------------------//
async function getInboxComments(){
  const response = await fetch('/home/getinboxcomments', {
    method: 'get',
  });
  const data = await response.json();
  return data;
}

const inboxConditions = {
  isItOpen: false,
}

if(document.getElementById('inboxContainer') !== null){
  document.getElementById('inboxContainer').addEventListener('click', () =>{
    if(inboxConditions.isItOpen == false && document.getElementById('inbox').childElementCount > 0){
      const inbox = document.getElementById('inbox');
      inbox.classList.remove('hidden');
      document.getElementById('inboxContainer').style.background = 'rgba(124, 124, 124, 0.7)';
      document.getElementById('inboxContainer').style.color = 'rgb(231, 231, 231)';
      inboxConditions.isItOpen = true;
    }
    else{
      const inbox = document.getElementById('inbox');
      inbox.classList.add('hidden');
      document.getElementById('inboxContainer').style.background = 'none';
      document.getElementById('inboxContainer').style.color = 'rgba(255, 255, 255, 0.7)';
      inboxConditions.isItOpen = false;
    }
  });
}

async function appendCommentsToInbox(){
  const inboxComments = await getInboxComments();
  const div = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const form = document.createElement('form');
  const button = document.createElement('button');
  const inbox = document.getElementById('inbox');
  const p = document.createElement('p');
  const input = document.createElement('input');
  const inboxNotification = document.getElementById('inbox-notification');
  const somethingNew = document.getElementById('something-new');

  if(typeof inboxComments !== 'undefined'){
    for(let i = 0; i < inboxComments.newComments.length; i++){
      const newComments = inbox.appendChild(div.cloneNode());
      newComments.className = 'new-comments';

      const cardTitle = newComments.appendChild(div.cloneNode());
      cardTitle.className = 'card-title';
      cardTitle.textContent = `${inboxComments.cardTitle[inboxComments.cardTitle.length-1-i]}`;

      const whoCommented = newComments.appendChild(div.cloneNode());
      whoCommented.className = 'who-commented';
      const userPic = whoCommented.appendChild(img.cloneNode());
      userPic.className = 'userPic';
      userPic.src = `${inboxComments.newComments[inboxComments.newComments.length-1-i].userProfilePicture}`;
      userPic.alt = 'userPic';
      const userName = whoCommented.appendChild(span.cloneNode());
      userName.textContent = `${inboxComments.newComments[inboxComments.newComments.length-1-i].userName}`;

      const markedSeen = newComments.appendChild(form.cloneNode());
      markedSeen.className = 'mark-as-seen';
      markedSeen.action = `/home/inbox/markseen/${inboxComments.newComments[inboxComments.newComments.length-1-i]._id}?_method=PUT`
      markedSeen.method = 'POST';
      const seenButton = markedSeen.appendChild(button.cloneNode());
      seenButton.className = 'seen-button';
      seenButton.type = 'submit';
      seenButton.textContent = '\u2713';

      const newCommentInbox = newComments.appendChild(p.cloneNode());
      newCommentInbox.className = 'new-comment-inbox';
      newCommentInbox.textContent = `${inboxComments.newComments[inboxComments.newComments.length-1-i].comment}`;

      const likeReplyContainer = newComments.appendChild(div.cloneNode());
      likeReplyContainer.className = 'likeReplyContainer';
      const postReplyForm = likeReplyContainer.appendChild(form.cloneNode());
      postReplyForm.className = "postReplyForm";
      postReplyForm.action = `/home/reply/${inboxComments.newComments[inboxComments.newComments.length-1-i]._id}?_method=PUT`;
      postReplyForm.method = "POST";
      const reply = postReplyForm.appendChild(input.cloneNode());
      reply.type = "text";
      reply.name = "reply";
      reply.id = 'reply'
      reply.placeholder = "Reply...";
      const postReply = postReplyForm.appendChild(button.cloneNode());
      postReply.type = "submit";
      postReply.className = "postReply";
      postReply.textContent = "Reply";  
    }
  }
  
  Array.from(document.querySelectorAll('.seen-button')).forEach(element =>{
    element.addEventListener('click', reloadInboxComments);
  })

  if(inbox.childElementCount == 0){
    inboxNotification.classList.add('hidden');
    somethingNew.classList.add('hidden');

  }
  else if(inbox.childElementCount > 0 && inbox.childElementCount <= 9){
    inboxNotification.textContent = `${inbox.childElementCount}`;
    inboxNotification.classList.remove('hidden');
  }
  else if(inbox.childElementCount > 9){
    inboxNotification.textContent = '9+';
    inboxNotification.classList.remove('hidden');
  }
}

async function reloadInboxComments(){
  setTimeout(async () =>{
    document.getElementById('inbox').innerHTML = "";
    await appendCommentsToInbox();
  }, 500);
}