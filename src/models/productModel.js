const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    producDetials: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productSize: [{
        type: String,
        required: true
    }],
    productMainImage: {
        type: String,
        required: true
    },
    productImages: {
        type: [String],
        required: true
    },
});



const Product = mongoose.model('Product', productSchema);

module.exports = Product;