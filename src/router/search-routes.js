'use strict';

const { product , catagory} = require('../models/index-model');

// Search for all products for specific user 
async function searchForUser(req, res) {
    const id = req.query.id;
    let allProducts = await product.searchByUser(id);
    res.status(200).json(allProducts);
}

// search for products with specific name or title ( Using "title" in product Table )
async function searchForTitleName(req, res) {
    const name = req.query.name;
    let allProducts = await product.searchByName(name);
    res.status(200).json(allProducts);
}

// search for product with chosen Price
async function searchForPriceOfProduct(req, res) {
    const price = req.query.price;
    let allProducts = await product.searchByPrice(price);
    res.status(200).json(allProducts);
}

// search for product with chosen Color
async function searchForProductColor(req, res) {
    const color = req.query.color;
    let allProducts = await product.searchByColor(color);
    res.status(200).json(allProducts);
}

/* don't forget to add Two functions, 
one : search for some product for specific Category
Two : search for some product for specific Category and specific Price
*/

async function searchCategory(req, res) {
    console.log('done');
    const name = req.query.category;
    console.log('sss',name);
    let catagories = await catagory.getCategory(name);
    console.log(catagories)
  let allProducts = await product.searchByCategory(catagories.id);
  res.status(200).json(allProducts);
}

// async function searchCategoryPrice(req, res) {
//     const category_id = req.params.category_id;
//     const price = req.params.category_id;
//     let allProducts = await product.searchByCategoryPrice(category_id,price);
//     res.status(200).json(allProducts);
// }

module.exports = {
    // Search
    searchForUser,
    searchForTitleName,
    searchForPriceOfProduct,
    searchForProductColor,
    searchCategory,
}