const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 8
    } 
}, { timestamps: true })

userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw Error('All credentials must be filled.')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email ID.')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough.')
    }

    const exists = await this.findOne({ Email: email })

    if (exists) {
        throw Error('Email is already in use.')        
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ Email: email, Password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled.')
    }

    const user = await this.findOne({ Email: email })

    if (!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.Password)

    if (!match) {
        throw Error('Incorrect Password, please provide valid credentials.')
    }

    return user
}

module.exports = mongoose.model('user', userSchema)
