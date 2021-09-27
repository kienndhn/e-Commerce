import mongoose from 'mongoose'

const uri = process.env.MONGO_URI || "mongodb+srv://admin:cntt08k62@cluster0.hfma5.mongodb.net/ecommerce?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
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
