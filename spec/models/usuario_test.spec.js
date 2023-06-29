const Reserva = require('../../models/reverva.js');
const Usuario = require('../../models/usuario.js');
const Bicicleta = require('../../models/bicicleta.js');

describe('Tetsing de Usuarios', function () {
    beforeEach(async function () {
        try {
            const mongoDB = 'mongodb://localhost/testdb';
            await mongoose.connect(mongoDB, { useNewUrlParser: true });
            console.log('Connected to the test database');
        } catch (error) {
            console.error('Error connecting to the test database:', error);
        }
    });
    // note: generally the dependent document should be deleted first
    afterEach(async function () {
        try {
            await Reserva.deleteMany({});
            await Usuario.deleteMany({});
            await Bicicleta.deleteMany({});
            console.log('Deleted all Bicicleta documents');
        } catch (error) {
            console.error('Error deleting Bicicleta documents:', error);
            console.error('Document that couldn\'t be deleted:', error.document);
        }
    });

    describe('Usuario reserva una bici', () => {
        it('debe existir reserva', async function () {
            try {
                const usuario = new Usuario({ nombre: 'Gaby' });
                await usuario.save();

                const bicicleta = new Bicicleta({ code: 1, color: "Amarillo", modelo: "urbana" });
                await bicicleta.save();

                const today = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);

                usuario.reservar(today, tomorrow, bicicleta.id, function (error, reserva) {
                    Reserva.find({}).populate('bicicleta').populate('usuario').exec(function (err, reservas) {
                        console.log(reservas[0])
                        expect(reservas.length).toBe(1);
                        expect(reservas[0].diasDeReserva()).toBe(2)
                        expect(reservas[0].bicicleta.code).toBe(1);
                    })
                })
            }
            catch (err) {
                console.log(err)
            }
        })
    })

})

