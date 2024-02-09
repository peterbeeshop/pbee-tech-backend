import { Schema, model } from 'mongoose'

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: String,
  Street: String,
  city: String,
  province: String,
  phoneNumber: String,
})

const Address = model('address', AddressSchema)

export default Address
