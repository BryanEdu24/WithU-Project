const { TestWatcher } = require("jest");
const DAOSeccion = require("../public/javascripts/DAOSeccion");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
jest.setTimeout(5000);
const dao = new DAOSeccion(pool);


const Seccion1= "Estudios";
const Seccion2= "Trabajo";
const Seccion3= "Familia";
const Seccion4= "Relaciones";
const Seccion5= "Autoestima";
const Seccion6= "Otros";
const SeccionIncorrecta= "no problem";



// test('Leemos una seccion correctamente',done =>{
//     function cb(err,seccion){
//         try{
//             expect(err).toBe(null);
//             expect(seccion.Nombre).toBe(Seccion1);
//             done();
//         }catch(error){
//             done(error);
//         }
//     }
    
//     try{
//         dao.leerSeccion(1, cb);
//     } catch(err){
//         done(error);
//     }

// });//

test('Leemos una seccion Incorrectamente',done =>{
    function cb(err,seccion){
        try{
            expect(err).toBe(null);
            expect(seccion).toBe(undefined);
            done();
        }catch(error){
            done(error);
        }
    }
    
    try{
        dao.leerSeccion(7, cb);
    } catch(err){
        done(error);
    }

});

test('Leemos todas las secciones correctamente', done =>{
    function cb(err,secciones){
        try{
            expect(err).toBe(null);
            expect(secciones[0].Nombre).toBe(Seccion1);
            expect(secciones[1].Nombre).toBe(Seccion2);
            expect(secciones[2].Nombre).toBe(Seccion3);
            expect(secciones[3].Nombre).toBe(Seccion4);
            expect(secciones[4].Nombre).toBe(Seccion5);
            expect(secciones[5].Nombre).toBe(Seccion6);
            done();
        }catch(error){
            done(error);
        }
    }

    try{
        dao.leerTodas(cb);
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
    
    let dao2 = new DAOSeccion();
    try{
        dao2.leerSeccion(1, cb);
    } catch(err){
        done();
    }
});

