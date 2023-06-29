const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reserva = require('./reserva.js')
// const usuarioSchema = new Schema({
//     nombre: {
//         type: String,
//         trim: true,
//         required: [true, 'El nombre es obligatorio']
//     },
//     email: {
//         type: String,
//         trim: true,
//         required: [true, 'El email es obligatorio'],
//         lowercase: true
//     }
// });

const usuarioSchema = new Schema({
    nombre: {
        type: String
    }
});

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
    const reserva = new Reserva({
        desde: desde,
        hasta: hasta,
        bicicleta: biciId,
        usuario: this._id,
    })
    console.log(reserva)
    reserva.save(cb)
}

//when to use .methods and .static