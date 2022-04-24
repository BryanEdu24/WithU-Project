const { TestWatcher } = require("jest");
const SARespuesta = require("../public/javascripts/SARespuesta");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
//jest.setTimeout(5000);
const sa = new SARespuesta(pool);

const cuerpoRespuestaCorrecto = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, met"; // 1500 caracteres
const cuerpoRespuestaLargo = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metu"; // 1501 caracteres
const cuerpoRespuestaVacio = ""

test('Intentamos responder una publicación con cuerpo correcto', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeGreaterThan(0);
            done();
        }catch(error){
            done(error);
        }
    }

    let respuesta = { cuerpo: cuerpoCorrecto };
    try{
        sa.agregarRespuesta(respuesta, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un objeto undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }

    let respuesta = undefined;
    try{
        sa.agregarRespuesta(respuesta, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un objeto null', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }
    let respuesta = null;
    try{
        sa.agregarRespuesta(respuesta, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un objeto que no es una respuesta', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }

    let respuesta = undefined;
    try{
        sa.agregarRespuesta(respuesta, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una respuesta con cuerpo vacio', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }

    let respuesta = {cuerpo: ""};
    try{
        sa.agregarRespuesta(respuesta, cb);
    }catch(error){
        done(error);
    }
});

// Test de Vista Respuesta

test('Leer datos de una respuesta', done => {
    function callback(err, respuesta) { 
        try{
            expect(err).toBe(null);
            expect(respuesta.Cuerpo).toBe(cuerpoRespuestaCorrecto);
            done(); 
        }catch(error){
            done(error);
        }  
    }

    let respuesta = { cuerpo: cuerpoRespuestaCorrecto };
    
    try{
        sa.leerRespuestasPorPublicacion(1, callback);
    }catch(error){
        done(error);
    }

});