import axios from 'axios'
import asyncHandler from 'express-async-handler'

import Address from '../models/configModel.js'


const getConfig = asyncHandler(async (req, res) => {
    const config = await Config.findOne({})
    if (config)
        res.json(config)
    else {
        res.status(404)
        throw new Error('Chưa có thông tin cấu hình')
    }
})

const updateConfig = asyncHandler(async (req, res) => {
    const config = await Config.findOne({})

    
})

export { getConfig }