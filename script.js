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
        let htmlContent = '<div class="container"><div class="row justify-content-center">';

        restaurants.forEach(restaurant => {
            const rating = restaurant.rating ?
                `<img src="img/star_filled.png" class="icon-star"><span><strong>${restaurant.rating.starRating}</strong>/5 (${restaurant.rating.count})`
                : 'No rating';

            htmlContent += `
                <div class="col-12 col-md-6 mb-4">
                    <div class="card">
                        <div class="bg-image" style="background-image: url('https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,w_425,d_uk:cuisines:${restaurant.cuisines[0].uniqueName}-1.jpg/v1/uk/restaurants/${restaurant.id}.jpg');">
                            <div class="name-logo">
                                <img src="${restaurant.logoUrl}" class="logo">
                                <h4 class="name">${restaurant.name}</h4>
                            </div>
                        </div>
                        <div class="cuisine-labels">
                            ${restaurant.cuisines.map(cuisine => `<span class="badge">${cuisine.name}</span>`).join(' ')}
                        </div>
                        <div class="rating">
                            <span>${rating}</span>
                        </div>
                        <div class="address">
                            <img src="img/location_pin.png" class="icon-pin">
                            <span>${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}</span>
                        </div>
                    </div>
                </div>`;
        });

        htmlContent += '</div></div>';
        resultsContainer.innerHTML = htmlContent;
    } else {
        resultsContainer.innerHTML = `<div class="alert alert-warning">No restaurants found. Please enter another UK postcode.</div>`;
    }
}

