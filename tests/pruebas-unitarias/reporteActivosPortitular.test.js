const express=require('express');
const request=require('supertest');
const activoRutas=require('../../routes/activoRutas');
const TitularModel=require('../../model/Titular');
const ActivoModel=require('../../model/Activo');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
app.use('/activos',activoRutas);

describe('Pruebas unitarias para titulares',()=>{
    // se ejectua antes de iniciar las pruebas
    beforeEach(async ()=>{
        await mongoose.connect('mongodb://127.0.0.1:27017/gestionactivosti',
        {useNewUrlParser:true,
        });
        await  TitularModel.deleteMany({});
        await  ActivoModel.deleteMany({});
    });
    afterAll(()=>{
        return mongoose.connection.close();
    });

    // 1er test
    test('debe listar todos los activos correspondientes a un titular:GET /activos-por-titular/:titularId',async()=>{
        //creando dos titulares
        const titular1=await TitularModel.create({nombre:'Carlos',primer_apellido:'Flores',segundo_apellido:"Choque",sexo:"H",fecha_nacimiento:"1990-04-15"});
        const titular2=await TitularModel.create({nombre:'Ruben',primer_apellido:'Bustamante',segundo_apellido:"Montaño",sexo:"H",fecha_nacimiento:"1955-04-15"});

        //creando activos relacionados a titular
        const activo1=await ActivoModel.create({
            "correlativo": 1,codigo: "PC0001",tipo: "COMPUTADORA",descripcion: "Computadora de escritorio",marca: "DELL",
            modelo: "2023",caracteristicas: "RAM 12, SSD:480GB, CPU Corei7 4ta gen",color: "NEGRO",fecha_compra: "2024-03-01",
            fecha_baja: null,precio_bs:8000,estado: "ACTIVO",titular:titular1._id
        });
    
       
        const activo2=await ActivoModel.create({
            "correlativo": 2,codigo: "PC0002",tipo: "LAPTOP",descripcion: "Computadora PORTATIL",marca: "LENOVO",
            modelo: "2023",caracteristicas: "RAM 12, SSD:480GB, CPU Corei5 4ta gen",color: "NEGRO",fecha_compra: "2024-03-01",
            fecha_baja: null,precio_bs:8000,estado: "ACTIVO",titular:titular1._id
        });
    
        const activo3=await ActivoModel.create({
            "correlativo": 3,codigo: "PC0003",tipo: "LAPTOP",descripcion: "Computadora PORTATIL",marca: "HP",
            modelo: "2023",caracteristicas: "RAM 12, SSD:480GB, CPU Corei3 4ta gen",color: "NEGRO",fecha_compra: "2024-03-01",
            fecha_baja: null,precio_bs:8000,estado: "ACTIVO",titular:titular2._id
        });

        // solicitud- request
        const res=await request(app).get('/activos/activos-por-titular/'+titular1._id);
        //console.log(res);
        //verificar la respuesta
        expect(res.statusCode).toEqual(200);
        expect(res.body.activos).toHaveLength(2);
    },10000); //tiempo en milisegundos.
});