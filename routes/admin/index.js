'use strict'
const { Router } = require('express')
const router = Router()
const {
    getAllAdmins,
    // getAdminById,
    createAdmin,
    deleteAdminById,
    updatedAdmin,
    searchUsers,
    searchOwner
} = require('../../controllers/admin')

const {
  getAllOwners,
  // getOwnerById,
  // createOwner,
  // deleteOwnerById,
  // updatedOwner
} = require('../../controllers/owner')

const {
  getAllUsers,
  // getUserById,
  // createUser,
  // deleteUserById,
  // updateUser
} = require('../../controllers/user')
const { sendMail } = require('../../utils/email')

router.post('/', async (request, reply) => {
    try {
        const { name, email, username, password } = request.body
        try {
          const newAdmin = await createAdmin(name, email, username, password)
          console.log(newAdmin)
          const subject = 'Ahora eres admin de Padel Field App'
          const body = `Bienvenido ${name}, ahora eres admin )`
          sendMail(email, body, subject)
          return reply.send( newAdmin )
        } catch (e) {
          return e
        }
    } catch (e) {
      return e
    }
  })


  router.get('/', async function (request, reply) { 
    try {
      const admins = await getAllAdmins()
      return reply.send(admins)
    } catch (e) {
      return e
    }
  })


  router.delete('/:adminId', async function (request, reply) {
    const { adminId } = request.params
    try {
      const deletedadmin = await deleteAdminById(adminId)
      return reply.send(deletedadmin)
    } catch (e) {
      return e
    }
  })
  
  router.put('/:adminId', async function (request, reply) {
    const { adminId } = request.params
    const { password, username } = request.body
    try {
      const updateResult = await updatedAdmin(
        adminId,
        password,
        username,
      )
      return reply.send(updateResult)
    } catch (e) {
      return e
    }
  })

router.get('/searchU', async (req, res) => {
  const { username } = req.query
  try{
    const user = await searchUsers(username)
    return res.send(user)
  }catch(e){
    return e
  }
})

router.get('/searchO', async (req, res) => {
  const { username } = req.query
  try{
    const owner = await searchOwner(username)
    return res.send(owner)
  }catch(e){
    return e
  }
})



// ----------- ADMIN FUNCTIONS --------/

router.get('/owner', async function (request, reply) { // ---> /admin/owner
  try {
    const owners = await getAllOwners()
    return reply.send(owners)
  } catch (e) {
    return reply.lo.error(e)
  }
})


router.get('/user', async function (request, reply) {
  try {
    const users = await getAllUsers()
    return reply.send(users)
  } catch (e) {
    return reply.log.error(e)
  }
})

  module.exports = router
