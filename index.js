
const URL_Base = `http://localhost:3000/instrumentos/`;
const contenedor = document.getElementById("contenedor-carta")


const get_instrumentos = async () =>{
    try {
        
        const respo = await fetch(`${URL_Base}`);
        const instrumentos = await respo.json();
        instrumentos.forEach(element => {
            dibujarCarta(element.id);
            contenedor.innerHTML = "";
            
        });
         setTimeout(() => {
           contenedor.scrollIntoView({ behavior: 'smooth' });
            }, 100); 

        
    } catch (error) {
        console.log(error);
        
    }
}

/* selector para traer todos los instrumentos*/

const todos_inst_venta = document.getElementById("todos_instrumentos");

todos_inst_venta.addEventListener("change", ()=>{
    if(todos_inst_venta.value){
        get_instrumentos()
        contenedor.innerHTML = "";
    }else{
        contenedor.innerHTML = "";

    }
})


/* Obtener por id */

const get_Id = async (id) =>{
    try {
        
        const respo = await fetch(`${URL_Base}${id}`);
        const inst_id = await respo.json();
        
        return(inst_id);
        
    } catch (error) {
        console.log(error);
    }
}





/* elementos modal y boton para cerrar el modal */

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const cerrar = document.getElementById("cerrar");

cerrar.onclick = () => {
    modal.close();
};



/* Funcion para dibujar cartas y el ventana modal */

const dibujarCarta = async(id) =>{
    
    const inst_Data = await get_Id(id);
    
    const carta = document.createElement("div"); //creamos un elemneto de forma directa
    carta.classList.add("carta");
    
    
    carta.innerHTML = `
    
    <img src= "${inst_Data.img}" alt="${inst_Data.nombre}" style="width: 80px;"/>
    <h2>${inst_Data.nombre}</h2>
    <button style="width:80px"; data-id= "${inst_Data.id}">Ver mas</button> `;
    /*con el atributo data- creamos id correspondiente al elemente (mdn, explica)*/
    
    carta.addEventListener("click", (e) =>{
        /*.target no dice donde hacemos click*/
        if(e.target.dataset.id){
            /*con este if logramos que solo funcione el click en el boton */
            modalBody.innerHTML = `
            <img src= "${inst_Data.img}" alt="${inst_Data.nombre}" style="width: 150px;"/>
            <p><span>Marca:</span> ${inst_Data.marca}</p> 
            <p><span>Origen:</span> ${inst_Data.origen}</p>
            <p><span>Tipo:</span> ${inst_Data.tipo}</p> 
            <p><span>Precio:</span> ${inst_Data.precio}</p> 
            `
            modal.showModal();
        }else{
            return;
        }
    })
    
    contenedor.appendChild(carta);
}


/* Filtrado por nombre, Funcion para obtener instrumentos por nombre */

let nombre = "" ;
const fil_nombre = document.getElementById("nombre");
const boton = document.getElementById("buscar");
            
const get_tipoInstru = async () =>{
    try{
        
        const respo = await fetch(`${URL_Base}nombre/${nombre}`);
        const instrumentos = await respo.json();
        if(nombre !== instrumentos.nombre){
            contenedor.innerHTML = `
             <p style = "background-color: #d7c8c8b5; padding: 10px; border-radius: 8px">No hay instrumentos de este tipo</p> 
            `    
        }
        instrumentos.forEach(element => {
            dibujarCarta(element.id)
            contenedor.innerHTML = "";
        });
        setTimeout(() => {
           contenedor.scrollIntoView({ behavior: 'smooth' });
            }, 100); 

    }catch (error){
        console.error("Error");
        
    }
}



function filtroNombre(){
    if(fil_nombre.value == ""){
        return;
    }else {
        nombre = fil_nombre.value
        
        fil_nombre.value = "";
       get_tipoInstru();
    }
    
}
boton.addEventListener("click", filtroNombre);


/* Funcion y evento para seleccionar un tipo de instruemnto */


let tipo = "";
const selec_tipo = document.getElementById("sele-tipo");

const get_tipoQuery = async () =>{
    try {
        const respo = await fetch(`${URL_Base}filtros?tipo=${tipo}`);
        const instrumentos = await respo.json();
        instrumentos.forEach(elem =>{
            dibujarCarta(elem.id)
        })
            setTimeout(() => {
           contenedor.scrollIntoView({ behavior: 'smooth' });
            }, 100); 
        
    } 
    catch (error) {
        
    }
}



selec_tipo.addEventListener("change", ()=>{
    if(selec_tipo.value == ""){
        contenedor.innerHTML ="";
    }else{
        tipo = selec_tipo.value;
        get_tipoQuery()
        contenedor.innerHTML ="";
        
    }
})

/* funcion para obetener los intrumentos por origen */

let origen = "";
const select_origen = document.getElementById("origen");
const btn_origen = document.getElementById("buscar-origen");

const get_origenQuery = async () =>{
    try {
        const respo = await fetch(`${URL_Base}filtros?origen=${origen}`);
        const instrumentos = await respo.json();
        if(origen !== instrumentos.origen){
            contenedor.innerHTML = `
            <p style = "background-color:red; padding: 10px; border-radius: 8px">No hay instrumentos de este tipo</p>
            `    
        }
        instrumentos.forEach(elem =>{
            dibujarCarta(elem.id)
        })
        
        setTimeout(() => {
           contenedor.scrollIntoView({ behavior: 'smooth' });
            }, 100); 

        contenedor.innerHTML = "";  
        
    } catch (error) {
        console.log(error);
    }
}


function filtrarOrigen(){
    if(select_origen == ""){
        return
    }else{
        origen = select_origen.value;
        select_origen.value = "";
        
        get_origenQuery()
    }
}
btn_origen.addEventListener("click",filtrarOrigen)



/* funciom para eliminar los elementos del dom y las busqueda */

const eliminar_dom = document.getElementById("eliminar");

eliminar_dom.addEventListener("click",()=>{
    contenedor.innerHTML = "";
    todos_inst_venta.value = "";
    selec_tipo.value = "";
    select_origen.value = "";
});