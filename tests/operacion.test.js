const { TestWatcher } = require("jest");
const operar = require("../app.js");

//SUMA
test('sumar 1 + 2 es igual a 3', () =>{
    expect(operar(1,"+",2)).toBe(3);
});

test('sumar 1 + (-1) es igual a 0', () =>{
    expect(operar(1,"+",-1)).toBe(0);
});

test('sumar a + 2 es igual a Debe introducir valores válidos', () =>{
    expect(operar("a","+",2)).toBe("Debe introducir valores válidos");
});

//RESTA
test('restar 1 - 2 es igual a -1', () =>{
    expect(operar(1,"-",2)).toBe(-1);
});

test('restar 2 - 1 es igual a 1', () =>{
    expect(operar(2,"-",1)).toBe(1);
});

test('restar a - 2 es igual a Debe introducir valores válidos', () =>{
    expect(operar("a","-",2)).toBe("Debe introducir valores válidos");
});

//MULTIPLICACION
test('Multiplicar 1 * 2 es igual a 2', () =>{
    expect(operar(1,"*",2)).toBe(2);
});

test('Multiplicar 0 * 5 es igual a 0', () =>{
    expect(operar(0,"*",5)).toBe(0);
});

test('Multiplicar 1 * (-1) es igual a -1', () =>{
    expect(operar(1,"*",-1)).toBe(-1);
});

test('Multiplicar a * 2 es igual a Debe introducir valores válidos', () =>{
    expect(operar("a","*",2)).toBe("Debe introducir valores válidos");
});

//DIVISION
test('Dividir 1 / 2 es igual a 0.5', () =>{
    expect(operar(1,"/",2)).toBe(0.5);
});

test('Dividir 2 / 1 es igual a 2', () =>{
    expect(operar(2,"/",1)).toBe(2);
});

test('Dividir 2 / 0 es igual a Debe introducir valores válidos', () =>{
    expect(operar(2,"/",0)).toBe("Debe introducir valores válidos");
});

test('Dividir a / 2 es igual a Debe introducir valores válidos', () =>{
    expect(operar("a","/",2)).toBe("Debe introducir valores válidos");
});

//PRUEBA QUE DEVUELVE UN ERROR
test('Sumar 1 + 1 es igual a 3', () =>{
    expect(operar(1,"+",1)).toBe(3);
});