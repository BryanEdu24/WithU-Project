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

test('leemos usuario por username correctamente', done =>{
    function cb(err, user){
        try{
            expect(err).toBe(null);
            expect(user.Email).toBe("admin@ucm.es");
            expect(user.ID).toBe(1);
            expect(user.Password).toBe("Contraseña1234");
            expect(user.Username).toBe("AdminDeLaUcm");
            done();
        }catch(error){
            done(error);
        }
    }

    let username = usernameCorrecto;
    
    try{
        dao.leerUsuarioPorUsername(username, cb);
    } catch(err){
        done(error);
    }
});

test('leemos usuario por correo correctamente', done =>{
    function cb(err, user){
        try{
            expect(err).toBe(null);
            expect(user.Email).toBe("admin@ucm.es");
            expect(user.ID).toBe(1);
            expect(user.Password).toBe("Contraseña1234");
            expect(user.Username).toBe("AdminDeLaUcm");
            done();
        }catch(error){
            done(error);
        }
    }

    let correo = emailCorrecto;
    
    try{
        dao.leerUsuarioPorCorreo(correo, cb);
    } catch(err){
        done(error);
    }
});

test('Error al ejecutar la petición a la BBDD', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Ha ocurrido un error en la base de datos, por favor intentelo de nuevo más tarde");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let usuario = {error:"Variable no valida"};
    dao.agregarUsuario(usuario, cb);
});