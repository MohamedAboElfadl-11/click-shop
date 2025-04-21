import { cloudinary } from "../../../Config/cloudinary.config.js";
import ProductModel from "../../../Database/Models/product.model.js";
import slugify from "slugify";

// add product to store
export const addProductService = async (req, res) => {

    const productData = req.body;

    const files = req.files?.images;

    const isProductNameExist = await ProductModel.findOne({ name: productData.name })

    if (isProductNameExist) return res.status(409).json({ message: 'Product already exist' })

    if (!files || files.length === 0) return res.status(400).json({ message: "Images are required" })

    const images = [];

    for (const file of files) {
        const { secure_url, public_id } = await cloudinary().uploader.upload(

            file.path,
            {
                folder: `${process.env.CLOUDINARY_FOLDER}/Products`,
                resource_type: 'image'
            }
        );

        images.push({ secure_url, public_id });
    }

    productData.image = images;

    productData.slug = slugify(productData.name, { lower: true });

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

// delete product 
export const deleteProductService = async (req, res) => {

    const { productID } = req.params;

    const product = await ProductModel.findById(productID)

    if (!product) return res.status(404).json({ message: 'product not found' })

    if (product.image && product.image.length > 0) {
        for (const img of product.image) {
            await cloudinary().uploader.destroy(img.public_id);
        }
    }

    await ProductModel.deleteOne({ _id: productID })

    res.status(200).json({ message: 'product deleted successfully' })

}