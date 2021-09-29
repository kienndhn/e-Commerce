import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const URI = (process.env.NODE_ENV === "production") ?
  "mongodb+srv://admin:cntt08k62@cluster0.hfma5.mongodb.net/ecommerce?retryWrites=true&w=majority"
  : process.env.MONGO_URI

// console.log(process.env.NODE_ENV)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
