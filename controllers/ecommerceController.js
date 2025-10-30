// const mongoose = require("mongoose");
// const configureMulter = require("../configureMulter");
// const ProductCategory = require("../models/ecommerceModel/ProductCategory");
// const multer = require("multer");
// const Product = require("../models/ecommerceModel/Product");
// const Pooja = require("../models/ecommerceModel/Pooja");
// const Customers = require("../models/customerModel/Customers");
// const CustoemrCart = require("../models/ecommerceModel/CustomerCart");
// const ProductOrder = require("../models/ecommerceModel/ProductOrder");
// const AstromallOrders = require("../models/ecommerceModel/AstromallOrders");
// const RechargeWallet = require("../models/customerModel/RechargeWallet");
// const AddressCarts = require("../models/ecommerceModel/AddressCarts");

// const uploadProductCategory = configureMulter("uploads/ecommerce/", [
//     { name: "image", maxCount: 1 },
// ]);

// const uploadProducts = configureMulter("uploads/ecommerce/", [
//     { name: "image", maxCount: 1 },
//     { name: "bannerImages", maxCount: 5 },
// ]);

// const uploadPoojaImagesVideos = configureMulter("uploads/astromall/", [
//     { name: "images", maxCount: 5 },
//     { name: "videos", maxCount: 1},
// ]);

// exports.createProductCategory = function (req, res) {
//     uploadProductCategory(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Multer error", error: err });
//         } else if (err) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Error uploading file", error: err });
//         }

//         try {
//             const { name } = req.body;

//             // Validate required fields
//             if (!name) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Please provide a categoryName.",
//                 });
//             }

//             const image = req.files["image"]
//                 ? req.files["image"][0].path.replace(
//                     /^.*ecommerce[\\/]/,
//                     "ecommerce/"
//                 )
//                 : "";

//             if (!image) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Please provide a image.",
//                 });
//             }

//             // Create a new file entry in the Customers collection
//             const productCategory = new ProductCategory({ categoryName:name, image });
//             await productCategory.save();

//             res.status(200).json({
//                 success: true,
//                 message: "Product category created successfully.",
//                 data: productCategory,
//             });
//         } catch (error) {
//             console.error("Error uploading product category:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Failed to upload product category.",
//                 error: error.message,
//             });
//         }
//     });
// };

// exports.updateProductCategory = function (req, res) {
//     uploadProductCategory(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Multer error", error: err });
//         } else if (err) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Error uploading file", error: err });
//         }

//         try {
//             const { categoryId, name } = req.body;

//             if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
//                 return res
//                     .status(400)
//                     .json({ success: false, message: "Invalid categoryId" });
//             }

//             const image = req.files["image"]
//                 ? req.files["image"][0].path.replace(
//                     /^.*ecommerce[\\/]/,
//                     "ecommerce/"
//                 )
//                 : "";

//             const productCategory = await ProductCategory.findById(categoryId);
//             if (name) {
//                 productCategory.categoryName = name
//             }

//             if (image) {
//                 productCategory.image = image
//             }
//             await productCategory.save();

//             res.status(200).json({
//                 success: true,
//                 message: "Product category updated successfully.",
//                 data: productCategory,
//             });
//         } catch (error) {
//             console.error("Error uploading product category:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Failed to upload product category.",
//                 error: error.message,
//             });
//         }
//     });
// };

// exports.getProductCategory = async function (req, res) {
//     try {
//         // Fetch all skills from the database
//         const productCategory = await ProductCategory.find().sort({ _id: -1 });

//         // Return the list of skills as a JSON response
//         res.status(200).json({ success: true, productCategory });
//     } catch (error) {
//         console.error("Error fetching productCategory:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch productCategory",
//             error: error.message,
//         });
//     }
// };

// exports.deleteProductCategory = async function (req, res) {
//     try {
//         const categoryId = req.body.categoryId;

//         if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid categoryId" });
//         }

//         const deletedProductCategory = await ProductCategory.findByIdAndDelete(categoryId);

//         if (!deletedProductCategory) {
//             return res
//                 .status(404)
//                 .json({ success: false, message: "Product category not found." });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Product Category deleted successfully",
//             deletedProductCategory,
//         });
//     } catch (error) {
//         console.error("Error deleting Product Category:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete Product Category",
//             error: error.message,
//         });
//     }
// };

// exports.createProducts = function (req, res) {
//     uploadProducts(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Multer error", error: err });
//         } else if (err) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Error uploading file", error: err });
//         }

//         try {
//             const { categoryId, productName, description, mrp, price, purchasePrice, quantity, expiryDate, manufactureDate, refundRequetDay, inventory } = req.body;

//             // Validate required fields
//             if (!productName || !categoryId  ) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "All field is required",
//                 });
//             }

//             if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
//                 return res
//                     .status(400)
//                     .json({ success: false, message: "Invalid categoryId" });
//             }

//             const image = req.files["image"]
//                 ? req.files["image"][0].path.replace(
//                     /^.*ecommerce[\\/]/,
//                     "ecommerce/"
//                 )
//                 : "";

//             let bannerImages = [];
//             const imagesData = req.files["bannerImages"] ?? null;
//             if (!!imagesData) {
//                 bannerImages = imagesData.map((item, index) => {
//                     return req.files["bannerImages"][index].path.replace(
//                         /^.*ecommerce[\\/]/,
//                         "uploads/ecommerce/"
//                     );
//                 })
//             }


//             if (!image) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Please provide a image.",
//                 });
//             }

//             if (bannerImages.length == 0) {
//                 return res.status(200).json({
//                     success: false,
//                     message: "At least one bannerImage is required",
//                 });
//             }

//             // Create a new file entry in the Customers collection
//             const product = new Product({ categoryId, productName, description, mrp, price, purchasePrice, quantity, expiryDate, manufactureDate, refundRequetDay, image, bannerImages, inventory });
//             await product.save();

//             res.status(200).json({
//                 success: true,
//                 message: "Produc created successfully.",
//                 data: product,
//             });
//         } catch (error) {
//             console.error("Error uploading product:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Failed to upload product.",
//                 error: error.message,
//             });
//         }
//     });
// };

// exports.updateProducts = function (req, res) {
//     uploadProducts(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Multer error", error: err });
//         } else if (err) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Error uploading file", error: err });
//         }

//         try {
//             const { productId, productName, description, mrp, price, purchasePrice, quantity, expiryDate, manufactureDate, refundRequetDay, inventory } = req.body;

//             if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//                 return res
//                     .status(400)
//                     .json({ success: false, message: "Invalid productId" });
//             }

//             const image = req.files["image"]
//                 ? req.files["image"][0].path.replace(
//                     /^.*ecommerce[\\/]/,
//                     "ecommerce/"
//                 )
//                 : "";

//             let bannerImages = [];
//             const imagesData = req.files["bannerImages"] ?? null;
//             if (!!imagesData) {
//                 bannerImages = imagesData.map((item, index) => {
//                     return req.files["bannerImages"][index].path.replace(
//                         /^.*ecommerce[\\/]/,
//                         "uploads/ecommerce/"
//                     );
//                 })
//             }

//             const product = await Product.findById(productId)

//             if (!product) {
//                 return res
//                     .status(404)
//                     .json({ success: false, message: "product not found" });
//             }

//             if (image) {
//                 product.image = image
//             }

//             if (bannerImages.length != 0) {
//                 product.bannerImages = bannerImages
//             }

