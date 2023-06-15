const newmap = L.map('main_map').setView([-34.61315, -58.37723], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(newmap);

/*L.marker([-34.573833, -58.417841], { title: 'Palermo, Buenos Aires' }).addTo(newmap);
L.marker([-34.609878, -58.424221], { title: 'Almagro, Buenos Aires' }).addTo(newmap);
L.marker([-34.592777, -58.374557], { title: 'Retiro, Buenos Aires' }).addTo(newmap);*/


$.ajax({
    dataType:'json',
    url:"api/bicicletas",
    success: function(result){
        console.log(result)
        result.bicicletas.forEach(bici => {
            L.marker(bici.ubicacion, { title: bici.id }).addTo(newmap);
        });
    }
})
