const seachbutton = document.querySelector('.button');
const searchResultsBox = document.querySelector('.results');

const api_random = "https://www.themealdb.com/api/json/v1/1/random.php";
const randomMealText = document.querySelector('#recommended-meal-title');

const modalContainer = document.querySelector('.modal-container');
const viewIngredients = document.querySelectorAll('.recommended-meal-ingredients');
const closeButton = document.querySelector('.close');
const modalTitle = document.querySelector('.modal-title');
const modalImage = document.querySelector('.modal-img');
const ingredientList = document.querySelector('.ingredient-list');

const main = document.querySelector('.main');
const nav = document.querySelector('nav');
const logobox = document.querySelector('.logo-box');
const footer = document.querySelector('footer');
const hamburger = document.querySelector('.hamburger');
const navText = document.querySelector('.nav-text');

const randomImageBox = document.querySelector('.recommended-img-div');



// RESPONSIVE HAMBURGER TOGGLE
hamburger.addEventListener('click', () => {
    navText.classList.toggle('active');
});



// VIEW INGREDIENT/CLOSE BUTTON ONCLICK EVENT
function viewIngredientsHandler() {
    modalContainer.classList.add('show');
    main.style.filter = 'blur(3px)';
    nav.style.filter = 'blur(3px)';
    logobox.style.filter = 'blur(3px)';
    footer.style.filter = 'blur(3px)';

    closeButton.addEventListener('click', () => {
        modalContainer.classList.remove('show');
        main.style.filter = 'blur(0px)';
        nav.style.filter = 'blur(0px)';
        logobox.style.filter = 'blur(0px)';
        footer.style.filter = 'blur(0px)';
    });
}

viewIngredients.forEach(function (viewIngredient) {
    viewIngredient.addEventListener('click', viewIngredientsHandler);
});



// FETCHING AND GENERATING MEALS UPON USER INPUT
seachbutton.addEventListener('click', () => {
    const userInput = document.querySelector('input').value;
    const resultContainer = document.querySelector('.results');
    const resultText = document.querySelector('.search-result');
    var api_category = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + userInput;

    resultText.style.display = 'block';
    resultContainer.style.display = 'grid';


    function generateSearchResults(data) {
        const resultImageContainers = document.querySelectorAll('.resultimg');
        const resultMealNames = document.querySelectorAll('.result-title');

        data.meals.slice(0, 12).forEach((element, i) => {
            resultImageContainers[i].style.backgroundImage = `url(${element.strMealThumb})`;
            resultMealNames[i].innerHTML = `${element.strMeal}`;
        });
    }


    function generateIngredients(data) {


        main.addEventListener('click', function (event) {
            const clickedElement = event.target;
            const foodImg = clickedElement.previousElementSibling.previousElementSibling.style.backgroundImage;
            const foodName = clickedElement.previousElementSibling.innerHTML
            console.log(foodImg)

            if (clickedElement.tagName === 'H3') {
                fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
                    .then(response => response.json())
                    .then(data => {
                        const meal = data.meals[0];
                        const ingredients = [];

                        let ingredientPrint = ''
                        for (let i = 1; i <= 20; i++) {
                            const ingredient = meal[`strIngredient${i}`];
                            const measure = meal[`strMeasure${i}`];
                            if (ingredient && measure) {
                                ingredientPrint += (`<li>${measure} ${ingredient}</li>`);

                            }

                            modalTitle.innerHTML = foodName
                            ingredientList.innerHTML = ingredientPrint;

                        }
                        modalImage.style.backgroundImage = foodImg;

                        console.log('Meal Name:', foodName);
                        console.log('Ingredients:', ingredients);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }

    fetch(api_category)
        .then(response => response.json())
        .then(data => {
            generateSearchResults(data);
            generateIngredients(data);
        });
});




// FETCHING AND GENERATING RANDOM MEAL
function generateRandomMeal(data) {
    const randomImageBox = document.querySelector('.recommended-img-div');

    data.meals.forEach(element => {
        randomMealText.innerHTML = `${element.strMeal}`;
        randomImageBox.style.backgroundImage = `url(${element.strMealThumb})`;

        modalImage.style.backgroundImage = `url(${element.strMealThumb})`;
        modalTitle.innerHTML = `${element.strMeal}`;

        var output = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = element[`strIngredient${i}`];
            const measure = element[`strMeasure${i}`];
            if (ingredient && measure) {
                output += `<li>${measure} ${ingredient}</li>`;
            }
        }
        ingredientList.innerHTML = output;
    });
}

fetch(api_random)
    .then(response => response.json())
    .then(data => {
        console.log('data:', data);
        generateRandomMeal(data);
    });