//             product.productName = productName ?? product.productName
//             product.description = description ?? product.description
//             product.mrp = mrp ?? product.mrp
//             product.price = price ?? product.price
//             product.purchasePrice = purchasePrice ?? product.purchasePrice
//             product.quantity = quantity ?? product.quantity
//             product.expiryDate = expiryDate ?? product.expiryDate
//             product.manufactureDate = manufactureDate ?? product.manufactureDate
//             product.refundRequetDay = refundRequetDay ?? product.refundRequetDay
//             product.inventory = inventory ?? product.inventory

//             // Create a new file entry in the Customers collection
//             await product.save();

//             res.status(200).json({
//                 success: true,
//                 message: "Produc updated successfully.",
//                 data: product,
//             });
//         } catch (error) {
//             console.error("Error uploading product:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Failed to upload product.",
//                 error: error.message,
//             });
//         }
//     });
// };

// exports.getProducts = async function (req, res) {
//     try {
//         // Fetch all skills from the database
//         const { categoryId } = req.body
//         if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid categoryId" });
//         }
//         const products = await Product.find({ categoryId }).sort({ _id: -1 });

//         // Return the list of skills as a JSON response
//         res.status(200).json({ success: true, products });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch products",
//             error: error.message,
//         });
//     }
// };

// exports.getAllProducts = async function (req, res) {
//     try {
//         // Fetch all skills from the database

//         const products = await Product.find().populate('categoryId').sort({ _id: -1 });

//         // Return the list of skills as a JSON response
//         res.status(200).json({ success: true, products });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch products",
//             error: error.message,
//         });
//     }
// };

// exports.deleteProduct = async function (req, res) {
//     try {
//         const productId = req.body.productId;

//         if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid productId" });
//         }

//         const deletedProduct = await Product.findByIdAndDelete(productId);

//         if (!deletedProduct) {
//             return res
//                 .status(404)
//                 .json({ success: false, message: "Product not found." });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Product deleted successfully",
//             deletedProduct,
//         });
//     } catch (error) {
//         console.error("Error deleting Product:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete Product",
//             error: error.message,
//         });
//     }
// };

// exports.createPooja = function (req, res) {
//     uploadProducts(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Multer error", error: err });
//         } else if (err) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Error uploading file", error: err });
//         }

//         try {
//             const { pujaName,description,price} = req.body;
           
//             // Validate required fields
//             if (!pujaName || !price || !description) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "All field is required",
//                 });
//             }

//             const image = req.files["image"]
//                 ? req.files["image"][0].path.replace(
//                     /^.*ecommerce[\\/]/,
//                     "ecommerce/"
//                 )
//                 : "";

//             let bannerImages = [];
//             const imagesData = req.files["bannerImages"] ?? null;
//             if (!!imagesData) {
//                 bannerImages = imagesData.map((item, index) => {
//                     return req.files["bannerImages"][index].path.replace(
//                         /^.*ecommerce[\\/]/,
//                         "uploads/ecommerce/"
//                     );
//                 })
//             }


//             if (!image) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Please provide a image.",
//                 });
//             }

//             // if (bannerImages.length == 0) {
//             //     return res.status(200).json({
//             //         success: false,
//             //         message: "At least one bannerImage is required",
//             //     });
//             // }

//             // Create a new file entry in the Customers collection
//             const pooja = new Pooja({ pujaName, description,image,price});
//             await pooja.save();

//             res.status(200).json({
//                 success: true,
//                 message: "Pooja created successfully.",
//                 data: pooja,
//             });
//         } catch (error) {
//             console.error("Error uploading pooja:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Failed to upload pooja.",
//                 error: error.message,
//             });
//         }
//     });
// };

// exports.updatePooja = function (req, res) {
//     uploadProducts(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Multer error", error: err });
//         } else if (err) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Error uploading file", error: err });
//         }

//         try {
//             const { pujaId, pujaName,description, price } = req.body;

//             if (!pujaId || !mongoose.Types.ObjectId.isValid(pujaId)) {
//                 return res
//                     .status(400)
//                     .json({ success: false, message: "Invalid pujaId" });
//             }

//             const image = req.files["image"]
//                 ? req.files["image"][0].path.replace(
//                     /^.*ecommerce[\\/]/,
//                     "ecommerce/"
//                 )
//                 : "";

//             // let bannerImages = [];
//             // const imagesData = req.files["bannerImages"] ?? null;
//             // if (!!imagesData) {
//             //     bannerImages = imagesData.map((item, index) => {
//             //         return req.files["bannerImages"][index].path.replace(
//             //             /^.*ecommerce[\\/]/,
//             //             "uploads/ecommerce/"
//             //         );
//             //     })
//             // }

//             const pooja = await Pooja.findById(pujaId)

//             if (!pooja) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Puja not found",
//                 });
//             }


//             if (image) {
//                 pooja.image = image
//             }

//             // if (bannerImages.length != 0) {
//             //     pooja.bannerImages = bannerImages
//             // }

//             pooja.pujaName = pujaName ?? pooja.pujaName
//             pooja.description = description ?? pooja.description
//             pooja.price = price ?? pooja.price

//             await pooja.save();

//             res.status(200).json({
//                 success: true,
//                 message: "Pooja updated successfully.",
//                 data: pooja,
//             });
//         } catch (error) {
//             console.error("Error uploading pooja:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Failed to upload pooja.",
//                 error: error.message,
//             });
//         }
//     });
// };

// exports.getPooja = async function (req, res) {
//     try {

//         const pooja = await Pooja.find().sort({ _id: -1 });

//         // Return the list of skills as a JSON response
//         res.status(200).json({ success: true, pooja });
//     } catch (error) {
//         console.error("Error fetching pooja:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch pooja",
//             error: error.message,
//         });
//     }
// };


// exports.poojaDetailById = async function(req, res){
//     try{

//         const {id} = req.body;
//         if(!id || id == " "){
//             return res.status(400).json({
//                 successs: false,
//                 message: "please provide id!"
//             })
//         }

//         const getDetail = await Pooja.findById(id);

//         if(!getDetail){
//             return res.status(200).json({
//                 success: true,
//                 message: 'Empty data'
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Pooja detail getting successfully',
//             data: getDetail
//         })
    

//     }

//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         })
//     }
// }

// exports.deletePooja = async function (req, res) {
//     try {
//         const {pujaId} = req.body;

//         if (!pujaId || !mongoose.Types.ObjectId.isValid(pujaId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid pujaId" });
//         }

//         const deletedPooja = await Pooja.findByIdAndDelete(pujaId);

//         if (!deletedPooja) {
//             return res
//                 .status(404)
//                 .json({ success: false, message: "puja not found." });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Pooja deleted successfully",
//             deletedPooja,
//         });
//     } catch (error) {
//         console.error("Error deleting Pooja:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete Pooja",
//             error: error.message,
//         });
//     }
// };

// exports.addToCart = async function (req, res) {
//     try {
//         const { productId, customerId } = req.body;

//         if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid productId" });
//         }

//         if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid customerId" });
//         }

//         const product = await Product.findById(productId)
//         const customer = await Customers.findById(customerId)

//         if (!product || !customer) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid customerId or productId" });
//         }

//         if (product?.quantity <= 0) {
//             return res
//                 .status(200)
//                 .json({ success: false, message: "This product is out of stock" });
//         }

//         const isAlreadyAdded = await CustoemrCart.findOne({ productId, customerId })

//         if (isAlreadyAdded) {
//             return res.status(200).json({
//                 success: true,
//                 message: "Product is added to your cart",
//             });
//         }

//         const cart = new CustoemrCart({
//             productId,
//             customerId
//         })

//         await cart.save()

//         return res.status(200).json({
//             success: true,
//             message: "Product is added to your cart",
//             cart,
//         });
//     } catch (error) {
//         console.error("Error deleting Pooja:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete Pooja",
//             error: error.message,
//         });
//     }
// };

