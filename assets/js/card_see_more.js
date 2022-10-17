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
  const comments = await getComments();
  const replies = await getReplies();
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
  const numberOfLikesOnCard = document.querySelector('#like-card-form > span');
  // if(cardIdForComment !== null){
  //   cardIdForComment.value = characterCard.characterId;
  // }
  await addCommentsToSection();
  console.log(event);
  if(customSeeMore.isItOpen){
    
  }
  else{
        bountyImg.src = characters.description[0].bounty.posterBountyURL;
        charDesc.textContent = characters.description[0].charDesc;

        numberOfLikesOnCard.textContent = `${characters.likes.numberOfLikes}`;
        if(currentUser !== null){
          const likeButton = document.querySelector('#like-card-button > span');
          if(characters.likes.whoLiked.includes(currentUser.userID)){
              likeButton.style.color = "rgb(136, 136, 255)";
          }
          else{
            likeButton.style.color = "rgb(255, 255, 255)";
          }
        }

        if(currentUser !== null){
          const commentLikeArr = Array.from(document.querySelectorAll('.upvoteButton'));
          for(let i = 0; i < comments.length; i++){
            if(comments[comments.length-1-i].likes.whoLiked.includes(currentUser.userID)){
                document.getElementById(`${commentLikeArr[i].id}`).querySelector('.material-symbols-outlined').style.color = "rgb(136, 136, 255)"; 
            }
          }
        }

        setTimeout(() =>{
          if(currentUser !== null){
            const replyLikeArr = Array.from(document.querySelectorAll('.upvote-reply'));
            for(let i = 0; i < replies.length; i++){
              if(replies[replies.length-1-i].likes.whoLiked.includes(currentUser.userID)){
                  document.getElementById(`${replies[replies.length-1-i]._id}`).querySelector('.material-symbols-outlined').style.color = "rgb(136, 136, 255)"; 
              }
            }
          }
        }, 500)
        
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
document.getElementById('like-card-button').addEventListener('click', submitLikeCardForm);
document.getElementById('like-card-button').addEventListener('click', updateCardLikes);
async function submitLikeCardForm(){
  try{
    const response = await fetch(`/character/likecard/${characterCard.characterId}`, {
      method: 'PUT'
    });
  }
  catch(err){
    console.log(`Couldn't like! ${err}`);
  }
}

async function updateCardLikes(){
  const numberOfLikesOnCard = document.querySelector('#like-card-form > span');
  const likeButton = document.querySelector('#like-card-button > span');
  numberOfLikesOnCard.innerHTML = "";
  setTimeout(async ()=>{
    const characters = await getSpecificCharacter(characterCard.characterId);
    numberOfLikesOnCard.textContent = `${characters.likes.numberOfLikes}`;
      if(characters.likes.whoLiked.includes(currentUser.userID)){
        likeButton.style.color = "rgb(136, 136, 255)";
      }
      else{
        likeButton.style.color = "rgb(255, 255, 255)";
      }
  }, 500);
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

if(document.getElementById('postComment') !== null){
  document.getElementById('postComment').addEventListener('click', postAComment);
}

async  function postAComment(){
  const comment = document.getElementById('comment').value;
  const cardID = characterCard.characterId;
  try{
    const response = await fetch("/home/postcomment", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'comment': comment,
        'cardID': cardID,
      }),
    });
  }
  catch(err){
    console.log(`Couldn't Post Comment! ${err}`);
  }
}

