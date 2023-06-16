const Bicicleta= require('../../models/bicicleta');
//empty the array before each test
beforeEach(()=>{Bicicleta.allBicis=[]});

describe('Bicicleta.allBicis',()=>{
    it('comienza vacia', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
    })
});

describe('Bicicleta.add',(()=>{
    it('agregamos una',(()=>{
        expect(Bicicleta.allBicis.length).toBe(0)
        const a = new Bicicleta(1, 'rojo', 'urbana', [-34.606929,-58.420711]);
        Bicicleta.add(a)
        expect(Bicicleta.allBicis.length).toBe(1)
        expect(Bicicleta.allBicis[0]).toBe(a)
    }));
}));

describe('Bicicleta.findBy',(()=>{
    it('debe devolver la bici con id:1',()=>{
        expect(Bicicleta.allBicis.length).toBe(0)
        const a = new Bicicleta(1, 'verde', 'urbana', [-34.606929,-58.420711]);
        const b = new Bicicleta(2, 'verde', 'urbana', [-34.606929,-58.420711]);
        Bicicleta.add(a)
        Bicicleta.add(b)
        const targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(a.color);
        expect(targetBici.modelo).toBe(a.modelo);

    });
}));

describe('Bicicleta.removeByid',()=>{
    it('debe eliminar la bici con id:2',()=>{
        const a = new Bicicleta(1, 'verde', 'urbana', [-34.606929,-58.420711]);
        const b = new Bicicleta(2, 'verde', 'urbana', [-34.606929,-58.420711]);
        Bicicleta.add(a)
        Bicicleta.add(b)

        Bicicleta.removeById(2);
        expect(Bicicleta.allBicis.length).toBe(1)
        expect(Bicicleta.allBicis[1]).toBe(undefined)

    })
})