// exports.getCustomerCart = async function (req, res) {
//     try {
//         const { customerId } = req.body;

//         if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
//             return res.status(400).json({ success: false, message: "Invalid customerId" });
//         }

//         let cart = await CustoemrCart.find({ customerId }).populate('productId')
//         let totalPrice = 0;

//         for (let item of cart) {
//             // console.log(item, "Itemmmmmmmmmmm")
//             const product = item.productId;
//             if (product?.quantity <= 0) {
//                 item.quantity = 0;
//                 item.status = "OUT_OF_STOCK";
//             } else if (item.quantity > product.quantity) {
//                 item.quantity = product?.quantity;
//             }
//             await item.save();
//             if (item.status !== "OUT_OF_STOCK") {
//                 totalPrice += item.quantity * product.price;
//             }
//         }

//         cart = await CustoemrCart.find({ customerId }).populate('productId');

//         return res.status(200).json({
//             success: true,
//             message: "Product is added to your cart",
//             totalPrice,
//             cart,
//         });
//     } catch (error) {
//         console.error("Error deleting Pooja:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete Pooja",
//             error: error.message,
//         });
//     }
// };


// exports.removeCartItem = async (req, res)=>{
//     try{

//         const {cartId} = req.body;

//         if(!cartId || cartId == " "){
//             return res.status(400).json({
//                 success: false,
//                 message: 'Please provide cartId!'
//             })
//         }

//         const removeItem = await CustoemrCart.findByIdAndDelete(cartId)

//         if(!removeItem){
//             return res.status(200).json({
//                 success: true,
//                 messsage: 'cartId not found!'
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Cart deleted successfully'
//         })

//     }

//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// }

// exports.updateCartItemQuantity = async function (req, res) {
//     try {
//         const { cartItemId, type } = req.body;

//         if (!cartItemId || !mongoose.Types.ObjectId.isValid(cartItemId)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid cartItemId" });
//         }

//         if (!['ADD', 'REMOVE'].includes(type)) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Invalid type. Must be 'ADD' or 'REMOVE'" });
//         }

//         let cartItem = await CustoemrCart.findById(cartItemId).populate('productId');
//         if (!cartItem) {
//             return res
//                 .status(404)
//                 .json({ success: false, message: "Cart item not found" });
//         }

//         const product = cartItem.productId;
//         if (!product) {
//             return res
//                 .status(404)
//                 .json({ success: false, message: "Product not found" });
//         }

//         if (type === 'ADD') {
//             if (cartItem.quantity >= product.quantity) {
//                 return res
//                     .status(400)
//                     .json({ success: false, message: "Reached maximum product quantity" });
//             }
//             cartItem.quantity += 1;
//         } else if (type === 'REMOVE') {
//             cartItem.quantity -= 1;
//             if (cartItem.quantity <= 0) {
//                 await CustoemrCart.deleteOne({ _id: cartItemId })
//                 return res
//                     .status(200)
//                     .json({ success: true, message: "Product removed from cart" });
//             }
//         }

//         cartItem.status = product.quantity > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK';
//         await cartItem.save();

//         return res.status(200).json({
//             success: true,
//             message: `Product quantity updated to ${cartItem.quantity}`,
//             cartItem,
//         });
//     } catch (error) {
//         console.error("Error updating cart item quantity:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to update cart item quantity",
//             error: error.message,
//         });
//     }
// };

// exports.orderProduct = async function (req, res) {
//     try {
//         const { customerId } = req.body;

//         if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
//             return res.status(400).json({ success: false, message: "Invalid customerId" });
//         }

//         const cartItems = await CustoemrCart.find({ customerId }).populate('productId');
//         if (!cartItems.length) {
//             return res.status(400).json({ success: false, message: "Cart is empty" });
//         }

//         let totalAmount = 0;

//         const orderProducts = cartItems.map(cartItem => {
//             const product = cartItem.productId;
//             totalAmount += cartItem.quantity * product.price;
//             return {
//                 productId: product._id,
//                 quantity: cartItem.quantity,
//                 price: product.price
//             };
//         });

//         const totalWalletRecharge = (await RechargeWallet.find()).length;
//         const customerInvoiceId = `#ASTROONE${totalWalletRecharge}`;

//         const newOrder = new ProductOrder({
//             customerId,
//             invoiceId: customerInvoiceId,
//             products: orderProducts,
//             amount: totalAmount,
//             status: 'INITIATED'
//         });

        

//         const customerWalletHistory = {
//             customer: customerId,
//             invoiceId: customerInvoiceId,
//             gst: 18,
//             recieptNumber: totalWalletRecharge + 1,
//             discount: "",
//             offer: "",
//             totalAmount: "",
//             amount: totalAmount,
//             paymentMethod: "Online",
//             transactionType: 'DEBIT',
//             type: 'PRODUCT'
//         };

//         const rechargeTransaction = new RechargeWallet(customerWalletHistory);
      

//         await newOrder.save();
//         await rechargeTransaction.save()

//         await CustoemrCart.deleteMany({ customerId });

//         return res.status(201).json({
//             success: true,
//             message: "Order placed successfully",
//             order: newOrder
//         });

//     } catch (error) {
//         console.error("Error updating cart item quantity:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to update cart item quantity",
//             error: error.message,
//         });
//     }
// };


// exports.bookPuja = async function (req, res) {
//     try {
//         const { userId, pujaId, date, time, mode } = req.body;

//         if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ success: false, message: "Invalid userId" });
//         }

//         if (!pujaId || !mongoose.Types.ObjectId.isValid(pujaId)) {
//             return res.status(400).json({ success: false, message: "Invalid pujaId" });
//         }

//         if (!date || !time) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         if (!mode || mode.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: "Mode is required!",
//             });
//         }

//         // Combine date and time into a valid Date object
//         const dateA = new Date(date); // Date part
//         const [hours, minutes, seconds] = time.split(":").map(Number); // Extract time components
//         const combinedDateTime = new Date(dateA.setHours(hours, minutes, seconds));

//         const currentDateTime = new Date();
//         const timeDifference = (combinedDateTime - currentDateTime) / 1000;
//         const differenceInHours = timeDifference / (60 * 60);

//         if (differenceInHours < 5) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Time should be 5 hours greater than the current time",
//             });
//         }

//         // Find the Pooja
//         const puja = await Pooja.findOne({ _id: pujaId });
//         if (!puja) {
//             return res.status(404).json({ success: false, message: "Puja not found" });
//         }

//         // Create a new Pooja Order
//         const newPoojaOrder = new AstromallOrders({
//             customerId: userId,
//             poojaId: pujaId,
//             price: puja.price,
//             mode: mode,
//             poojaDate: date,
//             poojaTime: combinedDateTime, // Pass the combined Date object here
//         });

//         await newPoojaOrder.save();

//         return res.status(201).json({
//             success: true,
//             message: "Puja Request sent successfully",
//             order: newPoojaOrder,
//         });

//     } catch (error) {
//         console.error("Error booking puja:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to register puja",
//             error: error.message,
//         });
//     }
// };


// exports.allRequestedPuja = async (req, res)=>{
//     try{

//         const puja = await AstromallOrders.find({}).populate('customerId', 'customerName phoneNumber').populate('poojaId');
//         const filterPuja = puja.filter((item)=> item.status != 'ACCEPTED')
//         if(!puja){
//             return res.status(200).json({
//                 success: true,
//                 message: 'empty Data',
//                 results: puja
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'getting data successfully',
//             results: filterPuja
//         })

//     }

//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// }


// exports.pujaAssignToAstrologer = async (req, res)=>{
//     try{
//         const {id, astrologerId, price} = req.body;

