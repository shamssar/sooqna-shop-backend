'use strict';

const express = require('express');
const router = express.Router();
// const dataModules = require('../models/data-collection');
const basicAuth = require('../middlewares/basic');
const bearerAuth = require('../middlewares/bearer');
const permissions = require('../middlewares/acl');


const {
    // AUTH Functions :
    handleSignup,
    handleGetUsers,
    handleSignIn,
    homePage
} = require('./auth-routes');

const {
    // Admin Functions :
    deleteUser,
    getUsersAdmin,
    getProductAdmin,
    deleteOneProductByAdmin,
    createCatagory,
    createType,
    getAllConfirmedOrderByAdmin,
    confirmOrdersByAdmin,
    getCatagoryAdmin,
    getTypesAdmin,
    getAllTypesInCategoryAdmin,
    getAllRecivedOrders
} = require('./adminRoutes');

const {
    // Products Functions :
    getAllProducts,
    getAllProductsForUser,
    createProduct,
    updateProduct,
    deleteOneProduct,
    deleteAllProduct,
    getOneProduct,
} = require('./products-routes');

const {
    // Orders Functions :
    getAllOrder,
    CreateOrder,
    UpdateOrder,
    deleteOneOrder,
    deleteAllOrder,
} = require('./order-routes');

const {
    // Wishlist Functions :
    getAllWishlist,
    createWishlist,
    deleteOneWishlist,
    deleteAllWishlist,
} = require('./wishList-routes');

const {
    //  Cart Functions : 
    getAllCart,
    createCart,
    deleteOneCart,
    deleteAllCart,
} = require('./cart-routes');

const {
    // Search Functions :
    searchForUser,
    searchForTitleName,
    searchForPriceOfProduct,
    searchForProductColor,
    searchCategory,
} = require('./search-routes');

const {
    //Shopping Functions :
    addProductToCart,
    addProductToWishList,
    addProductFromWishListToCart,
    submitOrder,
    confirmOrder,
    reciveOrder,
} = require('./shop-route-functios');

const {
    // Setting Functions for User profile :
    userInfo,
    updateUserProfile,
    deleteUserProfile,
} = require("./userAccountSetting");

const createShipping = require("./shippingRoutes");

const {
    //Rating Functions :
    addRating,
    getRating
} = require('./rating-route');

const {
    // Messageing Functions :
    joinConversation,
    sendMessage,
    getMessgesBetweenUsers,
    getAllMessages,

} = require("./meseging");



/*..................AUTH ROUTES......................*/
router.get('/', homePage);
router.post('/signup', handleSignup);
router.post('/signin', basicAuth, handleSignIn);
router.get('/users', bearerAuth, permissions('delete'), handleGetUsers);

/*..................Admin ROUTES......................*/
router.get('/admin/users', bearerAuth, getUsersAdmin);
router.get('/admin/product', bearerAuth, getProductAdmin);
router.get('/admin/confirmedorder', bearerAuth, getAllConfirmedOrderByAdmin);
router.get('/admin/recivedorders', bearerAuth, getAllRecivedOrders);
router.get('/admin/catagory', bearerAuth, getCatagoryAdmin);
router.get('/admin/type', bearerAuth, getTypesAdmin);
router.get('/admin/typesof', bearerAuth, getAllTypesInCategoryAdmin);
router.post('/admin/catagory', bearerAuth, createCatagory);
router.post('/admin/type', bearerAuth, createType);
router.put('/admin/confirmorders', bearerAuth, confirmOrdersByAdmin);
router.delete('/admin/deleteuser/:id', bearerAuth, deleteUser);
router.delete('/admin/deleteproduct/:id', bearerAuth, deleteOneProductByAdmin);


/*..................Product ROUTES......................*/
router.get('/product',  getAllProducts);
router.get('/product/user/:userId', bearerAuth, getAllProductsForUser);
router.get('/product/:id', getOneProduct);
router.post('/product', bearerAuth, createProduct);
router.put('/product/:id', bearerAuth, updateProduct);
router.delete('/product/:id', bearerAuth, deleteOneProduct);
router.delete('/product', bearerAuth, deleteAllProduct);

/*..................Order ROUTES......................*/
router.get('/order', bearerAuth, getAllOrder);
router.post('/order', bearerAuth, CreateOrder);
router.put('/order/:id', bearerAuth, UpdateOrder);
router.delete('/order/:id', bearerAuth, deleteOneOrder);
router.delete('/order', bearerAuth, deleteAllOrder);

/*..................Wishlist ROUTES......................*/
router.get('/wishlist', bearerAuth, getAllWishlist); //Edit to bring all products
router.post('/wishlist', bearerAuth, createWishlist); //need to cancel it
router.delete('/wishlist/:id', bearerAuth, deleteOneWishlist); // Edit to delet one product
router.delete('/wishlist', bearerAuth, deleteAllWishlist); // Edit to delet all product

/*..................Cart ROUTES......................*/
router.get('/cart', bearerAuth, getAllCart);
router.post('/cart', bearerAuth, createCart);
router.delete('/cart/:id', bearerAuth, deleteOneCart); //make to delete one product from cart not from source
router.delete('/cart', bearerAuth, deleteAllCart);


/*..................Search ROUTES......................*/
router.get('/searchid',searchForUser);
router.get('/searchname',searchForTitleName);
router.get('/searchprice',searchForPriceOfProduct);
router.get('/searchcolor',searchForProductColor);
router.get('/searchcategory',searchCategory);

/*..................Shop ROUTES......................*/
router.post('/addtocart/:id', bearerAuth, addProductToCart);
router.post('/addtowishlist/:id', bearerAuth, addProductToWishList);
router.post('/productfromwishlisttocart/:id', bearerAuth, addProductFromWishListToCart);
router.post('/submitorder', bearerAuth, submitOrder);
router.put('/confirmorder', bearerAuth, confirmOrder);
router.put('/reciveorder', bearerAuth, reciveOrder);

/*..................User Setting ROUTES......................*/
router.get('/userinfo', bearerAuth, userInfo); // we can handel it in frontend , we don't need this userInfo route
router.put('/updateprofile', bearerAuth, updateUserProfile);
router.delete('/deleteprofile', bearerAuth, deleteUserProfile);

/*..................Rating ROUTES......................*/
router.get('/rating/:id', bearerAuth, getRating);
router.post('/rating/:id', bearerAuth, addRating);

/*............... Shipping ROUTES ...................*/
router.post('/shipping/:id', bearerAuth, createShipping);


/*............... Messages / Chat ROUTES...................*/
router.post('/joinroom/:id', bearerAuth, joinConversation);
router.post('/sendmessage/:id', bearerAuth, sendMessage);
router.get('/allmessages/:id', bearerAuth, getMessgesBetweenUsers);
router.get('/allmessages', bearerAuth, getAllMessages);


module.exports = router;