async function addCommentsToSection(){
  const commentsDiv = document.getElementById('comments');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const p = document.createElement('p');
  const form = document.createElement('form');
  const section = document.createElement('section');
  const button = document.createElement('button');
  const input = document.createElement('input');
  const a = document.createElement('a');
  const commentsArr = await getComments();
  const repliesArr = await getReplies();
  const commentTitle = document.querySelector('#commentsTitle > span');
  if(commentsArr.length > 1){
    commentTitle.textContent = `${commentsArr.length} Comments`;
  }
  else{
    commentTitle.textContent = `${commentsArr.length} Comment`;
  }
  if(document.getElementsByClassName('signInBtn') === null){
    const currentUser = await currentSignedInUser();
  }
  
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
    if(typeof currentUser !== 'undefined'){
      const upvoteContainer = likeReplyContainer.appendChild(section.cloneNode());
      // upvoteContainer.action = `/home/likecomment/${commentsArr[commentsArr.length-1-i]._id}?_method=PUT`;
      // upvoteContainer.method = "POST";
      upvoteContainer.class = "upvoteContainer";
      const upvoteButton = upvoteContainer.appendChild(button.cloneNode());
      // upvoteButton.type = "submit";
      upvoteButton.id = commentsArr[commentsArr.length-1-i]._id;
      upvoteButton.className = 'upvoteButton' ;
      const upvoteButtonImage = upvoteButton.appendChild(span.cloneNode());
      upvoteButtonImage.textContent = 'thumb_up';
      // upvoteButtonImage.src = "/images/dflag.webp";
      // upvoteButtonImage.alt = "flag";
      upvoteButtonImage.className = "material-symbols-outlined";
      const numberOfLikes = upvoteButton.appendChild(span.cloneNode());
      numberOfLikes.className = 'comment-like-button';
      numberOfLikes.textContent = `${commentsArr[commentsArr.length-1-i].likes.numberOfLikes}`;
    }


    if(typeof currentUser !== 'undefined'){
        const postReplyForm = likeReplyContainer.appendChild(section.cloneNode());
        postReplyForm.className = "postReplyForm";
        // postReplyForm.action = `/home/reply/${}?_method=PUT`;
        // postReplyForm.method = "POST";
        const reply = postReplyForm.appendChild(input.cloneNode());
        reply.type = "text";
        // reply.name = "reply";
        reply.id = "reply";
        reply.placeholder = "Reply...";
        reply.className = `reply-input-${i}`;
        const postReply = postReplyForm.appendChild(button.cloneNode());
        // postReply.type = "submit";
        postReply.className = "postReply";
        postReply.textContent = "Reply";  
        postReply.id = commentsArr[commentsArr.length-1-i]._id;
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
        if(typeof currentUser !== 'undefined'){
          const upvoteContainer = actualReplyContainer.appendChild(section.cloneNode());
          // upvoteContainer.action = 
          // upvoteContainer.method = "POST";
          upvoteContainer.class = "upvoteContainer";
          const upvoteButton = upvoteContainer.appendChild(button.cloneNode());
          upvoteButton.id = repliesArr[repliesArr.length-1-j]._id;
          // upvoteButton.type = "submit";
          upvoteButton.className = "upvote-reply";
          const upvoteButtonImage = upvoteButton.appendChild(span.cloneNode());
          upvoteButtonImage.textContent = 'thumb_up';
          // upvoteButtonImage.src = "/images/dflag.webp";
          // upvoteButtonImage.alt = "flag";
          upvoteButtonImage.className = "material-symbols-outlined";
          const numberOfLikes = upvoteButton.appendChild(span.cloneNode());
          numberOfLikes.className = 'reply-like-button'
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
    element.addEventListener('click', postAReply);
  });
  
  Array.from(document.querySelectorAll('.upvoteButton')).forEach(element =>{
    element.addEventListener('click', likeAComment);
  });

  Array.from(document.querySelectorAll('.upvote-reply')).forEach(element =>{
    element.addEventListener('click', likeAReply);
  });
}

async function likeAComment(event){
  console.log(event);
  const specificCommentLikeButton = document.getElementById(`${event.currentTarget.id}`);
  const response = await fetch(`/home/likecomment/${event.currentTarget.id}`, {
    method: 'PUT',
  });
  const data = await response.json();
  if(specificCommentLikeButton.id == data._id){
    specificCommentLikeButton.querySelector('.comment-like-button').textContent = data.likes.numberOfLikes;
  }
  setTimeout(() =>{
    if(data.likes.whoLiked.includes(currentUser.userID) == false){
        specificCommentLikeButton.querySelector('.material-symbols-outlined').style.color = "rgb(136, 136, 255)";
    }
    else{
      specificCommentLikeButton.querySelector('.material-symbols-outlined').style.color = "rgb(255, 255, 255)";
    }
  }, 500);
}

async function likeAReply(event){
  try{
    const specificReplyLikeButton = document.getElementById(`${event.currentTarget.id}`);
  const response = await fetch(`/home/likereply/${event.currentTarget.id}`, {
    method: 'PUT',
  });
  const data = await response.json();
  if(specificReplyLikeButton.id == data._id){
    specificReplyLikeButton.querySelector('.reply-like-button').textContent = data.likes.numberOfLikes;
  }
  setTimeout(() =>{
    if(data.likes.whoLiked.includes(currentUser.userID) == false){
        specificReplyLikeButton.querySelector('.material-symbols-outlined').style.color = "rgb(136, 136, 255)";
    }
    else{
      specificReplyLikeButton.querySelector('.material-symbols-outlined').style.color = "rgb(255, 255, 255)";
    }
  }, 500);
  }
  catch(err){
    console.log(`:( ${err}`);
  }
}

async function postAReply(event){
  console.log(event);
  const reply = document.querySelector(`.${event.path[1].childNodes[0].className}`).value;
  try{
    const response = await fetch(`/home/reply/${event.currentTarget.id}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'reply': reply,
      })
    });
  }
  catch(err){
    console.log(`Damn. ${err}`);
  }
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