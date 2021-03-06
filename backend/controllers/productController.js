import { request } from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  var sort = ''
  if (req.query.sort)
    sort = JSON.parse(req.query.sort)
  else
    sort = JSON.parse('{ "createdAt": -1 }')

  // console.log(req.query.sort)

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .sort(sort)
    .limit(pageSize).skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })

  // res.json(products)
})


const getTopProducts = asyncHandler(async (req, res) => {

  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword }).sort({ rating: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  // console.log(products)
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

const getProductsOnSale = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Product.countDocuments({ 'onSale.isOnSale': true, ...keyword })

  // console.log(count)
  const products = await Product.find({ 'onSale.isOnSale': true, ...keyword }).sort({ 'onSale.salePercent': -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  // res.json({ products, page, pages: Math.ceil(count / pageSize) })

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    gallery: [{ 'name': '/images/sample.jpg', 'isThumbail': 'true' }],
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: {
    },
    onSale: {
      isOnSale: false,
      salePercent: 0,
      startDate: Date.now(),
      endDate: Date.now()
    }
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    gallery,
    brand,
    category,
    countInStock,

  } = req.body

  // console.log(description)

  const product = await Product.findById(req.params.id)

  if (product) {

    // console.log(product)
    product.name = name
    product.price = price
    // product.description = undefined
    product.description = description
    product.image = image
    product.gallery = gallery
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


const updateProductOnSale = asyncHandler(async (req, res) => {
  const { onSale } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {

    onSale.startDate = new Date(onSale.startDate + ' 00:00:00')
    onSale.endDate = new Date(onSale.endDate + ' 23:59:59')
    console.log(onSale)
    product.onSale = onSale
    // product.onSale.endDate = (new Date(onSale.endDate+' 23:59:59')).getTime()

    const updateProduct = await product.save()
    res.json(updateProduct)
  }
  else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {

    const orders = await Order.find({ user: req.user._id, orderItems: { $elemMatch: { product: req.params.id } } })

    if (!orders) {
      res.status(400)
      throw new Error('Qu?? kh??ch kh??ng th??? ????nh gi?? khi ch??a mua s???n ph???m')
    }
    else {
      // const alreadyReviewed = product.reviews.find(
      //   (r) => r.user.toString() === req.user._id.toString()
      // )
      var count = 0;
      product.reviews.map((entry) => {
        if (entry.user.toString() === req.user._id.toString()) {
          count++
        }
      })
      // console.log(count)
      if (count >= orders.length) {
        res.status(400)
        throw new Error('Qu?? kh??ch ???? ????nh gi?? s???n ph???m')
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }

      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()
      res.status(201).json({ message: 'Review added' })
    }

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})




export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  updateProductOnSale,
  getProductsOnSale
}


