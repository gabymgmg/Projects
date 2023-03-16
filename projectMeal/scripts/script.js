
const get_recipe_button = document.getElementById('get-recipe')
const recipe_description = document.getElementById('recipe-container')
const new_header = document.querySelector('.initialHeader')

get_recipe_button.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then((data) => {
            createLayout(data.meals[0])

        })
        .catch(e => window.alert(e))
})

function createLayout(meal) {
    //get the ingredients
    let arrIngredients = []
    let ingredientsLeft = true
    let i = 1
    while (ingredientsLeft) {
        if (meal[`strIngredient${i}`]) {
            arrIngredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
            i++
        }
        else {
            ingredientsLeft = false
        }
    }
    arrIngredients = arrIngredients.map(ingr => `<li>${ingr}</li>`).join('')
    //get the tags
    let tags = meal.strTags
    if (tags) {
        tags.split(',').join(', ')
    } else {
        tags = ''
    }
    //get the area
    let area = meal.strArea
    if (!area) {
        area = ''
    }
    //get the video link
    let videoLink = meal.strSource
    if (videoLink) {
        videoLink = videoLink.slice(-11)
    }
    new_header.classList.replace('initialHeader', 'clickedHeader')

    const newInnerHTML = `
    <div id="recipe-container">
        <section id="content-recipe">
            <div class="content1">
                <img src="${meal.strMealThumb}" alt="meal photo">
                <p><strong>Category:</strong> ${meal.strCategory}
                <p><strong>Area:</strong> ${area}</p>
                <p><strong>Tags:</strong> ${tags}</p>
                <h3>Ingredients:</h3>
                ${arrIngredients}
            </div>
            <div id="content2">
                <h2> ${meal.strMeal} </h2>
                <p>${meal.strInstructions}</p> 
                <div id="videoWrap">
                    <h4> Video Recipe </h4>
                    <iframe width="640" height="480"
                        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                    </iframe>
                </div>
            </div>
        </section>

    </div>
    `
    recipe_description.innerHTML = newInnerHTML;
}
