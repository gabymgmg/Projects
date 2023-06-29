const Bicicleta = require('../../models/bicicleta');
const mongoose = require('mongoose');

describe('testing bicicletas', function () {
    beforeEach(async function () {
        try {
            const mongoDB = 'mongodb://localhost/testdb';
            await mongoose.connect(mongoDB, { useNewUrlParser: true });
            console.log('Connected to the test database');
        } catch (error) {
            console.error('Error connecting to the test database:', error);
        }
    });

    afterEach(async function () {
        try {
            await Bicicleta.deleteMany({});
            console.log('Deleted all Bicicleta documents');
        } catch (error) {
            console.error('Error deleting Bicicleta documents:', error);
        }
    });

    describe('Bicicleta', () => {
        describe('createInstance', () => {
            it('crea una instancia de Bicicleta', () => {
                const bici = Bicicleta.createInstance(1, 'verde', 'urbana', [-34.5, -54.1]);

                expect(bici.code).toBe(1);
                expect(bici.color).toBe('verde');
                expect(bici.modelo).toBe('urbana');
                expect(bici.ubicacion[0]).toEqual(-34.5);
                expect(bici.ubicacion[1]).toEqual(-54.1);
            });
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', async () => {
            const bicis = await Bicicleta.allBicis();
            expect(bicis.length).toBe(0);
        });
    });

    describe('Bicicleta.add', () => {
        it('Agrega solo una bici', async () => {
            try {
                const newBici = new Bicicleta({ code: 1, color: "Amarillo", modelo: "urbana" });
                const savedBici = await Bicicleta.add(newBici)
                const bicis = await Bicicleta.allBicis();
                expect(bicis.length).toBe(1);
                expect(bicis[0].code).toEqual(savedBici.code);
            } catch (err) {
                console.error('Error adding bicicleta', err);
            }
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('Encuentra la bicicleta dado el codigo', async () => {
            try {
                // Comprueba nuevamente si la lista está vacía
                const bicis = await Bicicleta.allBicis();
                expect(bicis.length).toBe(0);

                // Agrega una bicicleta
                const newBici = new Bicicleta({ code: 4, color: 'Dorado', modelo: 'montanera' });
                await Bicicleta.add(newBici);
                const biciList = await Bicicleta.allBicis()
                expect(biciList.length).toBe(1);

                // Devuelve el array de bicis por code
                const bicisEncontradas = await Bicicleta.findByCode(newBici.code);
                // ya que es un array de obj, indicar la posicion
                const biciToFind = bicisEncontradas[0];
                expect(biciToFind.code).toBe(newBici.code);
                expect(biciToFind.color).toBe(newBici.color);
                expect(biciToFind.modelo).toBe(newBici.modelo);
            } catch (err) {
                console.error('Error searching bicicleta by code', err);
            }
        });
    });


    describe('Bicicleta.removeByCode', () => {
        it('Elimina la bicicleta dado el codigo', async () => {
            try {
                const bicis = await Bicicleta.allBicis();
                expect(bicis.length).toBe(0);

                const newBici = new Bicicleta({ code: 5, color: "Plateado", modelo: "urbana" });
                await Bicicleta.add(newBici);

                // Elimina la bici
                await Bicicleta.removeByCode(newBici.code);

                // Verifica que la bicicleta se haya eliminado correctamente
                const eliminatedBici = await Bicicleta.findByCode(newBici.code);
                expect(eliminatedBici).toEqual([]); // Check if the eliminatedBici is null

            } catch (err) {
                console.error('Error eliminating bicicleta by code', err);
            }
        });
    });
});
