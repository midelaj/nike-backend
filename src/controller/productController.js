const fs = require('fs');
const path = require('path');
const Product = require('../models/productModel');


const addProduct = async (req, res) => {
    try {
        const mainImage = req.files['mainImage'] ? req.files['mainImage'][0].filename : null;
        const detailImage = req.files['images'] ? req.files['images'].map(file => file.filename) : [];
        console.log(req.files);

        const product = new Product({
            productName: req.body.name,
            producDetials: req.body.details,
            productSize: req.body.size,
            productPrice:req.body.price,
            productMainImage: mainImage,
            productImages: detailImage
        });

        const newProduct = await product.save();

        res.json(newProduct);


    } catch (error) {
        console.log(error);

    }
}

const showAllProduct = async (req, res) => {
    try {
        const product = await Product.find();


        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'server Error',
            error: error.message
        });
    }
}

const showProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        console.log(product);

        if (!product) res.status(404).json({ success: false, message: 'product no found' });

        res.status(200).json({ success: true, data: product })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id; // Get the product ID from the request params

        // Find the product by ID
        const product = await Product.findById(productId);

        // If the product is not found
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Delete the main image
        const mainImagePath = path.join(__dirname, '../assets', product.productMainImage);
        if (fs.existsSync(mainImagePath)) {
            fs.unlink(mainImagePath, (err) => {
                if (err) {
                    console.error('Error deleting main image:', err.message);
                }
            });
        }

        // Delete the detail images
        product.productImages.forEach(image => {
            const imagePath = path.join(__dirname, '../assets', image);
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting detail image:', err.message);
                    }
                });
            }
        });

        // Delete the product from the database
        await product.remove();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Product and its images deleted successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};



module.exports = { addProduct, showAllProduct, showProduct, deleteProduct }