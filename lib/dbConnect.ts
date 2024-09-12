import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://localhost:27017/fruity'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let isConnected: mongoose.ConnectionStates

export async function dbConnect() {
  if (isConnected) {
    return
  }

  const db = await mongoose.connect(MONGODB_URI, {
    // @ts-expect-error "useNewUrlParser" не существует в типе "ConnectOptions"
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  isConnected = db.connections[0].readyState
}
