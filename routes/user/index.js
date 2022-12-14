'use strict'
const { Router } = require('express')
const router = Router()
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUser,
  ableUser,
  ableAdmin,
  google
} = require('../../controllers/user')
const { sendMail } = require('../../utils/email');
const {emailUserRegister} = require('../../utils/emailTemplate');

require('dotenv')
// const user = require('../../models/User')
// const { tokenGenerator } = require('../../controllers/tokenGenerator')
// const jwtCheck = require('../../middleware/middleware')
// const bcrypt = require('bcrypt')

router.get('/', async function (request, reply) {
  try {
    const users = await getAllUsers()
    return reply.send(users)
  } catch (e) {
    return reply.log.error(e)
  }
})

// router.get('/info', jwtCheck, async (request, reply) => {
//   try {
//     reply.status(200).send('HELLO FROM PROTECTED ROUTE')
//   } catch (err) {
//     reply.send({ msg: 'Unathorized' })
//   }
// })

router.get('/:userId', async function (request, reply) {
  const { userId } = request.params
  try {
    const user = await getUserById(userId)
    return reply.send(user)
  } catch (e) {
    return e
  }
})

router.post('/', async function (request, reply) {
  const { name, lastName, email, password, user_metadata } = request.body
  try {
    const newUser = await createUser(
      name,
      lastName,
      email,
      password,
      user_metadata
    )

    const date = new Date();
    const newDate = `${date.toString().slice(8,10)} ${date.toString().slice(4,7)} ${date.getFullYear()}`;
    const emailBody = emailUserRegister(name, newDate);
    const subject = 'Bienvenido a Padel Field';
    sendMail(email, emailBody, subject);

    return reply.send({ newUser })
  } catch (e) {
    return e
  }
})


router.post('/google', async function (request, reply) {
  const {  given_name, email, telePhone, family_name, picture } = request.body
  try {
    
    const newUserG = await google(
      given_name,
      email,
      telePhone,
      family_name,
      picture
    )
    console.log(newUserG)
    return reply.send( newUserG )
  } catch (e) {
    return e
  }
})

// router.post('/login', async (request, reply) => {
//   const { email, password } = request.body
//   if (!email || !password)
//     return reply
//       .status(400)
//       .json({ auth: false, msg: 'email and password are required' })
//   try {
//     user.findOne({ email }).then((user) => {
//       if (!user)
//         return reply.status(400).send({ auth: false, msg: 'User not exist' })
//       bcrypt.compare(password, user.password, (err, data) => {
//         if (err) throw err
//         if (data) {
//           const accessToken = tokenGenerator({ userId: data.id })
//           return reply
//             .status(200)
//             .send({ auth: true, msg: 'Login success', accessToken })
//         } else {
//           return reply
//             .status(401)
//             .send({ auth: false, msg: 'Invalid credential' })
//         }
//       })
//     })
//   } catch (err) {
//     reply.send(err, 'este errawr')
//   }
// })

router.delete('/:userId', async function (request, reply) {
  const { userId } = request.params
  try {
    const deletedUser = await deleteUserById(userId)
    return reply.send(deletedUser)
  } catch (e) {
    return e
  }
})

router.put('/able/:userId', async function (request, reply) {
  const { userId } = request.params
  try {
    const updateResult = await ableUser(userId)
    return reply.send(updateResult)
  } catch (e) {
    return e
  }
})

router.put('/:userId', async function (request, reply) {
  const { userId } = request.params
  const { name, telephone, pic} = request.body
  try {
    const updateResult = await updateUser(userId, name, telephone, pic)
    return reply.send(updateResult)
  } catch (e) {
    return e
  }
})

router.put('/:userId/admin', async function (request, reply) {
  const { userId } = request.params
  try {
    const updateResult = await ableAdmin(userId)
    return reply.send(updateResult)
  } catch (e) {
    return e
  }
})







module.exports = router
