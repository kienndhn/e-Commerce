import mongoose from 'mongoose'

const addressSchema = mongoose.Schema({ url: String, text: String, id: Number },
    { collection: 'province' })

const Address = mongoose.model('Address', addressSchema)

export default Address