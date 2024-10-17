const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
UserModel = require('../database/users')
jwt = require('jsonwebtoken')
require('dotenv').config()

userRouter.post('/login', async (req, res) => {
  const matchedUser = await UserModel.findOne({ username: req.body.username })
  if (!matchedUser) res.status(404).json({ error: 'User not found' })
  if (!bcrypt.compare(req.body.password, matchedUser.passwordHash))
    res.status(401).json({ error: 'Wrong Password' })
  const token = jwt.sign(
    { username: matchedUser.username, password: matchedUser.password },
    process.env.JWT_SECRET
  )
  res.status(200).send(token)
})

userRouter.post('/register', async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10)
  const user = new UserModel({
    username: req.body.username,
    passwordHash,
  })
  const response = await user.save()
})

module.exports = userRouter
