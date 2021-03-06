const { TestWatcher } = require("jest");
const SAPublicacion = require("../public/javascripts/SAPublicacion");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
jest.setTimeout(13000);
const sa = new SAPublicacion(pool);


const tituloCorrecto = "Prueba titulo correcto con menos de 50 caracteres";
const tituloIncorrecto = "Prueba titulo incorrecto con más de 50 caracteres. Debería fallar";
const cuerpoCorrecto = "Este cuerpo tiene más de 90 caracteres: \n\nLorem ipsum dolor sit amet consectetur adipiscing elit aliquet est, facilisi nascetur nulla blandit malesuada varius fermentum hac, ultricies pulvinar cubilia platea massa fames enim iaculis. Ridiculus himenaeos lacinia nullam platea placerat netus sagittis habitasse sollicitudin ut viverra, tristique duis laoreet quam ad malesuada in iaculis magna nisl, leo quis facilisi congue mus odio proin feugiat dictum natoque. Ad dignissim nullam sed himenaeos vulputate inceptos rutrum molestie, pretium potenti tempor nibh porta cum hendrerit, at dictumst hac convallis tortor netus viverra.\n\nTempor enim dictum facilisi netus aliquam torquent justo bibendum pellentesque curae vestibulum massa eros ac ante, vehicula class erat leo inceptos luctus nibh maecenas diam libero dapibus felis ornare. Aenean maecenas metus ullamcorper lacinia nascetur aliquam justo vitae, suscipit arcu malesuada volutpat nulla class tristique facilisi, ultrices ante turpis commodo lectus hac rhoncus. Tortor neque velit montes interdum ridiculus eget arcu magna, urna dignissim cursus eleifend class varius venenatis, leo accumsan nulla maecenas at litora quis.";
const seccionCorrecta = 1;
const seccionIncorrecta = 0;
const etiquetaIncorrecta = [];
const etiquetaCorrecta = ["Emociones"];

// test('Intentamos agregar una publicación con titulo, cuerpo, seccion y etiquetas correctas', done =>{
//     function cb(err, ID){
//         try{
//             expect(err).toBe(null);
//             expect(ID).toBeGreaterThan(0);
//             done();
//         }catch(error){
//             done(error);
//         }
//     }

//     let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: etiquetaCorrecta};
//     try{
//         sa.agregarPublicacion(publicacion, cb);
//     }catch(error){
//         done(error);
//     }
// });

test('Intentamos agregar un objeto undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = undefined;
    try{
        sa.agregarPublicacion(publicacion, cb);
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
    let publicacion = null;
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }//
});

test('Intentamos agregar un objeto que no es una publicación', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = undefined;
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

// test('Intentamos agregar una publicación con titulo, etiqueta y cuerpo correctos y seccion incorrecta', done =>{
//     function cb(err, ID){
//         try{
//             expect(err).toBe("La seccion no es correcta");
//             done();
//         }catch(error){
//             done(error);
//         }
//     }

//     let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion:seccionIncorrecta, etiquetas: etiquetaCorrecta};
//     try{
//         sa.agregarPublicacion(publicacion, cb);
//     }catch(error){
//         done(error);
//     }
// });

test('Intentamos agregar una publicación con titulo ,etiqueta y cuerpo correctos y seccion undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: undefined, etiquetas: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo, etiqueta y cuerpo correctos y seccion null', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("La seccion no es correcta");
            done();
        }catch(error){
            done();//
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto,seccion:null, etiquetas: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done();
    }
});

test('Intentamos agregar una publicación con titulo, cuerpo, seccion correcta y etiqueta incorrecta', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Debe introducir entre 1 y 5 etiquetas");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: etiquetaIncorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo, cuerpo, seccion correcta y etiqueta null', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: null};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo, cuerpo, seccion correcta y etiqueta undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: undefined};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo vacío', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let publicacion = { titulo: "", cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con cuerpo vacio', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: "" , seccion: seccionCorrecta, etiquetas: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo incorrecto', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("El titulo tiene más de 50 caracteres");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = { titulo: tituloIncorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: etiquetaCorrecta };
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

// Test de Vista Publicacion

// test('Leer datos de una publicación', done => {
//     function callback(err, publicacion) { 
//         try{
//             expect(err).toBe(null);
//             expect(publicacion.Titulo).toBe(tituloCorrecto);
//             expect(publicacion.Cuerpo).toBe(cuerpoCorrecto);
//             expect(publicacion.IDSec).toBe(seccionCorrecta);
//             done(); 
//         }catch(error){
//             done(error);
//         }  
//     }

//     let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: etiquetaCorrecta };
    
//     try{
//         sa.agregarPublicacion(publicacion, sa.leerPublicacion(1,callback))
//     }catch(error){
//         done(error);
//     }

// });
/* 
test('Leer datos por seccion de una publicacion', done => {
    function cb(err, publicacion) { 
        try{
            console.log(publicacion)
            expect(err).toBe(null);
            expect(publicacion.length).toBeGreaterThan(0);
            done(); 
        }catch(error){
            done(error);
        }  
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiquetas: etiquetaCorrecta };
    
    try{
        sa.agregarPublicacion(publicacion, function(err, id){
            if(err){
                console.log(err);
                done(err);
            }
            else{
                console.log(id);
                sa.leerPublicacionesPorSeccion(1,cb)
            }
        })
        //sa.leerPublicacionesPorSeccion(1, callback);
    }catch(error){
        done(error);
    }

}); */

