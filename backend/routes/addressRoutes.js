import express from 'express'
const router = express.Router()

import {getAddress} from '../controllers/addressController.js'

router.route('/').get(getAddress)

export default router