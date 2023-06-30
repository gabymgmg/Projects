const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reserva = require('./reserva.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}
const usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true, //eliminates the blank space 
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        validate: [validateEmail, 'El email no es valido']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next()
})

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
    
}

usuarioSchema.methods.reservar = async function (biciId, desde, hasta) {
    try {
        const reserva = new Reserva({
            desde: desde,
            hasta: hasta,
            bicicleta: biciId,
            usuario: this._id,
        });

        console.log(reserva);

        await reserva.save();

    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Usuario', usuarioSchema);

//when to use .methods and .static