import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
const onSaleSchema = mongoose.Schema(
  {
    isOnSale: { type: Boolean, required: true },
    salePercent: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date }
  }
)

const descriptionSchema = mongoose.Schema(
  {
    // display: { type: String, required: true },
    // os: { type: String, required: true },
    // backCamera: { type: String, required: true },
    // frontCamera: { type: String, required: true },
    // chip: { type: String, required: true },
    // internalStorage: { type: String, required: true },
    // sim: { type: String, required: true },
    // pin: { type: String, required: true },
    // charge: { type: String, required: true },
  }
)

const imageSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    isThumbnail: { type: Boolean, required: true, default: false }
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    gallery: [imageSchema],
    description: {type: Object},
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    countSold: {
      type: Number,
      required: true,
      default: 0,
    },
    onSale: onSaleSchema,

  },
  {
    timestamps: true,
  },


)

const Product = mongoose.model('Product', productSchema)

export default Product
