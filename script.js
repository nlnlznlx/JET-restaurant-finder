document.getElementById("search-form").addEventListener('submit', function (event){
    event.preventDefault();

    const postcodeInput = document.getElementById('search-postcode').value;
    const postcode = postcodeValidate(postcodeInput);

    if (postcode) {
        fetchRestaurants(postcode);
    }
});

function postcodeValidate(postcode) {
    const postcodePattern = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}$/i;
    const cleanedPostcode = postcode.replace(/\s/g, '');

    if (postcode && postcodePattern.test(cleanedPostcode)) {
        return cleanedPostcode;
    } else {
        alert('Please enter a valid UK postcode.');
        return;
    }
};

function fetchRestaurants(postcode){
    const api = `http://localhost:3000/restaurants/${postcode}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            const restaurants = data.restaurants.slice(0, 10);
            showResults(restaurants);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
};
function showResults(restaurants) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (restaurants && restaurants.length > 0) {
        restaurants.forEach(restaurant => {
            const restaurantDiv = document.createElement('div');
            restaurantDiv.classList.add('restaurant');

            const image = document.createElement('img');
            image.src = `https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,w_425,d_uk:cuisines:${restaurant.cuisines[0].uniqueName}-1.jpg/v1/uk/restaurants/${restaurant.id}.jpg`

            const logo = document.createElement('img');
            logo.src = restaurant.logoUrl;

            const name = document.createElement('h4');
            name.textContent = restaurant.name;

            const cuisines = document.createElement('p');
            cuisines.textContent = 'Cuisines: ' + restaurant.cuisines.map(cuisine => cuisine.name).join(', ');

            const rating = document.createElement('p');
            rating.textContent = 'Rating: ' + (restaurant.rating ? restaurant.rating.starRating : 'No rating');

            const address = document.createElement('p');
            address.textContent = `Address: ${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`;

            restaurantDiv.appendChild(image);
            restaurantDiv.appendChild(name);
            restaurantDiv.appendChild(logo);
            restaurantDiv.appendChild(cuisines);
            restaurantDiv.appendChild(rating);
            restaurantDiv.appendChild(address);

            resultsContainer.appendChild(restaurantDiv);
        });
    } else {
        resultsContainer.innerHTML = '';

        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-warning';
        alertDiv.textContent = 'No restaurants found. Please enter another UK postcode.';

        resultsContainer.appendChild(alertDiv);
    }
}

