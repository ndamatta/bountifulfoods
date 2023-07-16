// FETCH TO GET INGREDIENTS
const url = 'https://brotherblazzard.github.io/canvas-content/fruit.json'

const ingredientList = document.querySelector('.ingredientList');

fetch(url)
    .then(response => response.json())
    .then(data => {
      const lists = ['ingredientList1', 'ingredientList2', 'ingredientList3'];
      
      lists.forEach(listId => {
        const list = document.getElementById(listId);
        
        data.forEach(fruit => {
          const option = document.createElement('option');
          option.value = fruit.name;
          option.textContent = fruit.name;
          list.appendChild(option);
        });
      });
    })
    .catch(error => {
      console.error('Error fetching fruit data:', error);
    });

// DISPLAY NUTRITION
function calculateTotalNutrition(event) {
  event.preventDefault();

  /* Lists with ingredients */
  const ingredientList1 = document.querySelector('#ingredientList1');
  const ingredientList2 = document.querySelector('#ingredientList2');
  const ingredientList3 = document.querySelector('#ingredientList3');

  const selectedFruits = [
    ingredientList1.options[ingredientList1.selectedIndex].text,
    ingredientList2.options[ingredientList2.selectedIndex].text,
    ingredientList3.options[ingredientList3.selectedIndex].text
  ];

  const fname = document.querySelector('#fname').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  const instructions = document.querySelector('#instructions').value;

  // Quit the function if the required form values are empty
  if (fname.trim() === '' || email.trim() === '' || phone.trim() === '') {
    return;
  }

  fetch(url)
    .then(response => response.json())
    .then(fruits => {
      const selectedFruitsObj = fruits.filter(fruit => selectedFruits.includes(fruit.name));

      const totalNutrition = selectedFruitsObj.reduce((sum, fruit) => {
        const { carbohydrates, protein, fat, calories, sugar } = fruit.nutritions;
        return {
          carbohydrates: sum.carbohydrates + carbohydrates,
          protein: sum.protein + protein,
          fat: sum.fat + fat,
          calories: sum.calories + calories,
          sugar: sum.sugar + sugar
        };
      }, { carbohydrates: 0, protein: 0, fat: 0, calories: 0, sugar: 0 });

      const mainElement = document.querySelector(".fresh-main");
      let nutritionDiv = document.querySelector(".nutritionDiv");

      // Check if nutrition is in the HTML, if true, remove it's content.
      if (!nutritionDiv) {
        nutritionDiv = document.createElement('div');
        nutritionDiv.setAttribute("class", "nutritionDiv");
      } else {
        nutritionDiv.innerHTML = "";
      }

      nutritionDiv.innerHTML = 
      `
      <h2>Your order 🍉</h2>
      <div class="order-info">
        <p><b>${fname}</b></p>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${getCurrentDate()}</p>
      </div>
      <div class="order-fruits">
      <p>${checkIfInstructionEmpty(instructions)}</p>
      <p>${checkIfIngredientEmpty(ingredientList1.options[ingredientList1.selectedIndex].text)} | ${checkIfIngredientEmpty(ingredientList2.options[ingredientList2.selectedIndex].text)} | ${checkIfIngredientEmpty(ingredientList3.options[ingredientList3.selectedIndex].text)}</p>
      </div>
      <table>
        <tr>
          <th>Nutrient</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Carbos</td>
          <td>${totalNutrition.carbohydrates.toFixed(1)}g</td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>${totalNutrition.protein.toFixed(1)}g</td>
        </tr>
        <tr>
          <td>Fat</td>
          <td>${totalNutrition.fat.toFixed(1)}g</td>
        </tr>
        <tr>
          <td>Calories</td>
          <td>${totalNutrition.calories.toFixed(1)}g</td>
        </tr>
        <tr>
          <td>Sugar</td>
          <td>${totalNutrition.sugar.toFixed(1)}g</td>
        </tr>
      </table>
      `;
      mainElement.appendChild(nutritionDiv);
    })
    .catch(error => {
      console.error(error);
    });
}
function checkIfInstructionEmpty(instruction) {
  if (instruction == "") {
    return "No instructions"
  }
  return `"${instruction}"`
}
function checkIfIngredientEmpty(ingredient) {
 if (ingredient == "Ingredient 1" || ingredient == "Ingredient 2" || ingredient == "Ingredient 3") {
  return "X"
 }
 return ingredient
}
function getCurrentDate() {
  let date = new Date();
  let formattedDate = date.toLocaleString()
  return formattedDate;

}
const form = document.querySelector('.fresh-main form');
form.addEventListener('submit', calculateTotalNutrition);
form.addEventListener('submit', getCurrentDate);

//
function updateDrinksTotal() {
  let count = localStorage.getItem('drinksTotal');
  localStorage.setItem('drinksTotal', 0);
  if (!count) {
      count = 0;
  } else {
      count = parseInt(count);
  }
  count++;
  localStorage.setItem('drinksTotal', count);
}
document.querySelector('.fresh-main form').addEventListener('submit', function(event) {
  event.preventDefault();
  updateDrinksTotal();
});