//         if(!id || id == " "){
//             return res.status(400).json({
//                 success: false,
//                 message: 'id is required!'
//             })
//         }

//         if(!astrologerId || astrologerId == " "){
//             return res.status(400).json({
//                 success: false,
//                 message: 'astrologerId is required!'
//             })
//         }

//         if(!price || price == " "){
//             return res.status(400).json({
//                 success: false,
//                 message: 'price is required!'
//             })
//         }

//         const assignPuja = await AstromallOrders.findById({_id:id});
//         if(!assignPuja){
//             return res.status(400).json({
//                 success: false,
//                 message: 'please provide valid id'
//             })
//         }

//         assignPuja.astrologerId = astrologerId;
//         assignPuja.status = 'ACCEPTED'
//         assignPuja.price = price;
//         await assignPuja.save();

//         return res.status(200).json({
//             success: true,
//             message:"Assing puja successfully"
//         })

        
    
//     }

//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// }

// exports.changePujaStatus = async (req, res)=>{
//     try{

//         const {id, status} = req.body;
//         if(!id || id == " "){
//             return res.status(400).json({
//                 success: false,
//                 message: 'id is required!'
//             })
//         }

//         if(!status || status == " "){
//             return res.status(400).json({
//                 success: false,
//                 message: 'status is required!'
//             })
//         }

//         const puja = await AstromallOrders.findById({_id: id})

//         if(!puja){
//             return res.status(400).json({
//                 success: false,
//                 message: 'pooja not found'
//             })
//         }

//         if(status == "accepted"){
//             puja.status = "ACCEPTED";
//             puja.save();
//             return res.status(200).json({
//                 success: true,
//                 message: 'puja request accepted successfully'
//             })
//         }


//         if(status == "rejected"){
//             puja.status = "REJECTED";
//             puja.save();
//             return res.status(200).json({
//                 success: true,
//                 message: 'puja request rejected successfully'
//             })
//         }


//         return res.status(400).json({
//             success: false,
//             message: 'please provide valid status'
//         })

//     }

//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// }

// // exports.getAstrologerRegisteredPooja = async function (req, res) {
// //     try {
// //         const { astrologerId } = req.body;

// //         if (!astrologerId || !mongoose.Types.ObjectId.isValid(astrologerId)) {
// //             return res.status(400).json({ success: false, message: "Invalid astrologerId" });
// //         }

// //         const pooja = await AstromallOrders.find({ astrologerId }).populate('poojaId').populate({
// //             path: 'customerId',
// //             select: "customerName image gender address phoneNumber email"
// //         }).sort({ _id: -1 })

// //         return res.status(201).json({
// //             success: true,
// //             message: "success",
// //             pooja
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: "Failed to get pooja",
// //             error: error.message,
// //         });
// //     }
// // };


// exports.getAstrologerRegisteredPooja = async function (req, res) {
//     try {
//         const { astrologerId } = req.body;

//         if (!astrologerId || !mongoose.Types.ObjectId.isValid(astrologerId)) {
//             return res.status(400).json({ success: false, message: "Invalid astrologerId" });
//         }

//         const pooja = await AstromallOrders.find({ astrologerId, status: 'ACCEPTED' })
//             .populate('poojaId')
//             .populate({
//                 path: 'customerId',
//                 select: "customerName image gender address phoneNumber email"
//             })
//             .sort({ _id: -1 });

//         // Map the results to change _id to orderId
//         const formattedPooja = pooja.map(order => ({
//             orderId: order._id, // Rename _id to orderId
//             pujaDate: order.poojaDate,
//             pujaTime: order.poojaTime,
//             poojaId: order.poojaId,
//             customer: order.customerId,
//             // Add any other fields you want to include from the order
//         }));

//         return res.status(200).json({
//             success: true,
//             message: "success",
//             pooja: formattedPooja
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// };


// exports.getCustomerCompletePuja = async (req, res)=>{
//     try {
//         const { customerId } = req.body;

//         if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
//             return res.status(400).json({ success: false, message: "Invalid customerId" });
//         }

//         const pooja = await AstromallOrders.find({ customerId, status:'COMPLETED' })
//             .populate('poojaId')
//             .populate({
//                 path: 'customerId',
//                 select: "customerName image gender address phoneNumber email"
//             })
//             .sort({ _id: -1 });

//         // Map the results to change _id to orderId
//         const formattedPooja = pooja.map(order => ({
//             orderId: order._id, // Rename _id to orderId
//             pujaDate: order.poojaDate,
//             pujaTime: order.poojaTime,
//             status: order.status,
//             pujaCompleteDate: order.updatedAt,
//             images:order.images,
//             videos: order.videos,
//             poojaId: order.poojaId,
//             customer: order.customerId,
//             // Add any other fields you want to include from the order
//         }));

//         return res.status(200).json({
//             success: true,
//             message: "success",
//             pooja: formattedPooja
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// }


// exports.getPujaHistory = async (req, res)=>{
//     try{

//         const puja = await AstromallOrders.find({status: 'COMPLETED'}).populate('poojaId', 'pujaName description price image bannerImages').populate('astrologerId', 'astrologerName').populate('customerId', 'customerName');

//         if(!puja){
//             return res.status(404).json({
//                 success: false,
//                 message: 'Data not found'
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Getting history successfully',
//             results: puja
//         })

//     }

//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: 'Interanal server error'
//         })
//     }
// }


// exports.getAstrologerCompletePuja = async (req, res)=>{
//     try {
//         const { astrologerId } = req.body;

//         if (!astrologerId || !mongoose.Types.ObjectId.isValid(astrologerId)) {
//             return res.status(400).json({ success: false, message: "Invalid astrologerId" });
//         }

//         const pooja = await AstromallOrders.find({ astrologerId, status:'COMPLETED' })
//             .populate('poojaId')
//             .populate({
//                 path: 'customerId',
//                 select: "customerName image gender address phoneNumber email"
//             })
//             .sort({ _id: -1 });

//         // Map the results to change _id to orderId
//         const formattedPooja = pooja.map(order => ({
//             orderId: order._id, // Rename _id to orderId
//             pujaDate: order.poojaDate,
//             pujaTime: order.poojaTime,
//             status: order.status,
//             pujaCompleteDate: order.updatedAt,
//             images:order.images,
//             videos: order.videos,
//             poojaId: order.poojaId,
//             customer: order.customerId,
//             // Add any other fields you want to include from the order
//         }));

//         return res.status(200).json({
//             success: true,
//             message: "success",
//             pooja: formattedPooja
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }

// }


// exports.getAstrologerRequestedPooja = async function (req, res) {
//     try {
//         const orders = await AstromallOrders.find({ status: 'REQUESTED' })
//             .populate({
//                 path: 'astrologerId',
//                 select: 'astrologerName profileImage' // Assuming the astrologer model has 'name' and 'image' fields
//             })
//             .populate('poojaId').sort({ _id: -1 }); // Populate the entire pooja object

//         return res.status(201).json({
//             success: true,
//             message: "success",
//             orders
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// };


// exports.getCustomerPujaHistory = async (req, res) => {
//     try {
//         const { customerId } = req.body;

//         if (!customerId || customerId.trim() === "") {
//             return res.status(400).json({
//                 success: false,
//                 message: 'customerId is required!'
//             });
//         }

//         // Retrieve and sort puja history in descending order by pujaDate
//         const puja = await AstromallOrders.find({ customerId })
//             .populate('poojaId', 'pujaName description image bannerImages createdAt')
//             .populate('astrologerId', 'astrologerName phoneNumber gender email profileImage')
//             .sort({ pujaDate: -1 }); // Sort by pujaDate in descending order

