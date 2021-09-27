import mongoose from 'mongoose'

const configSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    PAYPAL_CLIENT_ID: {
      type: String,
    },
    MOMO_PARTNER_CODE: {
        type: String
    },
    MOMO_ACCESS_KEY: {
        type: String
    }
  },
  {
    timestamps: true,
  },
)

const Config = mongoose.model('config', configSchema)

export default Config
