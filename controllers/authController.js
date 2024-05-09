const generateToken = require('../utils/generateToken')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const getRandomCode = require('../utils/getRandomCode')

const authUser = asyncHandler(async (req, res) => {
  const { username, password, tokenfcm, device, isLoginKapps } = req.body
  // let user = await User.findOne({
  //   $or: [{ username }, { email: username }, { phone: username }],
  // })

  let user = await User.findOne({ username })

  //initiate login url - based on user type

  if (user && (await user.matchPassword(password))) {
    //delete password & old token

    //generate new token

    //populate additional data (conditional)
    //shipper - warehouse
    //transporter - truck
    res.json({
      message: 'success',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    })

    // user.matchPassword(password, async function (err, isMatch) {
    //   if (isMatch) {
    //     res.json({
    //       message: 'success',
    //       user: {
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         isAdmin: user.isAdmin,
    //         token: generateToken(user._id),
    //       },
    //     })
    //   }
    // })
  } else {
    res.status(404)
    throw new Error('invalid email and password')
  }
})

const register = asyncHandler(async (req, res) => {
  const { username, fullName, email, phone, password, role } = req.body
  let { userType } = req.body

  //role warehouse pic

  //role driver
  if (role === 'driver') {
  } else {
    //validation
    //await validation

    //check account
    const existEmail = await User.findOne({ email })
    if (existEmail) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    let payloadUser = {
      fullName,
      username,
      email,
      password,
      phone,
      userType,
      role,
      tokenEmail: getRandomCode(64),
    }

    //progress
    //payloadUser = checkUserProgress('newUser', payloadUser)

    //should be disabled before active

    //console.log(payloadUser);
    const user = new User(payloadUser)
    user.save()
    return res.status(200).json({ message: 'success' })
  }
})

module.exports = {
  authUser,
  register,
}
