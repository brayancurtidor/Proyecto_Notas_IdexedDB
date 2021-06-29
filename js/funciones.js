function conectarDB(){
    const abrirconexion=window.indexedDB.open('progra',1);
    abrirconexion.onerror=function()
    {
        console.log('hubo un error en abrir la base de datos');
    }
    abrirconexion.onsuccess=function(){
        DBGlobal=abrirconexion.result;
        //console.log('tenemos una instancia de la conexxion a la base de datos con todos lo metodoss')
    }
}
function imprimirAlertas(mensaje,tipo)
   {
       //validacion para que se muestre solo una vez la alerta
       const alerta=document.querySelector('.alerta')
       if(!alerta) //si no existe la variable alerta entonces que se ejecute, pero si si existe no permitira que se vuleva a mostrar la alerts en la pantalla
       {
                //creando la alerta
            const divmensaje=document.createElement('div');
            divmensaje.classList.add('px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center','border','alerta')
            if(tipo==='error')
            {
                divmensaje.classList.add('bg-red-100','border-red-400','text-red-700');
            }
            else
            {
                divmensaje.classList.add('bg-green-100','border-green-400','text-green-700');

            }
            divmensaje.textContent=mensaje;
            FormularioHTML.appendChild(divmensaje)
            setTimeout(() => {
                divmensaje.remove();
            }, 3000);
       }
       
   }
