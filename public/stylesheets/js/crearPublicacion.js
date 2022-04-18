let botonAñadir = document.getElementById("botonAñadirEtiqueta")

let numEtiquetas = 0
const textEtiqueta = document.getElementById("nuevaEtiqueta")


var añadirEtiqueta = function nuevaEtiqueta(){

    


    if(numEtiquetas < 5 && textEtiqueta.value !== ''){
        numEtiquetas++

        let añadir = document.getElementById("listaEtiquetas")

        const content = `
        <div class="d-flex p-2 filaEtiqueta jusify-content-left">
             <div class="p-2 nombreEtiqueta bd-highlight">               
                <input class="form-control etiquetaNum" type="text" readonly value= "`+ textEtiqueta.value +`" name = "etiquetas[etiqueta` + numEtiquetas +`]" id="etiquetaNum">
            </div>
            <div class="p-2 botonEtiqueta">
                 <button type="button" class="btn btn-outline-danger delete">X</button>
            </div>
        </div>
`

        const fila = document.createElement('div')
        //fila.classList().add('')
        fila.innerHTML = content
    


        añadir.append(fila)
        textEtiqueta.value = ""

        fila.querySelector(".delete").addEventListener('click', eliminarEtiqueta)
    }

    if(numEtiquetas === 5){
        textEtiqueta.setAttribute('disabled', 'disabled')
    }
    
    
    
}

var eliminarEtiqueta = function quitarEtiqueta(e){
    const button = e.target //El boton que va a eliminar
    const item = button.closest('.d-flex')
    const et = item.querySelector('input')

    
    
    //Reasignamos los numeros de etiqueta

    if(et.getAttribute('name') === "etiquetas[etiqueta1]" && numEtiquetas > 1){
        console.log("entro")
        let listaEtiquetas = item.closest('#listaEtiquetas').querySelectorAll('.filaEtiqueta')
        listaEtiquetas.forEach(m => {
            let cb= m.querySelector('input')
            cambiarNumeros(cb)
            
        });
    }
    else if(et.getAttribute('name') === "etiquetas[etiqueta2]"  && numEtiquetas > 2){
        let listaEtiquetas = item.closest('#listaEtiquetas').querySelectorAll('.filaEtiqueta')
        listaEtiquetas.forEach(m => {
            let cb= m.querySelector('input')
            cambiarNumeros(cb)
            
        });
    }
    else if(et.getAttribute('name') === "etiquetas[etiqueta3]"  && numEtiquetas > 3){
        let listaEtiquetas = item.closest('#listaEtiquetas').querySelectorAll('.filaEtiqueta')
        listaEtiquetas.forEach(m => {
            let cb= m.querySelector('input')
            cambiarNumeros(cb)
            
        });
    }
    else if(et.getAttribute('name') === "etiquetas[etiqueta4]"  && numEtiquetas > 4){
        let listaEtiquetas = item.closest('#listaEtiquetas').querySelectorAll('.filaEtiqueta')
        listaEtiquetas.forEach(m => {
            let cb= m.querySelector('input')
            cambiarNumeros(cb)
            
        });
    }
    console.log(et.getAttribute('name'))


    item.remove()
    numEtiquetas--;
    textEtiqueta.removeAttribute('disabled')
    
    

}


function cambiarNumeros(e){
   
    switch(e.getAttribute('name')){
        case 'etiquetas[etiqueta2]':
            e.removeAttribute('name')
            e.setAttribute('name', 'etiquetas[etiqueta1]')
            break

        case 'etiquetas[etiqueta3]':
            e.removeAttribute('name')
            e.setAttribute('name', 'etiquetas[etiqueta2]')
            break
        
        case 'etiquetas[etiqueta4]':
            e.removeAttribute('name')
            e.setAttribute('name', 'etiquetas[etiqueta3]')
            break

        case 'etiquetas[etiqueta5]':
            e.removeAttribute('name')
            e.setAttribute('name', 'etiquetas[etiqueta4]')
            break
    }
}

botonAñadir.addEventListener("click", añadirEtiqueta)

let titulo = document.getElementsByClassName("TituloTexto")