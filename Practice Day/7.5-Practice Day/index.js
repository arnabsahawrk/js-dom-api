async function loadInitialMeals() {
  fetchMealsBySearch('a');
}

async function fetchMealsBySearch(query) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    displayMeals(data.meals || []);
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
}

async function fetchMealDetails(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    showMealModal(data.meals[0]);
  } catch (error) {
    console.error('Error fetching meal details:', error);
  }
}

function displayMeals(meals) {
  const container = document.getElementById('mealsContainer');
  container.innerHTML = '';

  if (meals.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h4 class="text-muted">No results found</h4>
      </div>
    `;
    return;
  }

  meals.forEach((meal) => {
    const col = document.createElement('div');
    col.className = 'col-md-3';

    col.innerHTML = `
      <div class="card h-100 shadow-sm" role="button" onclick="fetchMealDetails(${meal.idMeal})">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal Image" />
        <div class="card-body">
          <h6 class="fw-semibold">${meal.strMeal}</h6>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

function showMealModal(meal) {
  document.getElementById('mealModalLabel').innerText = meal.strMeal;
  document.getElementById('mealModalImg').src = meal.strMealThumb;
  document.getElementById('mealModalDesc').innerText = meal.strInstructions;

  const modal = new bootstrap.Modal(document.getElementById('mealModal'));
  modal.show();
}

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  const value = searchInput.value.trim();
  if (value.length > 0) fetchMealsBySearch(value);
});

loadInitialMeals();
