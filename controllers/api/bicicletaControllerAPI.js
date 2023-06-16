const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res) {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

exports.bicicleta_create = function (req, res) {
    const bici = new Bicicleta(
        req.body.id,
        req.body.color,
        req.body.modelo)

    bici.ubicacion = [req.body.latitud, req.body.longitud];
    //return the object to verify the data
    Bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = function(req,res){
    const biciToDelete = req.body.id;
    Bicicleta.removeById(biciToDelete);
    res.status(204).send();
}

exports.bicicleta_update = function(req,res){
    const biciToUpdate= Bicicleta.findById(req.body.id);
    biciToUpdate.color = req.body.color;
    biciToUpdate.modelo = req.body.modelo;
    biciToUpdate.ubicacion = [req.body.latitud,req.body.longitud];

    res.status(200).json({
        bicicleta: biciToUpdate
    });
}