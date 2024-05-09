const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Timestamp } = require('bson')

const { Schema } = mongoose
const saltRounds = 10

const userSchema = Schema(
  {
    email: { type: String },
    password: { type: String, required: true },
    username: { type: String },
    fullName: { type: String },
    phone: { type: String },
    alternativePhone: [
      {
        name: { type: String },
        role: { type: String },
        phoneNumber: { type: String },
      },
    ],
    userType: { type: String },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword, cb) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// userSchema.methods.matchPassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err)
//     cb(null, isMatch)
//   })
// }

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User
