// import axios from 'axios'
import asyncHandler from 'express-async-handler'

import Address from '../models/addressModel.js'
import mongoose from 'mongoose'

const getAddress = asyncHandler(async (req, res) => {
    const address = await Address.find({})
    res.json(address)
})

export{getAddress}