let myGroup = [];
let drinkCounter = 0;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const drinksContainer = document.getElementById('drinksContainer');
const groupList = document.getElementById('groupList');
const drinkCount = document.getElementById('drinkCount');
const loadingDiv = document.getElementById('loadingDiv');
const notFoundDiv = document.getElementById('notFoundDiv');

window.addEventListener('load', function () {
  loadInitialDrinks();
});

searchBtn.addEventListener('click', function () {
  searchDrinks();
});

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchDrinks();
  }
});

function loadInitialDrinks() {
  showLoading();

  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      if (data.drinks) {
        let drinks = data.drinks.slice(0, 8);
        displayDrinks(drinks);
      }
    })
    .catch((error) => {
      hideLoading();
      console.log('Error:', error);
    });
}

function searchDrinks() {
  let searchText = searchInput.value.trim();

  if (searchText === '') {
    alert('Please enter a drink name!');
    return;
  }

  showLoading();

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      if (data.drinks) {
        displayDrinks(data.drinks);
      } else {
        showNotFound();
      }
    })
    .catch((error) => {
      hideLoading();
      console.log('Error:', error);
    });
}

function displayDrinks(drinks) {
  drinksContainer.innerHTML = '';
  notFoundDiv.style.display = 'none';

  drinks.forEach((drink) => {
    let shortInstructions = drink.strInstructions.substring(0, 15) + '...';

    let drinkCard = document.createElement('div');
    drinkCard.className = 'col-md-6 col-lg-6';
    drinkCard.innerHTML = `
            <div class="drink-card">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h5>${drink.strDrink}</h5>
                <span class="badge">${drink.strCategory}</span>
                <p class="mt-2">${shortInstructions}</p>
                <button class="btn btn-add-group" onclick="addToGroup('${drink.strDrink}', '${drink.idDrink}')">
                    Add to Group
                </button>
                <button class="btn btn-details" onclick="showDetails('${drink.idDrink}')">
                    Details
                </button>
            </div>
        `;

    drinksContainer.appendChild(drinkCard);
  });
}

function addToGroup(drinkName, drinkId) {
  if (drinkCounter >= 7) {
    alert('You can only add maximum 7 drinks to your group!');
    return;
  }

  let alreadyAdded = false;
  for (let i = 0; i < myGroup.length; i++) {
    if (myGroup[i].name === drinkName) {
      alreadyAdded = true;
      break;
    }
  }

  if (alreadyAdded) {
    alert('This drink is already in your group!');
    return;
  }

  myGroup.push({
    name: drinkName,
    id: drinkId,
  });

  drinkCounter++;

  updateGroupDisplay();
}

function updateGroupDisplay() {
  drinkCount.textContent = drinkCounter;

  groupList.innerHTML = '';

  for (let i = 0; i < myGroup.length; i++) {
    let groupItem = document.createElement('div');
    groupItem.className = 'group-item';
    groupItem.innerHTML = `
            <strong>${i + 1}.</strong> ${myGroup[i].name}
        `;
    groupList.appendChild(groupItem);
  }

  if (myGroup.length === 0) {
    groupList.innerHTML = '<p class="text-muted">No drinks added yet. Add up to 7 drinks!</p>';
  }
}

function showDetails(drinkId) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
    .then((response) => response.json())
    .then((data) => {
      let drink = data.drinks[0];

      let ingredients = [];
      for (let i = 1; i <= 15; i++) {
        let ingredient = drink[`strIngredient${i}`];
        let measure = drink[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(`${measure ? measure : ''} ${ingredient}`);
        }
      }

      document.getElementById('modalTitle').textContent = drink.strDrink;
      document.getElementById('modalBody').innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${drink.strDrinkThumb}" class="img-fluid rounded" alt="${
        drink.strDrink
      }">
                    </div>
                    <div class="col-md-6">
                        <h5>Drink Information</h5>
                        <p><strong>Category:</strong> ${drink.strCategory}</p>
                        <p><strong>Type:</strong> ${drink.strAlcoholic}</p>
                        <p><strong>Glass:</strong> ${drink.strGlass}</p>
                        <p><strong>Instructions:</strong></p>
                        <p>${drink.strInstructions}</p>
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;

      let modal = new bootstrap.Modal(document.getElementById('detailsModal'));
      modal.show();
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

function showLoading() {
  loadingDiv.style.display = 'block';
  drinksContainer.innerHTML = '';
  notFoundDiv.style.display = 'none';
}

function hideLoading() {
  loadingDiv.style.display = 'none';
}

function showNotFound() {
  notFoundDiv.style.display = 'block';
  drinksContainer.innerHTML = '';
}
