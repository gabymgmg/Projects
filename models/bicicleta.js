const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bicicletaSchema = new Schema({
  code: Number,
  color: String,
  modelo: String,
  ubicacion: {
    type: [Number], index: { type: '2dsphere', sparse: true }
  },
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
  return new this({
    code: code,
    color: color,
    modelo: modelo,
    ubicacion: ubicacion
  });
};

bicicletaSchema.methods.toString = function() {
  return 'id' + this.id + "| color:" + this.color;
};

bicicletaSchema.statics.allBicis = async function() {
  try {
    return await this.find({});
  } catch (error) {
    throw error;
  }
};

bicicletaSchema.statics.add = async function(aBici) {
  try {
    return await this.create(aBici);
  } catch (error) {
    throw error;
  }
};

bicicletaSchema.statics.findByCode = async function(bcode){
    try{
        return await this.find({code:bcode})
    }
    catch(error){
        throw(error)
    }
};

bicicletaSchema.statics.removeByCode = async function(bcode){
    try{
        return this.deleteOne({code:bcode})
    }
    catch(error){
        throw(error)
    }
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
