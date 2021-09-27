import express from 'express'
const router = express.Router()

import {getConfig} from '../controllers/configController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin ,getConfig)

export default router