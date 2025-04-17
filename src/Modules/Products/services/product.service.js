import ProductModel from "../../../Database/Models/product.model.js";

// add product to brand store
export const addProductService = async (req, res) => {

    const productData = req.body;

    const isProductNameExist = await ProductModel.findOne({ name: productData.name })
    if (isProductNameExist) return res.status(409).json({ message: 'Product already exist' })

    await ProductModel.create(productData)
    res.status(201).json({ message: 'product added successfully' });
}

// update product data
export const updateProductService = async (req, res) => {

    const { productID } = req.params;
    const product = await ProductModel.findById(productID)

    if (!product) return res.status(404).json({ message: 'product not found' })

    const updatedData = req.body;

    if (updatedData.name) {
        const isProductNameExist = await ProductModel.findOne({ name: updatedData.name })
        if (isProductNameExist) return res.status(409).json({ message: 'Product name already exist' })
    }

    const allowedUpdates = ['description', 'price', 'brand', 'stock']
    allowedUpdates.forEach(element => {
        if (updatedData[element]) {
            product[element] = updatedData[element]
        }
    })

    const updatedProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        stock: product.stock
    }

    await product.save()

    res.status(200).json({ message: 'product updated successfully', updatedProduct })
}

// search by name
export const searchByName = async (req, res) => {

    const { productname } = req.query;

    const product = await ProductModel.findOne({ name: productname })
    if (!product) return res.status(404).json({ message: 'product not found' })

    res.status(200).json({ product })
}