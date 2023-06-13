const Bicicleta = require('../models/bicicleta')

exports.bicicleta_list = function (req,res){
    res.render('bicicletas/index', {bicis:Bicicleta.allBicis})
}

exports.bicicleta_create_get = function(req,res){
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req,res){
    const { id, color, modelo,latitud,longitud } = req.body;
    const bici = new Bicicleta(id, color, modelo);
    bici.ubicacion = [latitud,longitud];
    Bicicleta.add(bici);

    res.redirect('/bicicletas')
    }

exports.bicicleta_update_get = function(req,res){
    const bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update',{bici});
}

exports.bicicleta_update_post = function(req,res){
    const bici = Bicicleta.findById(req.params.id);
    bici.id = req.body.id
    bici.color = req.body.color
    bici.modelo = req.body.modelo
    bici.ubicacion = [req.body.latitud,req.body.longitud];
    
    res.redirect('/bicicletas')
    }

exports.bicicleta_delete_post = function(req,res){
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas')
}