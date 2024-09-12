import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  username: { type: String },
  score: { type: Number },
  timer: { type: Number },
  fruitCount: { type: Number },
})

const User = mongoose.models.User || mongoose.model('Game', GameSchema)

export default User
