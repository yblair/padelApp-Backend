const PadelField = require('../models/PadelField')

async function getAllFields() {
  try {
    const fields = await PadelField.find({ isActive: true })
    return fields
  } catch (e) {
    return e
  }
}

async function getFieldById(ownerId) {
  try {
    const field = await PadelField.findById(ownerId)
    return field
  } catch (e) {
    return e
  }
}

async function registerField(name, location, image, type, price, owner) {
  try {
    const newField = await PadelField.create({
      name,
      location,
      image,
      type,
      price,
      owner,
      isActive: true,
      availability: true
    })
    return newField
  } catch (e) {
    return e
  }
}

async function deleteField(fieldId) {
  try {
    const deletedField = await PadelField.findByIdAndUpdate(fieldId, {
      isActive: false
    })
    return deletedField
  } catch (e) {
    return e
  }
}

module.exports = { deleteField, registerField, getFieldById, getAllFields }
