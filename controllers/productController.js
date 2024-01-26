const Product = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
