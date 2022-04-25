const { TestWatcher } = require("jest");
const config = require("../config");
const mysql = require("mysql");
const DAORespuesta = require("../public/javascripts/DAORespuesta");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
jest.setTimeout(5000);
const dao = new DAORespuesta(pool);
const idPublicacionCorrecto = 1;
const cuerpoCorrecto = "Lorem ipsum dolor sit amet";


// test('Agregamos una respuesta correctamente', done =>{
//     function cb(err, result){
//         try{
//             expect(err).toBe(null);
//             done();
//         }catch(error){
//             done(error);
//         }
//     }
//     let respuesta = { idP: idPublicacionCorrecto, cuerpo: cuerpoCorrecto};

//     try{
//         dao.agregarRespuesta(respuesta, cb);
//     } catch(err){
//         done(error);
//     }
// });

test('Error de conexión a la BBDD', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Error de conexion a la base de datos");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let dao2 = new DAORespuesta()
    let respuesta = { idPub: idPublicacionCorrecto, cuerpo: cuerpoCorrecto};

    try{
        dao2.agregarRespuesta(respuesta, cb);    
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
    
    let respuesta = "Variable no valida";
    dao.agregarRespuesta(respuesta, cb);
});