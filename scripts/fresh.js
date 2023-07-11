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