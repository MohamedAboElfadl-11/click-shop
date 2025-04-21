import ProductModel from "../../../Database/Models/product.model.js";

// search by name
export const searchByName = async (req, res) => {

    const { productname } = req.query;

    const product = await ProductModel.findOne({ slug: productname.toLowerCase() })

    if (!product) return res.status(404).json({ message: 'product not found' })

    res.status(200).json({ product })
}