//         if (!puja || puja.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Data not found"
//             });
//         }

//         // Get current date
//         const currentDate = new Date();

//         // Set status based on pujaDate and pujaTime, and prepare updates
//         const updatePromises = puja.map(async (order) => {
//             const pujaDate = new Date(order.poojaDate);
//             const pujaTime = new Date(order.poojaTime);
//             const newStatus = (pujaDate < currentDate || pujaTime < currentDate) && order.status !== 'ACCEPTED'
//                 ? 'EXPIRED'
//                 : order.status;

//             // Update the status in the database if it has changed
//             if (newStatus !== order.status) {
//                 order.status = newStatus; // Update local status
//                 return order.save(); // Save updated order to the database
//             }
//         });

//         // Wait for all updates to complete
//         await Promise.all(updatePromises);

//         // Prepare response with updated puja data
//         const updatedPuja = await AstromallOrders.find({ customerId })
//             .populate('poojaId', 'pujaName description image bannerImages createdAt')
//             .populate('astrologerId', 'astrologerName phoneNumber gender email profileImage')
//             .sort({ createdAt: -1 }); // Sort again if needed after updates

//         return res.status(200).json({
//             success: true,
//             message: "Getting data successfully",
//             results: updatedPuja
//         });

//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         return res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//     }
// }



// exports.getAstrologerRejectedPooja = async function (req, res) {
//     try {
//         const orders = await AstromallOrders.find({ status: 'REJECTED' })
//             .populate({
//                 path: 'astrologerId',
//                 select: 'astrologerName profileImage' // Assuming the astrologer model has 'name' and 'image' fields
//             })
//             .populate('poojaId').sort({ _id: -1 }); // Populate the entire pooja object

//         return res.status(201).json({
//             success: true,
//             message: "success",
//             orders
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// };

// exports.getCustomerAcceptedPooja = async function (req, res) {
//     try {
//         const orders = await AstromallOrders.find({ status: 'ACCEPTED' })
//             .populate({
//                 path: 'astrologerId',
//                 select: 'astrologerName profileImage' // Assuming the astrologer model has 'name' and 'image' fields
//             }).populate({
//                 path: 'customerId',
//                 select: 'customerName, image'
//             })
//             .populate('poojaId').sort({ _id: -1 }); // Populate the entire pooja object

//         return res.status(201).json({
//             success: true,
//             message: "success",
//             orders
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// };

// exports.getAstrolgoersPooja = async function (req, res) {
//     try {
//         const { poojaId } = req.body
//         const orders = await AstromallOrders.find({ poojaId, status: 'ACCEPTED' })
//             .populate({
//                 path: 'astrologerId',
//                 select: 'astrologerName profileImage' // Assuming the astrologer model has 'name' and 'image' fields
//             })
//             .populate('poojaId').sort({ _id: -1 }); // Populate the entire pooja object

//         return res.status(201).json({
//             success: true,
//             message: "success",
//             orders
//         });

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// };

// exports.getCustomerBookedPooja = async function (req, res) {
//     try {
//         const orders = await AstromallOrders.find({ status: 'ACCEPTED' })
//             .populate({
//                 path: 'astrologerId',
//                 select: 'astrologerName profileImage' // Assuming the astrologer model has 'name' and 'image' fields
//             }).populate({
//                 path: 'customerId',
//                 select: 'customerName image'
//             })
//             .populate('poojaId').sort({ _id: -1 }); // Populate the entire pooja object

//         return res.status(200).json({
//             success: true,
//             message: "success",
//             orders
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// };




// exports.updateAstrologerPoojaStatus = async function (req, res) {
//     try {
//         const { status, orderId } = req.body

//         if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
//             return res.status(400).json({ success: false, message: "Invalid orderId" });
//         }

//         if (!['ACCEPTED', 'REJECTED'].includes(status)) {
//             return res.status(200).json({ success: false, message: 'status should be ACCEPTED Or REJECTED' });
//         }

//         const pooja = await AstromallOrders.findById(orderId)

//         if (!pooja) {
//             return res.status(404).json({ success: false, message: "Pooja not found" });
//         }

//         pooja.status = status
//         await pooja.save()

//         return res.status(201).json({
//             success: true,
//             message: "Status updated successfully",
//             pooja
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update pooja status pooja",
//             error: error.message,
//         });
//     }
// };

// exports.orderAstrologerPooja = async function (req, res) {
//     try {
//         const { customerId, orderId } = req.body

//         if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
//             return res.status(400).json({ success: false, message: "Invalid orderId" });
//         }

//         if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
//             return res.status(400).json({ success: false, message: "Invalid customerId" });
//         }

//         const pooja = await AstromallOrders.findById(orderId)

//         if (!pooja) {
//             return res.status(404).json({ success: false, message: "Pooja not found" });
//         }

//         if (pooja?.status != 'ACCEPTED') {
//             return res.status(200).json({ success: false, message: 'This order already booked' });
//         }

//         pooja.customerId = customerId,
//             pooja.status = 'BOOKED'

//         await pooja.save()

//         return res.status(201).json({
//             success: true,
//             message: "Order Booked Successfully",
//             pooja
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update pooja status pooja",
//             error: error.message,
//         });
//     }
// };

// exports.completedPooja = async function (req, res) {
//     try {
//         // Fetch orders with status "COMPLETED"
//         const completedOrders = await AstromallOrders.find({ status: 'COMPLETED' });
//         // Send the fetched orders as a response
//         res.json(completedOrders);
//     } catch (error) {
//         // Handle any errors that occur during the fetching process
//         res.status(500).json({ message: 'Error fetching completed orders', error });
//     }
// };

// exports.orderHistory = async function (req, res) {
//     try {
//         // Fetch orders with status "COMPLETED"
//         //   const orderHistory = await ProductOrder.find()

//         const orderHistory = await ProductOrder.find()
//             .populate('customerId') // Populates customer details
//             .populate('products.productId'); // Populates product details for each product in the order


//         // Send the fetched orders as a response
//         res.json({ success: true, data: orderHistory });
//     } catch (error) {
//         // Handle any errors that occur during the fetching process
//         res.status(500).json({ message: 'Error fetching product orders', error });
//     }
// };

// exports.updateProductOrderStatus = async function (req, res) {
//     try {
//         const { status, orderId } = req.body

//         if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
//             return res.status(400).json({ success: false, message: "Invalid orderId" });
//         }

//         const productOrder = await ProductOrder.findById(orderId)

//         if (!productOrder) {
//             return res.status(404).json({ success: false, message: "product order not found" });
//         }

//         productOrder.status = status
//         await productOrder.save()

//         return res.status(201).json({
//             success: true,
//             message: "Status updated successfully",
//             productOrder
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update product Order status",
//             error: error.message,
//         });
//     }
// };

// exports.getProductOrderHistory = async function (req, res) {
//     try {
//         const { customerId } = req.body;

//         if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
//             return res.status(400).json({ success: false, message: "Invalid customerId" });
//         }

//         const getProductOrder = await ProductOrder.find({ customerId });

//         return res.status(201).json({
//             success: true,
//             message: "success",
//             getProductOrder
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get Product Order",
//             error: error.message,
//         });
//     }
// };


// exports.completeAstrologerPooja = function (req, res) {
//     uploadPoojaImagesVideos(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Multer error", error: err });
//         } else if (err) {
//             return res
//                 .status(500)
//                 .json({ success: false, message: "Error uploading file", error: err });
//         }

//         try {
//             const { orderId, description } = req.body;

//             if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
//                 return res.status(400).json({ success: false, message: "Invalid orderId" });
//             }

