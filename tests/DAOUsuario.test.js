const { TestWatcher } = require("jest");
const DAOUsuario = require("../public/javascripts/DAOUsuario");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
jest.setTimeout(5000);
const dao = new DAOUsuario(pool);

const usernameCorrecto = "AdminDeLaUcm";
const usernameLargo = "Prueba de un username incorrecto con demasiados caracteres como para que sea válido";
const usernameCorto = "aa"
const passwordCorrecta = "Contraseña1234"
const passwordCorrecta2 = "NoSoyIgual"
const passwordCorta = "a"
const passwordLarga = "EstaEsUnaContraseñaDemasiadoLargaYPorTantoNoValida"
const emailCorrecto = "admin@ucm.es";
const emailSinArroba = "adminucm.es";
const emailSinPunto = "admin@ucmes"
const emailSinNada = "adminucmes"

test('Agregamos una usuario correctamente', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeGreaterThan(0);
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto,email:emailCorrecto,password:passwordCorrecta,confirmPassword:passwordCorrecta};
    
    try{
        dao.agregarUsuario(usuario, cb);
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
    
    let usuario = { username: usernameCorrecto};
    let dao2 = new DAOUsuario();
    try{
        dao2.agregarUsuario(usuario, cb);
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
    
    let usuario = {error:"Variable no valida"};
    dao.agregarUsuario(usuario, cb);
});