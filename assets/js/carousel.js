//------------------- Scroll  Featured Section ------------------------------------//
let carouselInterval = setInterval(() =>{
  document.getElementById('featured-cards-section').scrollLeft += 
  document.getElementById('featured-cards-section').clientWidth;
 }, 10000);

 let carouselReset = setInterval(() =>{
  if(document.getElementById('featured-cards-section').scrollLeft >= 
      document.getElementById('featured-cards-section').clientWidth * 4){
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
    left: document.getElementById('featured-cards-section').clientWidth * 3.7,
    behavior: 'smooth',
  });
 });

 document.getElementById('fifth-slide').addEventListener('click', () =>{
  document.getElementById('featured-cards-section').scrollTo({
    left: document.getElementById('featured-cards-section').clientWidth * 5,
    behavior: 'smooth',
  });
 });
