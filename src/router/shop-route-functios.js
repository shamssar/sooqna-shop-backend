'use strict';

require('dotenv').config();
const socketPort = process.env.SOCKET_PORT;
const io = require('socket.io-client');
let host = `http://localhost:${socketPort}/`;

const serverConnection = io.connect(host);

const {
    productTabel,
    orderTabel,
    cartTabel,
    ratingTabel,
    catagoryTabel,
    typeTabel,
    massageTabel,
    wishlistTabel,
    shippingTabel,
    userTabel,
} = require('../models/index-model');

async function addProductToCart(req, res) {
    const product_id = req.params.id;
    const userId = req.user.id;
    // let cart = await cartTabel.findOne({
    //     where: {
    //         user_id: userId
    //     }
    // });

    let product = await productTabel.findOne({
        where: {
            id: product_id
        }
    });
    if (product) {
        let cart = await cartTabel.findOne({
            where: {
                user_id: userId,
            }
        })
        if (cart) {
            if (!cart.product_id) {
                let newProduct = await cartTabel.update({
                    product_id,
                }, {
                    where: {
                        user_id: userId,
                    }
                })
                let originalProduct = await productTabel.findOne({
                    where: {
                        id: product_id,
                    }
                })
                console.log('UUUUUUUUUu', newProduct);
                res.status(201).json(originalProduct);
            } else {
                let newProduct = await cartTabel.create({
                    product_id,
                    user_id: userId,
                })
                console.log(newProduct);
                let originalProduct = await productTabel.findOne({
                    where: {
                        id: product_id,
                    }
                })
                res.status(201).json(originalProduct);
            }
        } else {
            let newProduct = await cartTabel.create({
                product_id,
                user_id: userId,
            })
            console.log(newProduct);
            let originalProduct = await productTabel.findOne({
                where: {
                    id: product_id,
                }
            })
            res.status(201).json(originalProduct);
        }

    } else {
        console.log('Product is not avaliable');
        res.status(403).send('Product is not avaliable');
    }

    // if (product) {
    //     cart.product_id = id;
    //     let totalprice = cart.totalprice + product.price;
    //     let totalquantity = cart.quantity + 1;
    //     // console.log(x, y);
    //     let updated = await cartTabel.update({
    //         // product_id: id,
    //         totalprice: cart.totalprice + totalprice,
    //         quantity: cart.quantity + totalquantity
    //     }, {
    //         where: {
    //             user_id: userId
    //         }
    //     });

    //     let wholeCart = await cartTabel.findOne({
    //     where: {
    //         user_id: userId
    //     }
    // });

    //     res.status(200).json(wholeCart);
    // }
}

async function addProductToWishList(req, res) {
    const product_id = req.params.id;
    const userId = req.user.id;
    let product = await productTabel.findOne({
        where: {
            id: product_id
        }
    });

    if (product) {
        let newProduct = await wishlistTabel.create({
                    product_id,
                    user_id: userId,
        })
        
        // let wishlist = await wishlistTabel.findOne({
        //     where: {
        //         user_id: userId,
        //     }
        // })
        // if (wishlist) {
        //     if (!wishlist.product_id) {
        //         let newProduct = await wishlistTabel.update({
        //             product_id,
        //         }, {
        //             where: {
        //                 user_id: userId,
        //             }
        //         })
        //         let originalProduct = await productTabel.findOne({
        //             where: {
        //                 id: product_id,
        //             }
        //         })
        //         console.log('UUUUUUUUUu', newProduct);
        //         res.status(201).json(originalProduct);;
        //     } else {
        //         let newProduct = await wishlistTabel.create({
        //             product_id,
        //             user_id: userId,
        //         })
        //         console.log(newProduct);
        //         let originalProduct = await productTabel.findOne({
        //             where: {
        //                 id: product_id,
        //             }
        //         })
                res.status(201).json(newProduct);
        //     }
        // }
    } else {
        console.log('Product is not avaliable');
        res.status(403).send('Product is not avaliable');
    }

}


async function addProductFromWishListToCart(req, res) {
    const productId = req.params.id;
    const userId = req.user.id;
    let productInWishList = await wishlistTabel.findOne({
        where: {
            product_id: productId
        }
    });
    if (productInWishList) {
        let productInCart = await cartTabel.create({
            user_id: userId,
            product_id: productId,
        });
        res.status(201).json(productInCart);
    } else {
        console.log('Product is not in your Wishlist');
        res.status(403).send('Product is not avaliable in your Wishlist');
    }
}


async function submitOrder(req, res) {
    const userId = req.user.id;
    let obj = req.body;
    let order = [];
    let allProductsInCart = await cartTabel.findAll({
        where: {
            user_id: userId
        }
    }); // array of objs
    let user = await userTabel.findOne({
        where: {
            id: userId
        }
    })
    if (allProductsInCart) {
        for (let i = 0; i < allProductsInCart.length; i++) {
            let productId = allProductsInCart[i].product_id;
            console.log('Proooo', productId);
            let allProductsInProductModel = await productTabel.findOne({
                where: {
                    id: productId,
                }
            })
            console.log('allProductsInProductModel', allProductsInProductModel);
            if (allProductsInProductModel) {
                obj.user_id = userId;
                obj.product_id = productId;
                obj.quantity = i + 1;
                if (!obj.adress) {
                    obj.adress = user.adress;
                }
                let currentOdrer = await orderTabel.create(obj);
                console.log("orderrrrrr after", currentOdrer);
                order.push(currentOdrer);
            }
        }
    }
    await cartTabel.destroy({
        truncate: {
            cascade: true
        },
        where: {
            user_id: userId,
        }
    })
    res.status(201).json(order);
}

async function confirmOrder(req, res) {
    const user = req.user;
    // const orderId = req.params.id;
    let updateState = await orderTabel.update({
        status: 'confirmed',
    }, {
        where: {
            status: 'submitted',
            isRecived: false,
            user_id:user.id,
        }
    })

    let order = await orderTabel.findAll({
        where: {
            user_id: user.id,
            status: 'confirmed',
            isRecived: false,
        }
    });
    let orderIds = order.map(order => {
        serverConnection.emit('confirm-order', order.id, user);
    })
    console.log('Confirmed Successfully');
    res.send(order)//add status
}

async function reciveOrder(req, res) {
    const user = req.user;
    // const orderId = req.params.id;
    let order = await orderTabel.update({
        isRecived: true,
        status: 'recived',
    }, {
        where: {
            user_id: user.id,
            status: 'indelivery',
            isRecived:false,
        }
    });
    console.log('Recived Successfully');
    res.send(order)//add status
    // let orderIds = order.map(order => order.id)
    serverConnection.emit('recive-order', user);
}

module.exports = {
    addProductToCart,
    addProductToWishList,
    addProductFromWishListToCart,
    submitOrder,
    confirmOrder,
    reciveOrder,
};