//             const pooja = await AstromallOrders.findById(orderId)

//             if (!pooja) {
//                 return res.status(404).json({ success: false, message: "Pooja not found" });
//             }

//             let poojaImages = [];
//             const imagesData = req.files["images"] ?? null;
//             if (!!imagesData) {
//                 poojaImages = imagesData.map((item, index) => {
//                     return req.files["images"][index].path.replace(
//                         /^.*astromall[\\/]/,
//                         "uploads/astromall/"
//                     );
//                 })
//             }

//             let poojaVideos = [];
//             const videosData = req.files["videos"] ?? null;
//             if (!!videosData) {
//                 poojaVideos = videosData.map((item, index) => {
//                     return req.files["videos"][index].path.replace(
//                         /^.*astromall[\\/]/,
//                         "uploads/astromall/"
//                     );
//                 })
//             }

//             pooja.images = poojaImages
//             pooja.videos = poojaVideos
//             pooja.description = description
//             pooja.status = 'COMPLETED'

//             await pooja.save()

//             res.status(200).json({
//                 success: true,
//                 message: "Pooja Completed",
//                 data: pooja,
//             });
//         } catch (error) {
//             console.error("Error uploading product category:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Failed to upload product category.",
//                 error: error.message,
//             });
//         }
//     });
// };

// exports.getCustoemerBookedPooja = async function (req, res) {
//     try {
//         const { customerId } = req.body;

//         if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
//             return res.status(400).json({ success: false, message: "Invalid customerId" });
//         }

//         const pooja = await AstromallOrders.find({ customerId }).populate('poojaId').populate({
//             path: 'astrologerId',
//             select: "astrologerName profileImage"
//         })

//         return res.status(201).json({
//             success: true,
//             message: "success",
//             pooja
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get pooja",
//             error: error.message,
//         });
//     }
// };

// exports.createAddressCart  = async(req,res) => {
//     try {
//         const {name, phone, pincode, state, city, houseno, area, select,customerId} = req.body;

//         if(!name && !phone && !pincode && !state && !city && !houseno && !area && !select) {
//             return res.status(400).json({ success: false, message: "All required"});
//         }

//         const address = new AddressCarts({
//             customerId,
//             name,
//             phone,
//             pincode,
//             state,
//             city,
//             house: houseno,
//             area,
//             select
//         });

//         const Address = await address.save();

//         if(Address) {
//             return res.status(200).json({ success: true, message: "Created Successfully", data: address});
//         } else {
//             return res.status(404).json({ success: false, message:" Created Not successfully"});
//         }

//     } catch(e) {
//         console.log(e);
//         return res.status(500).json({ success:false, message: e.message});
//     }
// };

// exports.UpdateAddressCart = async(req,res) => {
//     try {
//         const {name, phone, pincode, state, city, houseno, area, select,id} = req.body;

//         if(!name && !phone && !pincode && !state && !city && !houseno && !area && !select) {
//             return res.status(400).json({ success: false, message: "All required"});
//         }

//         const address = await AddressCarts.findById(id)
// ;

//         if(!address) {
//             return res.status(404).json({ success: false, message: "Address Not found"});
//         }

//         address.name = name;
//         address.phone = phone;
//         address.pincode = pincode;
//         address.state = state;
//         address.city = city;
//         address.house = houseno;
//         address.area = area;
//         address.select = select;
               
//         await address.save(); 
       
//             return res.status(200).json({ success: true, message: "Updated Successfully", data: address});
       
//     } catch(e) {
//         console.log(e);
//         return res.status(500).json({ success: false, message: e.message});
//     }
// };

// exports.DeleteAddressCart = async(req,res) => {
//     try {
//         const { id} = req.body;
//         if(!id) {
//             res.status(400).json({ success: false, message: "Requred!!"});
//         }

//         const address = await AddressCarts.findByIdAndDelete(id)
// ;
//         if(address) {
//             return res.status(200).json({ success: true, message: "Deleted Successfully!!"});
//         }
//     } catch(e) {
//         console.log(e);
//         res.status(500).json({ success: false, message: e.message});
//     }
// };

// exports.GetAddressCart = async(req,res) => {
//     try {
//         const {customerId} = req.body;
//         if(!customerId) {
//             return res.status(400).json({ success: false, message: "Customer Id is Required."});
//         }

//         const AddressData = await AddressCarts.find({ customerId });
//         if(AddressData.length == 0 ){
//             return res.status(200).json({ success: true, message: "Address is Not found", data: []});
//         }

//         return res.status(200).json({ success: true, message: "Address data Successfully", data: AddressData });
//     } catch(e) {
//         console.log(e);
//         return res.status(500).json({ success: false, message: e.message});
//     }
// }


const mongoose = require("mongoose");
const EcommerceCategory = require('../models/ecommerceModel/EcommerceCategory');
const Product = require('../models/ecommerceModel/Product');
const Cart = require('../models/ecommerceModel/Cart');
const configureMulter = require('../configureMulter');
const AddressCarts = require('../models/ecommerceModel/AddressCarts');
const Razorpay = require('razorpay');
const EcommerceOrder = require('../models/ecommerceModel/EcommerceOrder');
const ProductOrder = require('../models/ecommerceModel/ProductOrder');
const validator = require('validator');
const { uploadFileToS3 } = require("../utils/amazonS3Service");
const multer = require("multer");
const storage = multer.memoryStorage();

const uploadCategoryImage = multer({ storage }).fields([
  { name: 'image', maxCount: 1 }
]);

// Configure Multer to handle both 'image' and 'bannerImage' fields
const uploadProductImage =  multer({ storage }).fields([
    { name: "image", maxCount: 1 },  // Main image (single image)
    { name: "bannerImage", maxCount: 5 },  // Banner images (up to 5)
  ]);
  

// Create a new category
exports.createCategory = async (req, res) => {
  uploadCategoryImage(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { categoryName , description, description_hi } = req.body;
      if (!categoryName) {
        return res.status(400).json({ success: false, message: "Category name is required!" });
      }

      // Check if category already exists
      const existingCategory = await EcommerceCategory.findOne({ categoryName });
      if (existingCategory) {
        return res.status(400).json({ success: false, message: "Category already exists!" });
      }

      // Handle category image if uploaded
      const imagePath = req.files["image"] ? req.files["image"][0] : null;

       const uploadS3 = await uploadFileToS3(imagePath, "ecommerceImage");

      const newCategory = new EcommerceCategory({
        categoryName,
        description,
        description_hi,
        image: uploadS3,
      });

      await newCategory.save();

      return res.status(201).json({
        success: true,
        message: "Category created successfully!",
        data: newCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create category.",
        error: error.message,
      });
    }
  });
};



// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
      const categories = await EcommerceCategory.find();
      return res.status(200).json({
        success: true,
        message: "Categories fetched successfully.",
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories.",
        error: error.message,
      });
    }
  };
  


  // Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
      const category = await EcommerceCategory.findById(req.params.categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Category fetched successfully.",
        data: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch category.",
        error: error.message,
      });
    }
  };

  

  // Update a category
