const Bicicleta = require('../../models/bicicleta');
const axios = require('axios');
const server = require('../../bin/www');

describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            const a = new Bicicleta(1, 'verde', 'urbana', [-34.606929, -58.420711]);
            Bicicleta.add(a);
            axios.get('https://localhost:3000/api/bicicletas')
                .then(response => {
                    expect(response.status).toBe(200);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    });
    // done () : jasmine that when executed the test is done
    describe('POST BICICLETAS /create', () => {
        it('Status 200', (done) => {
            const headers = {'content-type' : 'application/json'};
            const aBici = '{ "id": 5, "color":"gris", "modelo":"montaña", "latitud":-32, "longitud":-68 }';

            axios.post('http://localhost:3000/api/bicicletas/create', aBici, { headers: headers })
            .then(response => {
                expect(response.status).toBe(200);
                const bici = response.data.bicicleta;
                console.log(bici);

                expect(bici.color).toBe("gris");
                expect(bici.ubicacion[0]).toBe(-32);
                expect(bici.ubicacion[1]).toBe(-68);
                done(); // Until this point, the test won't finish executing
            })
            .catch(error => {
                console.error(error);
            });
        
        });
    });
});
