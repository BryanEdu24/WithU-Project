const { TestWatcher } = require("jest");
const DAOEtiqueta = require("../public/javascripts/DAOEtiqueta");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
jest.setTimeout(5000);
const dao = new DAOEtiqueta(pool);

const nombreCorrecto = "Prueba nombre de la etiqueta correcto ";
const seccionCorrecta = 1;

test('Agregamos una etiqueta correctamente', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeGreaterThan(0);
            done();
        }catch(error){
            done(error);
        }
    }

    let etiqueta = { nombre: nombreCorrecto};
    
    try{
        dao.agregarEtiqueta(etiqueta, cb);
    } catch(err){
        done(error);
    }
});

test('Error de conexión a la BBDD', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Error al obtener la conexión");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let etiqueta = { nombre: nombreCorrecto};
    let dao2 = new DAOEtiqueta();
    try{
        dao2.agregarEtiqueta(etiqueta, cb);
    } catch(err){
        done();
    }
});

test('Error al ejecutar la petición a la BBDD', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Los datos no son correctos.");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let etiqueta = {error:"Variable no valida"};
    dao.agregarEtiqueta(etiqueta, cb);
});
