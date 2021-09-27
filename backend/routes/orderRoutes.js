import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  createMomoPayment,
  getOrdersDate,
  updateOrderToConfirm,
  updateOrderToCancel,
  updateOrderToEnd,
  getOrderByUser
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/user/:id').get(protect, admin, getOrderByUser)
router.route('/createAt/:createAt').get(protect, getOrdersDate)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/momo').get(protect, createMomoPayment)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/confirm').put(protect, admin, updateOrderToConfirm)
router.route('/:id/cancel').put(protect, updateOrderToCancel)
router.route('/:id/end').put(protect,updateOrderToEnd)
export default router
