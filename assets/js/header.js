appendCommentsToInbox();

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
      document.getElementById('something-new').classList.add('hidden');
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
  const section = document.createElement('section');
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

      const markedSeen = newComments.appendChild(section.cloneNode());
      markedSeen.className = 'mark-as-seen';
      // markedSeen.action = `/home/inbox/markseen/${inboxComments.newComments[inboxComments.newComments.length-1-i]._id}?_method=PUT`
      // markedSeen.method = 'POST';
      const seenButton = markedSeen.appendChild(button.cloneNode());
      seenButton.className = 'seen-button';
      seenButton.id = inboxComments.newComments[inboxComments.newComments.length-1-i]._id;
      // seenButton.type = 'submit';
      seenButton.textContent = '\u2713';

      const newCommentInbox = newComments.appendChild(p.cloneNode());
      newCommentInbox.className = 'new-comment-inbox';
      newCommentInbox.textContent = `${inboxComments.newComments[inboxComments.newComments.length-1-i].comment}`;

      const likeReplyContainer = newComments.appendChild(div.cloneNode());
      likeReplyContainer.className = 'likeReplyContainer';
      const postReplyForm = likeReplyContainer.appendChild(section.cloneNode());
      postReplyForm.className = "postReplyForm";
      // postReplyForm.action = `/home/reply/${}?_method=PUT`;
      // postReplyForm.method = "POST";
      const reply = postReplyForm.appendChild(input.cloneNode());
      reply.type = "text";
      // reply.name = "reply";
      reply.id = 'reply';
      reply.placeholder = "Reply...";
      reply.className = `inbox-reply-input${i}`;
      const postReply = postReplyForm.appendChild(button.cloneNode());
      // postReply.type = "submit";
      postReply.id = inboxComments.newComments[inboxComments.newComments.length-1-i]._id;
      postReply.className = "postReply";
      postReply.textContent = "Reply";  
    }
  }
  
  Array.from(document.querySelectorAll('.seen-button')).forEach(element =>{
    element.addEventListener('click', markedAsSeen);
    element.addEventListener('click', reloadInboxComments);
  })

  Array.from(document.querySelectorAll('.postReply')).forEach(element =>{
    element.addEventListener('click', inboxPostAReply);
    element.addEventListener('click', reloadInboxComments);
    // element.querySelector('.postReply').addEventListener('click', () =>{
    //   const markedSeenForms = Array.from(document.querySelectorAll('.mark-as-seen'));
    //   setTimeout(()=>{
    //     for(let i = 0; i < markedSeenForms.length; i++){
    //       if(element.action.includes(markedSeenForms[i].id)){
    //         markedSeenForms[i].querySelector('button').click();
    //       }
    //     }
    //   }, 700);
    // });  
  });

  if(inbox.childElementCount == 0){
    inboxNotification.classList.add('hidden');
  }
  else if(inbox.childElementCount > 0 && inbox.childElementCount <= 2){
    inboxNotification.textContent = `${inbox.childElementCount}`;
    somethingNew.classList.remove('hidden');
    inbox.style.overflowY = 'hidden';
  }
  else if(inbox.childElementCount > 0 && inbox.childElementCount <= 9){
    inboxNotification.textContent = `${inbox.childElementCount}`;
    inboxNotification.classList.remove('hidden');
    somethingNew.classList.remove('hidden');
  }
  else if(inbox.childElementCount > 9){
    inboxNotification.textContent = '9+';
    inboxNotification.classList.remove('hidden');
    somethingNew.classList.remove('hidden');
  }
}

async function inboxPostAReply(event){
  console.log(event);
  const reply = document.querySelector(`.${event.path[1].childNodes[0].className}`).value;
  try{
    const response = await fetch(`/home/inboxreply/${event.currentTarget.id}`, {
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

async function markedAsSeen(event){
  try{
    const response = await fetch(`/home/inbox/markseen/${event.currentTarget.id}`, {
      method: 'PUT',
    });
  }
  catch(err){
    console.log(`!!! ${err}`);
  }
}

async function reloadInboxComments(){
  setTimeout(async () =>{
    document.getElementById('inbox').innerHTML = "";
    await appendCommentsToInbox();
  }, 500);
}

// ---------------------- Left Section ----------------------------- //
setInterval(() =>{
  if(document.querySelector('body').clientWidth <= 800){
    document.querySelector('#grand-title > a').textContent = 'OP';
  }
  else{
    document.querySelector('#grand-title > a').textContent = 'One Piece Realm';
  }
}, 1000);