exports.updateCategory = async (req, res) => {
    uploadCategoryImage(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: "Error uploading file", error: err });
      }
  
      try {
        const { categoryId, categoryName, description, description_hi } = req.body;
  
        const category = await EcommerceCategory.findById(categoryId);
        if (!category) {
          return res.status(404).json({ success: false, message: "Category not found." });
        }

        if( category.categoryName != 'E_Puja') category.categoryName = categoryName;
      
  
        // Update image if uploaded
        if (req.files["image"]) {
          const imagePath = req.files["image"][0];
          const uploadS3 = await uploadFileToS3(imagePath, "ecommerceImage");
          category.image = uploadS3;
        }
        
        category.description = description;
        category.description_hi = description_hi;

        await category.save();
  
        return res.status(200).json({
          success: true,
          message: "Category updated successfully.",
          data: category,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to update category.",
          error: error.message,
        });
      }
    });
  };

  exports.getProudctsByCategoryId = async(req, res) => {
    try {
      const {categoryId } = req.body;

      if(!categoryId) {
        return res.status(400).json({ success: false, message: "Cateogory is Required!"});
      }

      const product = await Product.find({ category : categoryId}).populate('category');

      if(!product) {
        return res.status(200).json({ success: false, message:"Product Not found"});
      }

      return res.status(200).json({ success: true, message:"Data Fetched Successfully", product});
    } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to update category.",
          error: error.message,
        });
      }
  }

  

  // Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
      const category = await EcommerceCategory.findByIdAndDelete(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found." });
      }
  
      return res.status(200).json({
        success: true,
        message: "Category deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete category.",
        error: error.message,
      });
    }
  };



// Add a new product
exports.addProduct = async (req, res) => {
    uploadProductImage(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ success: false, message: "Error uploading file", error: err });
      }
  
      try {
        const { name, description,description_hi, price, category, quantity, adminCommissionPercentage } = req.body;
  
        // Validate required fields
        if (!name || name.trim() === "" || !description || description.trim() === "" || !price || !category) {
          return res.status(400).json({ success: false, message: "All fields are required!" });
        }
  
        // Check if category exists
        const existingCategory = await EcommerceCategory.findById(category);
        if (!existingCategory) {
          return res.status(400).json({ success: false, message: "Category not found!" });
        }
  
        // Handle product image if uploaded
        const imagePath = req.files["image"] ? req.files["image"][0] : null;
         const uploadS3 = await uploadFileToS3(imagePath, "ecommerceImage");
        // Handle banner images if uploaded
        // const bannerImagePaths = req.files["bannerImage"] ? req.files["bannerImage"].map(file => file.path.replace(/^.*uploads[\\/]/, "uploads/")) : [];
        
        let bannerImagePaths = [];
        if (req.files["bannerImage"] && req.files["bannerImage"].length > 0) {
          bannerImagePaths = await Promise.all(
            req.files["bannerImage"].map(async (file) => {
              return await uploadFileToS3(file, "ecommerceImage/banners");
            })
          );
        }

        const newProduct = new Product({
          name,
          description,
          description_hi,
          price,
          category,
          quantity,
          image: uploadS3 || null,  // If no image uploaded, default to null
          bannerImage: bannerImagePaths,  // Store multiple banner images
          adminCommissionPercentage
        });
  
        // Save the product to the database
        await newProduct.save();
  
        return res.status(201).json({
          success: true,
          message: "Product created successfully!",
          data: newProduct,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to create product.",
          error: error.message,
        });
      }
    });
  };



  // Get all products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({}).populate('category');  // Populate category data
      return res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch products.",
        error: error.message
      });
    }
  };

  

  // Get product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    
    try {
      const product = await Product.findById(id).populate('category');
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found!"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch product.",
        error: error.message
      });
    }
  };

  

  // Update product
exports.updateProduct = async (req, res) => {
  // Use multer upload handler
  uploadProductImage(req, res, async function (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: err,
      });
    }

    try {
      const { id } = req.params;
      const { name, description, description_hi, price, category, quantity, adminCommissionPercentage } = req.body;

      // Find the existing product
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ success: false, message: "Product not found!" });
      }

      // Update simple fields only if provided
      existingProduct.name = name ?? existingProduct.name;
      existingProduct.description = description ?? existingProduct.description;
      existingProduct.description_hi = description_hi ?? existingProduct.description_hi;
      existingProduct.price = price ?? existingProduct.price;
      existingProduct.category = category ?? existingProduct.category;
      existingProduct.quantity = quantity ?? existingProduct.quantity;

      // Update admin commission safely
      if (adminCommissionPercentage !== undefined && adminCommissionPercentage !== null && adminCommissionPercentage !== "null") {
        const parsedCommission = Number(adminCommissionPercentage);
        if (!isNaN(parsedCommission)) {
          existingProduct.adminCommissionPercentage = parsedCommission;
        }
      }

      // Upload and update main product image if provided
      if (req.files?.image?.length > 0) {
        const imageFile = req.files.image[0];
        const uploadS3 = await uploadFileToS3(imageFile, "ecommerceImage");
        existingProduct.image = uploadS3;
      }

      // Upload and update banner images if provided
      if (req.files?.bannerImage?.length > 0) {
        const bannerImagePaths = await Promise.all(
          req.files.bannerImage.map(async (file) => {
            return await uploadFileToS3(file, "ecommerceImage/banners");
          })
        );
        existingProduct.bannerImage = bannerImagePaths;
      }

      // Save updates
      await existingProduct.save();

      return res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: existingProduct,
      });

    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update product.",
        error: error.message,
      });
    }
  });
};


  

  // Delete product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const existingProduct = await Product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ success: false, message: "Product not found!" });
      }
  
      // Delete the product
      await Product.findByIdAndDelete(existingProduct._id);
  
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully!"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete product.",
        error: error.message
      });
    }
  };



  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found." });
      }
  
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  };



// Add product to cart
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity, time, date } = req.body;  // Extract userId, productId, and quantity

  try {
    // Validate inputs
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'User ID, product ID, and quantity are required.'
      });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists for the user, create a new cart
      cart = new Cart({
        user: userId,
        items: [{
          product: productId,
          quantity,
          price: product.price,
          time,
          date,
        }],
        totalAmount: product.price * quantity
      });
    } else {
      // If cart exists, check if product is already in the cart
      const productIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());

      if (productIndex > -1) {
        // Product exists, update the quantity
        cart.items[productIndex].quantity += quantity;
      } else {
        // Product does not exist in the cart, add a new product
        cart.items.push({
          product: productId,
          quantity,
          price: product.price,
          time,
          date
        });
      }

      // Recalculate totalAmount
      cart.totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: 'Product added to cart successfully.',
      data: cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add product to cart.',
      error: error.message
    });
  }
};

  
  
// Get user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(200).json({
        success: false,
        message: 'Cart not found.',
        data: { items: [] }
      });
    }

    // filter out deleted products (null populated refs)
    cart.items = cart.items.filter(item => item.product !== null);

    // save cart back to remove invalid references
    await cart.save();

    return res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch cart.',
      error: error.message
    });
  }
};


  

  // Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(200).json({
        success: false,
        message: 'Cart not found.'
      });
    }
    console.log("Cart items:", cart.items);
console.log("ProductId to remove:", productId);


    // Find the product index
    const productIndex = cart.items.findIndex(
  item => item.product && item.product.toString() === productId.toString()
);

    if (productIndex === -1) {
      return res.status(200).json({
        success: false,
        message: 'Product not found in cart.'
      });
    }

    // Remove the product
    cart.items.splice(productIndex, 1);

    // Recalculate total
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    // Option A: If no items left, reset cart instead of saving empty
    if (cart.items.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.status(200).json({
        success: true,
        message: 'Product removed. Cart is now empty.',
        data: null
      });
    }

    // Option B: Otherwise, save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: 'Product removed from cart.',
      data: cart
    });
  } catch (error) {
    console.log('error',error)
    return res.status(500).json({
      success: false,
      message: 'Failed to remove product from cart.',
      error: error.message
    });
  }
};

  
  exports.updateCartQuantity = async (req, res) => {
    const { userId, productId, quantityChange } = req.body;  

    try {
        if (!userId || !productId || quantityChange === undefined) {
            return res.status(400).json({
                success: false,
                message: 'User ID, product ID, and quantity change are required.'
            });
        }

        if (isNaN(quantityChange)) {
            return res.status(400).json({
                success: false,
                message: 'Quantity change must be a valid number.'
            });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found.'
            });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart.'
            });
        }

        // Get the current quantity
        const currentQuantity = cart.items[productIndex].quantity;
        let newQuantity = currentQuantity + quantityChange;

        if (newQuantity <= 0) {
            // Remove product from cart
            cart.items.splice(productIndex, 1);
        } else {
            // Update the quantity
            cart.items[productIndex].quantity = newQuantity;
        }

        // Recalculate the total amount
        cart.totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: newQuantity <= 0 ? 'Product removed from cart.' : 'Product quantity updated successfully.',
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update cart quantity.',
            error: error.message
        });
    }
};

  

