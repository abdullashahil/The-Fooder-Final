const seachbutton = document.querySelector('.button');
const searchResultsContainer = document.querySelector('.results')

const api_random = "https://www.themealdb.com/api/json/v1/1/random.php";
const randomMealText = document.querySelector('#recommended-meal-title');

const modalContainer = document.querySelector('.modal-container');
const viewIngredients = document.querySelectorAll('.recommended-meal-ingredients');
const closeButton = document.querySelector('.close');
const modalTitle = document.querySelector('.modal-title');
const modalImage = document.querySelector('.modal-img');
const ingredientList = document.querySelector('.ingredient-list')

const main = document.querySelector('.main')
const nav = document.querySelector('nav')
const logobox = document.querySelector('.logo-box')
const footer = document.querySelector('footer')
const hamburger = document.querySelector('.hamburger')
const navText = document.querySelector('.nav-text')


hamburger.addEventListener('click', ()=>{
    navText.classList.toggle('active')
})
// FETCHING AND GENERATING USER SEARCH RESULTS

seachbutton.addEventListener('click', () => {
    console.log('hello')
    const userInput = document.querySelector('input').value
    const resultContainer = document.querySelector('.results');
    const resultText = document.querySelector('.search-result');
    var api_category = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' + userInput;
    console.log(api_category)

    resultText.style.display = 'block'
    resultContainer.style.display = 'grid'


    function generateSearchResults(data) {
        const allIngredientss = [];

        const resultImageContainers = document.querySelectorAll('.resultimg')
        const resultMealNames = document.querySelectorAll('.result-title')


        for (let i = 0; i < 6; i++) {

            data.meals.slice(0, 12).forEach((element, i) => {
                resultImageContainers[i].style.backgroundImage = `url(${element.strMealThumb})`;
                resultMealNames[i].innerHTML = `${element.strMeal}`

                modalImage.style.backgroundImage = `url(${element.strMealThumb})`
                modalTitle.innerHTML = `${element.strMeal}`

                // for (let i = 1; i <= 20; i++) {
                //     const ingredient = element[`strIngredient${i}`];
                //     const measure = element[`strMeasure${i}`];
                //     if (ingredient && measure) {
                //         allIngredientss.push(`<li>${measure} ${ingredient}</li>`);
                //     }
                // }
                // ingredientList.innerHTML = allIngredientss

            });
        }



    }

    function generateIngredients(data) {


        viewIngredients.forEach(function (viewIngredients) {
            viewIngredients.addEventListener('click', () => {
                modalContainer.classList.add('show');
                main.style.filter = 'blur(3px)'
                nav.style.filter = 'blur(3px)'
                logobox.style.filter = 'blur(3px)'
                footer.style.filter = 'blur(3px)'

            });

        });

        closeButton.addEventListener('click', () => {
            modalContainer.classList.remove('show');
            main.style.filter = 'blur(0px)'
            nav.style.filter = 'blur(0px)'
            logobox.style.filter = 'blur(0px)'
            footer.style.filter = 'blur(0px)'
        });


        searchResultsContainer.addEventListener('click', function (event) {
            const clickedElement = event.target;

            if (clickedElement.tagName === 'H3') {
                // const imageUrl = clickedElement.src;
                const foodName = clickedElement.parentElement;
                fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
                    .then(response => response.json())
                    .then(data => {
                        const meal = data.meals[0];
                        const ingredients = meal.strIngredient1 + ', ' + meal.strIngredient2 + ', ' + meal.strIngredient3 + ', ' + meal.strIngredient4 + ', ' + meal.strIngredient5;
                        console.log(foodName)
                    })
                    .catch(error => {
                        console.error('Error fetching ingredients:', error);
                    });
            }
        });

    }



    fetch(api_category)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("Result is: ", data);
            generateSearchResults(data);
            generateIngredients(data)
        })

})








// FETCHING AND GENERATING RANDOM MEALS

// ...

function generateRandomMeal(data) {
    const randomImageBox = document.querySelector('.recommended-img-div');

    data.meals.forEach(element => {
        randomMealText.innerHTML = `${element.strMeal}`
        randomImageBox.style.backgroundImage = `url(${element.strMealThumb})`

        modalImage.style.backgroundImage = `url(${element.strMealThumb})`
        modalTitle.innerHTML = `${element.strMeal}`

        var output = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = element[`strIngredient${i}`];
            const measure = element[`strMeasure${i}`];
            if (ingredient && measure) {
                output += `<li>${measure} ${ingredient}</li>`
            }
        }
        ingredientList.innerHTML = output

    });
}

fetch(api_random)
    .then(response => response.json())
    .then(data => {
        console.log('data:', data)
        generateRandomMeal(data)
    })

// ...

viewIngredients.forEach(function (viewIngredient) {
    viewIngredient.addEventListener('click', () => {
        modalContainer.classList.add('show');
        main.style.filter = 'blur(3px)'
        nav.style.filter = 'blur(3px)'
        logobox.style.filter = 'blur(3px)'
        footer.style.filter = 'blur(3px)'

        // Move these lines here to update modal content on viewIngredients click
        randomMealText.innerHTML = modalTitle.innerHTML;
        modalImage.style.backgroundImage = randomImageBox.style.backgroundImage;
        ingredientList.innerHTML = output;
    });
});

// ...



