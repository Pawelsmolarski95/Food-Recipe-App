
const serachBtn = document.getElementById('btn-main-search');
console.log(serachBtn);
const containerFood = document.querySelector('.container-food');

const closeBtn = document.querySelector('.btn-close');

const mealDescription = document.querySelector('.meal-description');
console.log(mealDescription);
//listenery//

serachBtn.addEventListener('click', getMealList);
containerFood.addEventListener('click',getMealRecipe);


function getMealList(){
  let inputSearch = document.getElementById('inputSearch').value.trim();
  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`)
    .then(response => response.json())
    .then(data => {
      let html = '';
      if(data.meals) {
        data.meals.forEach(meal => {
          html+= `
            <div class="food-single-box" data-id="${meal.idMeal}">
                <div class="food-single-box-photo" id = "${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="food-single-box-description">
                    <h5>${meal.strMeal}</h5>
                    <div class="btn-div-recipe">
                        <a href="#" id = "${meal.idMeal}" class="btn-recipe">Get Recipe</a>
                    </div>
                </div>
            </div> 
            ` ;
        });
      } else {
        html = '\'Sorry, we didn\'t find any meal\'';
      }
      containerFood.innerHTML = html;
    });
}

function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('btn-recipe')){
    
    let mealItem = e.target.parentElement.parentElement.parentElement;
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
    
      .then(data => mealsRecipeModal(data.meals));
        
  }
}
function mealsRecipeModal(meal){
  console.log(meal); 
  meal = meal[0]; 
  let html = 
        `<div class="meal-description-wrapper">
         <div class="meal-description-btn">      
            <button class="btn-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="meal-description-title">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strCategory}</p>
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="meals-description-photo">
            <img src=${meal.strMealThumb} alt="">
            <a href="#"><h3>Watch video</h3></a>
        </div>  
    `;
  console.log(html);
  
 
  mealDescription.innerHTML = html;
  mealDescription.classList.remove('hidden');
  // hiddenDescription();
}


// function hiddenDescription(){
//   if(!mealDescription.classList.contains('hidden')){
  
//     closeBtn.addEventListener('click', function(){
//       mealDescription.classList.add('hidden');
//     });
//   }
// }