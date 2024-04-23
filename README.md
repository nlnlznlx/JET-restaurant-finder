# JET Restaurant Finder

This is a web application that uses the Just Eat API to retrieve and display restaurant information (name, cuisines, rating, and address) based on a valid UK postcode provided by the user.

## How to Build and Run the Project

To set up and run the project locally, follow these steps:

1. Open your terminal

2. Clone the repository using Git:

   ```bash
   git clone https://github.com/nlnlznlx/JET-restaurant-finder.git
    ```

3. Navigate to the project directory:

   ```bash
   cd JET-restaurant-finder/server
   ```

4. Install the necessary Node.js dependencies: 

   ```bash
   npm install
   ```

5. Start the server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your web browser to use the application.

## Preview
Here are some screenshots of the application in use:

- Main Page:

![index.html](https://github.com/nlnlznlx/JET-restaurant-finder/assets/127485018/479eb1c5-d5e3-4bc3-8abc-57442ce7061f)

- Sample of Search Results:

![searchResult](https://github.com/nlnlznlx/JET-restaurant-finder/assets/127485018/ce3311c9-0e4e-41a3-9405-743e1d8a5785)

- Invalid Postcode Entry:

<p align="center">
  <img alt="Invalid Postcode Entry 1" src="https://github.com/nlnlznlx/JET-restaurant-finder/assets/127485018/a6fc03c5-e5db-4f65-b94c-e89c41c55942" width="45%" />
  <img alt="Invalid Postcode Entry 2" src="https://github.com/nlnlznlx/JET-restaurant-finder/assets/127485018/72acda98-1212-447e-a39a-f5ff168e73c5" width="45%" />
</p>

## Assumptions
To make the search results more visually appealing, I wanted to display food images in addition to restaurant logos. After inspecting the JET website, I found a consistent URL structure for header images. Since I lack access to the actual image directory, I constructed URLs based on observations of some sample in the following format: `https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,q_auto,w_425,d_uk:cuisines:${restaurant.cuisines[0].uniqueName}-1.jpg/v1/uk/restaurants/${restaurant.id}.jpg`. 

During tests, this method retrieves images for all UK postcodes listed in the assignment file, but further refinement may be necessary to ensure long-term viability and consistency.

## Potential improvements
- Add filters to select restaurants by cuisines, location, and rating.
- Display additional information, such as delivery fees, estimated delivery time, and available discounts.
- Calculate and show the distance from each restaurant to the user's location, if they allow location access.
- Represent restaurant ratings visually using a proportion of five-star icons.
- Include a search feature to find restaurants by name or cuisine.  
