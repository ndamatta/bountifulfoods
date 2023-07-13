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
function calculateTotalNutrition() {
  /* Elements to display */
  const mainElement = document.querySelector(".fresh-main");
  const nutritionDiv = document.createElement('div');
  nutritionDiv.setAttribute("class", "nutritionDiv");

  nutritionDiv.remove()

  /* Lists with ingredients */
  const ingredientList1 = document.querySelector('#ingredientList1');
  const ingredientList2 = document.querySelector('#ingredientList2');
  const ingredientList3 = document.querySelector('#ingredientList3');

  const selectedFruits = [
    ingredientList1.options[ingredientList1.selectedIndex].text,
    ingredientList2.options[ingredientList2.selectedIndex].text,
    ingredientList3.options[ingredientList3.selectedIndex].text
  ];

  const fname = document.getElementById('fname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // if (fname.trim() === '' || email.trim() === '' || phone.trim() === '') {
  //   return;
  // }

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

      nutritionDiv.innerHTML = 
      `
      <h2>Your drink's info</h2>
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
