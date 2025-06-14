# Vue 3 + Vite

**HOW TO RUN:**
npm run dev

**TECHNOLOGY USED:**
- Vue JS
- Bootstrap


**VUE ECOSYSTEM USED:**
- Vue router (for pages)
- Pinia (for state management)
- Vue Devtools in Chrome extension


**FAKE API USED:**
https://fakeapi.platzi.com/


**FEATURES:**
- Product Listing
- Search/Filter
- CRUD


**DETAILED EXPLANATION OF FEATURES:**

**A. FEATURES FOR ALL USERS**

1. Login

- The fake API has a set of users including 1 admin. You can use the (email: john@mail.com | pass: changeme ) as a sample user. Then you can use the ( email: admin@mail.com | pass: admin123 ) for the administrator

2. Product List

- This PART can be seen by both the customer and the admin. It lists the products in a card, with pagination. The fake API used is stored in the env, for best practices

3. Product Search

- At the top of the Product list, a search bar is displayed. This allows the users to search for a specific product/item (names are the only searchable keyword)

4. Category

- The categories are listed on the left sidebar. This allows the user to filter the products by category

5. Sort

- Above the product list, there is a dropdown sort feature. This allows the user to sort the products by their price, either lowest to highest price or vice versa

6. Filter #1 - Price range

- This feature allows the user to filter out the products by a specific range. Users can input their minimum price and their maximum price

7. Filter #2 - Category filter

- Although there is already a category selection, this feature allows the user to select more than one category. If they like to see the available products from 2 or more categories, then they can use this filter.

  

**B. FEATURES FOR CUSTOMERS ONLY**

1. Add to Favorites

- The add to favorite feature is located on each product cards. However, this is only visible for the customers account, the admin cannot see or use this.

2. Add to Cart

- The add to cart feature is located on each product cards. However, this is only visible for the customers account, the admin cannot see or use this.

3. Favorites Page

- This page displays the favorite products of the users. Users can remove products here

4. Cart Page

- This page displays the products that were added to cart by the user. Users can select and remove products here

  

**C. FEATURES FOR ADMINS ONLY**

1. Admin dashboard

- This button can be seen in the navigation bar above, but only the admin can see this. The admin dashboard page is a table that lists the available products from the api. This is the READ. The admin has the right to add, update, and delete a product from here.

2. Create product

- In the Admin Dashboard, the admins can add new products. This is part of the CREATE

3. Update product

- In the Admin Dashboard, the admins can update exisitng products. This is part of the UPDATE

4. Delete product

- In the Admin Dashboard, the admins can delete/remove exisitng products from the api. This is part of the DELETE



**LIMITATIONS:**

- This is only a product listing web application. This is not an e-commerce, it is not transactional. This is for the purpose of completing the exercise for Front End Developer (VUE.JS)
