import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    watchlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})

const User = model('user', UserSchema);

export default User;