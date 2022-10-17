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
      cardCreator.textContent = cards[i].userName;
      cardCreator.href = `/home/userprofile/${cards[i].userID}`;
    }
    whosStronger();
  
  Array.from(document.querySelectorAll('.characterInfo')).forEach((element) =>{
    element.addEventListener('click', seeMore);
  });
  customSeeMore.closeButton.addEventListener('click', closeSeeMore);
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


