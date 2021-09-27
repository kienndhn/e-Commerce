import mongoose from 'mongoose'

const momoSchema = mongoose.Schema(
    {
        orderId:{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Order',
        },
        requestId:{
            type: String,
            require:true,
        },
        errorCode:{
            type: Number,
            require: true,
        },
        massage:{
            type: String,
            require: true,
        },
        payUrl:{
            type: String,
            require:false,
        },
    },
    {
        timestamps:true,
    }
)

const MoMo = mongoose.model('MoMo', momoSchema)

export default MoMo