// Add Address to Cart
exports.addAddress = async (req, res) => {
  const { customerId, name, phone, pincode, state, city, house, area, select } = req.body;
 

  try {
    // Validate required fields
    if (!customerId || !name || !phone || !pincode || !state || !city || !house || !area) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required!',
      });
    }

    // Validate phone number (10-digit Indian format)
    if (!validator.isMobilePhone(phone, "en-IN")) {
      return res.status(200).json({
        success: false,
        message: "Invalid phone number! Please enter a valid 10-digit number.",
      });
    }

    // Validate Pincode (should be 6 digits)
    if (!validator.isLength(pincode, { min: 6, max: 6 }) || !validator.isNumeric(pincode)) {
      return res.status(200).json({
        success: false,
        message: "Invalid Pincode! It should be a 6-digit number.",
      });
    }

    // Validate Name (only alphabets, no special characters or numbers)
    if (!validator.isAlpha(name.replace(/\s/g, ""), "en-US")) {
      return res.status(200).json({
        success: false,
        message: "Invalid name! Only alphabets are allowed.",
      });
    }

    if(!validator.isNumeric(house)) {
      return res.status(200).json({
        success: false,
        message: "Invalid House/Flat Number",
      })
    }

    console.log(req.body);

    // Create a new address object
    const newAddress = new AddressCarts({
      customerId,
      name,
      phone,
      pincode,
      state,
      city,
      house,
      area,
      select,
    });

    // Save the address to the database
    await newAddress.save();

    return res.status(201).json({
      success: true,
      message: 'Address added successfully!',
      data: newAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add address.',
      error: error.message
    });
  }
};


// Get all addresses for a customer
exports.getAllAddresses = async (req, res) => {
  const { customerId } = req.params;

  try {
    // Fetch all addresses of the customer
    const addresses = await AddressCarts.find({ customerId });

    if (!addresses.length) {
      return res.status(200).json({
        success: false,
        message: 'No addresses found for this customer.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Addresses retrieved successfully!',
      data: addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve addresses.',
    });
  }
};


// Update an address in the customer's address cart
exports.updateAddress = async (req, res) => {
  const { addressId, name, phone, pincode, state, city, house, area, select } = req.body;

  try {
    // Find the address by addressId
    const address = await AddressCarts.findById(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.',
      });
    }

    // Update the address fields
    address.name = name || address.name;
    address.phone = phone || address.phone;
    address.pincode = pincode || address.pincode;
    address.state = state || address.state;
    address.city = city || address.city;
    address.house = house || address.house;
    address.area = area || address.area;
    address.select = select || address.select;

    // Save the updated address
    await address.save();

    return res.status(200).json({
      success: true,
      message: 'Address updated successfully!',
      data: address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update address.',
    });
  }
};


// Delete an address from the cart
exports.deleteAddress = async (req, res) => {
  const { addressId } = req.body;

  try {
    // Find and delete the address by addressId
    const deletedAddress = await AddressCarts.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: 'Address not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Address deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete address.',
    });
  }
};

exports.razorpayCart = async(req,res) => {
  try {

    const {userId,cartId, addressId, amount } = req.body;

    if(!userId && !cartId && !addressId && !amount) {
      return res.status(400).json({ success: false, message: "user Id , cart Id, address Id and amount is Required!"});
    }

    // var instance = new Razorpay({
    //   key_id: 'rzp_live_oTDlfILa14R5io',
    //   key_secret: 'CzEBpcn7tNkVQVk4GxkjM5DM'
    // });

    var instance = new Razorpay({
      key_id: 'rzp_live_fycM10IO0gAtF9', // Replace with your Razorpay Key
      key_secret: 'MjuXvZiu60d6BXwqgr2SDXNW', // Replace with your Razorpay Secret Key
    });
    
    const response = await instance.orders.create({
      "amount": amount * 100,
      "currency": "INR",
    })

    console.log(response, "check responseee")

    if (response?.status == 'created') {
      const OrderEcommerce = new EcommerceOrder({
        userId,
        cartId,
        addressId,
        amount,
        orderId: response.id,
      });

      await OrderEcommerce.save();

      return res.status(200).json({ success: true, data: response })
    }

    return res.status(200).json({ success: false, message: "Order not created", })

  } catch(e) {
    return res.status(500).json({
      success: false,
      message: "Failed Razorpay Payment",
      error: e.message
    })
  }
}


exports.productOrder = async(req,res) => {
  try {

    const { razorpay_order_id, razorpay_payment_id,razorpay_signature } = req.body;

    var instance = new Razorpay({
      key_id: 'rzp_live_fycM10IO0gAtF9',
      key_secret: 'MjuXvZiu60d6BXwqgr2SDXNW'
    });

    const paymentDetails = await instance.payments.fetch(razorpay_payment_id);

    if (paymentDetails?.status === 'captured') { 

      const order = await EcommerceOrder.findOne({ orderId:paymentDetails?.order_id}).populate('cartId');
      console.log('Order ::: ', order);
      if(!order || !mongoose.Types.ObjectId.isValid(order.cartId._id)) {
        return res.status(404).json({ success: false, message: "Ecommerce Order Not Found"});
      }
      console.log('Order :: ',order);
      const cart = await Cart.findById(order.cartId._id);

      if(!cart) {
        return res.status(404).json({ success: false, message:"Cart Not Found"});
      }

      const Product = await ProductOrder({
        customerId : order.userId,
        invoiceId: paymentDetails.order_id,
        amount: order.amount,
        items: cart.items,
        addressId: order.addressId,
      });

      await Product.save();

      await cart.deleteOne();

      return res.status(200).json({ success: true, message: "Payment SuccessFully"});

    }
    else {
      return res.status(200).json({ success: false, message: "Payment Failed" });
    }

  } catch(e) {
    return res.status(500).json({ success: false, message: "Failed Product Order", error: e.message });
  }
}


exports.productOrderHistory = async(req,res) => {
  try {
    const {customerId} = req.body;
    if(!customerId) {
      return res.status(400).json({ success: false, message: "Customer Id is Required!"});
    }

    const OrderHistory = await ProductOrder.find({ customerId }).populate('items.product').populate('addressId').sort({ createdAt: -1});
    if(!OrderHistory) {
      return res.status(400).json({ success: false, message:"Order History Not Found"});
    }

    return res.status(200).json({ success: true, message: " Order History Fetch SuccessFully" , data: OrderHistory});
  } catch(e) {
    return res.status(500).json({
      success: false,
      message: "Failed Product Order History",
      error: e.message,
    })
  }
}

// new api
exports.productStatusUpdate = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Required!!" });
    }

    const order = await ProductOrder.findOne({ invoiceId: orderId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order History not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Successfully updated status",
      data: order
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Failed Product Status Update",
      error: e.message,
    });
  }
};






