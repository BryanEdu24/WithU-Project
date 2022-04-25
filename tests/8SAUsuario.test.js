const { TestWatcher } = require("jest");
const SAUsuario = require("../public/javascripts/SAUsuario");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
//jest.setTimeout(5000);
const sa = new SAUsuario(pool);


const usernameCorrecto = "AdminDeLaUcm";
const usernameCorrecto2 = "AdminDeLaUcm2";
const usernameLargo = "Prueba de un username incorrecto con demasiados caracteres como para que sea válido";
const usernameCorto = "aa"
const passwordCorrecta = "Contraseña1234"
const passwordCorrecta2 = "NoSoyIgual"
const passwordCorta = "a"
const passwordLarga = "EstaEsUnaContraseñaDemasiadoLargaYPorTantoNoValida"
const emailCorrecto = "admin@ucm.es";
const emailCorrecto2 = "admin2@ucm.es";
const emailSinArroba = "adminucm.es";
const emailSinPunto = "admin@ucmes"
const emailSinNada = "adminucmes"

test ('Intentamos agregar un usuario con username, password y email correctos', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeGreaterThan(0);
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto2, email: emailCorrecto2, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done();
    }
}); 

test('Intentamos agregar un objeto null', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }
    let usuario = null;
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un objeto undefined', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }
    let usuario = undefined;
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y email correctos pero contraseñas no coincidentes', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("Las contraseñas no coinciden");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta2};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y email correctos pero contraseña corta', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("La contraseña es demasiado debil");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordCorta, confirmPassword: passwordCorta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y email correctos pero contraseña larga', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("La contraseña es demasiado larga");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordLarga, confirmPassword: passwordLarga};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y email correctos pero contraseña null', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: null, confirmPassword: passwordLarga};
	try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y email correctos pero confirmacion de contraseña null', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordCorrecta, confirmPassword: null};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y password correctos, pero email sin punto o arroba', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("El formato del correo no es correcto");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailSinNada, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y password correctos, pero email sin punto', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("El formato del correo no es correcto");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailSinPunto, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y password correctos, pero email sin arroba', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("El formato del correo no es correcto");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: emailSinArroba, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con username y password correctos, pero email null', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorrecto, email: null, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con email y password correctos, pero username demasiado largo', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("El nombre de usuario es demasiado largo");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameLargo, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con email y password correctos, pero username demasiado corto', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("El nombre de usuario debe contener al menos 3 caracteres");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: usernameCorto, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un usuario con email y password correctos, pero username null', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let usuario = { username: null, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    try{
        sa.agregarUsuario(usuario, callback);
    }catch(error){
        done(error);
    }
});

/* test('Intentamos iniciar sesión de un usuario con usuario y contraseña que coincidan', done =>{
    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta};

    function callback(err, ID){
        try{
            expect(err).toBe(null);
            done();
        }catch(error){
            done(error);
        }
    }
    try{
        sa.agregarUsuario(usuario, function(err){
            sa.buscarUsuario(usernameCorrecto, passwordCorrecta, callback)
        });
    }catch(error){
        done(error);
    }
}); */

/* test('Intentamos iniciar sesión de un usuario con usuario y contraseña que no coincidan', done =>{
    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    function callback(err, ID){
        try{
            expect(err).toBe("Contraseña incorrecta");
            done();
        }catch(error){
            done(error);
        }
    }
    try{
        sa.agregarUsuario(usuario, function(err){
            sa.buscarUsuario(usernameCorrecto, "12345", callback)});
    }catch(error){
        done(error);
    }
}); */

test('Intentamos iniciar sesión de un usuario que no existe', done =>{
    function callback(err, ID){
        try{
            expect(err).toBe("El usuario no existe");
            done();
        }catch(error){
            done(error);
        }
    }
    try{
        sa.buscarUsuario("12345", "12345", callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos iniciar sesión de un usuario con usuario null', done =>{
    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    sa.agregarUsuario(usuario, null);
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }
    try{
        sa.buscarUsuario(null, "12345", callback);
    }catch(error){
        done(error);
    }
});

test('Intentamos iniciar sesión de un usuario con contraseña null', done =>{
    let usuario = { username: usernameCorrecto, email: emailCorrecto, password: passwordCorrecta, confirmPassword: passwordCorrecta};
    sa.agregarUsuario(usuario, null);
    function callback(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }
    try{
        sa.buscarUsuario("12345", null, callback);
    }catch(error){
        done(error);
    }
});