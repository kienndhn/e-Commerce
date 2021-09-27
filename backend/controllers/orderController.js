import axios from 'axios'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import MoMo from '../models/momoModel.js'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'

import crypto from 'crypto'
// @desc    Create new order
// @route   POST /api/orders
// @access  Private


const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  const items = []

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    //console.log(createdOrder)
    res.status(201).json(createdOrder)


  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  //console.log(order)
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    console.log(req.body)
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)

  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


// @desc    Update order to cancel
// @route   put /api/orders/:id/cancel
const updateOrderToCancel = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {

    order.status = 'canceled'

    order.orderItems.forEach(async (element) => {
      const item = await Product.findById(element.product)
      item.countInStock += element.qty
      item.countSold -= element.qty
      const updateItem = await item.save()

    })

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to comfirm
// @route   put /api/orders/:id/confirm 
// @access  Private/Admin
const updateOrderToConfirm = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.status = 'confirmed'

    order.orderItems.forEach(async (element) => {
      const item = await Product.findById(element.product)
      if (item.countInStock > element.qty) {
        item.countInStock -= element.qty
        item.countSold += element.qty
        const updateItem = await item.save()
      }
      else {
        element.qty = int(item.countInStock * 0.5)
        item.countInStock -= element.qty
        item.countSold += element.qty
        const updateItem = await item.save()
      }
    })
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }

})

const updateOrderToEnd = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.status = 'end'

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.status = 'delivered'

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})


const getOrderByUser = asyncHandler(async(req, res) => {
  const orders = await Order.find({user: req.params.id})
  res.json(orders)
})

const getOrdersDate = asyncHandler(async (req, res) => {
  //console.log(req.params.createAt)
  //console.log(new Date(req.params.createAt.substring(0, 10)))

  var now = new Date(Date.now())
  var start = new Date(now - 3600 * req.params.createAt * 24 * 1000)

  const orders = await Order.find({
    createdAt:
    {
      $gte: new Date(start.toISOString().split('T')[0]),
      $lt: new Date(now)
    }
  }).sort({ createdAt: -1 }).populate('user', 'id name').lean()
  // console.log(orders)

  if (orders){
    console.log(orders.length)
    res.json(orders)
  }
  else {
    throw new Error('Order not found')
  }
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'id name')
  res.json(orders)
})

const createMomoPayment = asyncHandler(async (req, res) => {

  const momoPaymentExist = await MoMo.findOne({ orderId: req.params.id })

  //console.log(momoPaymentExist)
  if (momoPaymentExist && momoPaymentExist.errorCode == 0) {

    const errorCode = momoPaymentExist.errorCode
    const message = momoPaymentExist.message
    const payUrl = momoPaymentExist.payUrl

    res.json({
      errorCode,
      message,
      payUrl,
    })
  }

  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  const serectkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
  const orderId = order._id
  const requestId = orderId
  const partnerCode = process.env.MOMO_PARTNER_CODE
  const accessKey = process.env.MOMO_ACCESS_KEY
  const returnUrl = "localhost:3000/order/" + orderId
  const notifyUrl = "localhost:3000/order/" + orderId
  const amount = order.totalPrice.toString()
  const extraData = ""
  const requestType = "captureMoMoWallet"
  const orderInfo = "thanh toan momo cho don hang " + orderId


  const rawSignature = "partnerCode=" + partnerCode
    + "&accessKey=" + accessKey
    + "&requestId=" + requestId
    + "&amount=" + amount
    + "&orderId=" + orderId
    + "&orderInfo=" + orderInfo
    + "&returnUrl=" + returnUrl
    + "&notifyUrl=" + notifyUrl
    + "&extraData=" + extraData

  const signature = crypto.createHmac('sha256', serectkey)
    .update(rawSignature)
    .digest('hex')

  const body = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    returnUrl: returnUrl,
    notifyUrl: notifyUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
  })

  const config = {
    headers: {
      //'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    },
  }

  const { data: { errorCode, message, payUrl } } = await axios.post('https://test-payment.momo.vn/gw_payment/transactionProcessor', body)

  //console.log(amount)
  //console.log(data)

  if (!momoPaymentExist) {
    const momo = await MoMo.create({
      orderId,
      requestId,
      errorCode,
      message,
      payUrl
    })
  }
  else if (momoPaymentExist.errorCode != 0) {
    momoPaymentExist.errorCode = errorCode
    momoPaymentExist.message = message
    momoPaymentExist.payUrl = payUrl
    const momo = await momoPaymentExist.save()
  }
  res.json({ errorCode, message, payUrl })
})



export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToConfirm,
  updateOrderToCancel,
  getMyOrders,
  getOrders,
  createMomoPayment,
  getOrdersDate,
  updateOrderToEnd,
  getOrderByUser
}
