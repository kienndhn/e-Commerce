import mongoose from 'mongoose'
import timeZone from 'mongoose-timezone'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      name: {type:String, required: true},
      detail: { type: String, required: true },
      ward: {type: String, required: true},
      district: {type: String, required: true},
      city: { type: String, required: true },
      phoneNumber: {type: String, required: true}
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },     
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date
    },
    status: {
      type: String,
      required: true,
      default: 'waiting'
    }
  },
  {
    timestamps: true,
  }
)

// orderSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt', 'deliveredAt', 'paidAt', 'cancelAt', 'confirmAt'] });
const Order = mongoose.model('Order', orderSchema)


export default Order
