(function(){
let DBGlobal;
const FormularioHTML=document.querySelector('#formulario')
    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();
        FormularioHTML.addEventListener('submit',validarformulario);
    });
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
   function validarformulario(e)
   {
       e.preventDefault();
       //console.log('validando formulario')
       //leer todos los inputs
       const nombreinput=document.querySelector('#nombre').value; //leer el valor en el que el usuario escriba
       const carnetinput=document.querySelector('#carnet').value;
       const Parcial1input=document.querySelector('#Parcial1').value;
       const Parcial2input=document.querySelector('#Parcial2').value;
       const ExamenFinalinput=document.querySelector('#ExamenFinal').value;
       const Zonainput=document.querySelector('#Zona').value;
     
      
        if(nombreinput===''||carnetinput===''|| Parcial1input===''|| Parcial2input===''|| ExamenFinalinput===''|| Zonainput==='')
        {
            imprimirAlertas('Todos los campos son requeridos','error');
            console.log('Todos los campos son requeridos')
       
        }
        else 
        {
            Number(Parcial1input);
            Number(Parcial2input);
            Number(ExamenFinalinput);
            Number(Zonainput);
           
            if(isNaN(Parcial1input)||isNaN(Parcial2input)||isNaN(ExamenFinalinput)||isNaN(Zonainput))
            {
                imprimirAlertas('Todas las calificaciones deben ser datos numericos','error');
                console.log('Todas las calificaciones deben ser datos numericos');

            }else if((Parcial1input)<0||(Parcial2input)<0||(ExamenFinalinput)<0||(Zonainput)<0)
            {
                imprimirAlertas('Las calificaciones no deben ser negativas','error');
                console.log('Las calificaciones no deben ser negativas')
            }
         
            else{
                //const resultadoHTML=document.querySelector('#total')
                //resultadoHTML.textContent=resultado;
                let resultado=parseInt(Parcial1input)+parseInt( Parcial2input)+parseInt(Zonainput)+parseInt(ExamenFinalinput);
                if(resultado>100)
                {
                    imprimirAlertas('La calificacion total es mayor a 100','error');
                }
                else
                {
                    const resultadoHTML=document.querySelector('#total')
                    resultadoHTML.textContent=resultado;

                   
                    //crear un objeto con la informacion obtenida
                    
                    const objetoNotas={nombreinput,carnetinput,Parcial1input,Parcial2input,ExamenFinalinput,Zonainput,resultado,id:Date.now()}
                    //console.log(objetoNotas);
                    crearNuevaNota(objetoNotas);

                   
                }
                
            }
            
        }


   }
   function crearNuevaNota(notas)
   {
        const transaction=DBGlobal.transaction(['progra'],'readwrite');
        const objectStore=transaction.objectStore('progra');
        objectStore.add(notas);
        transaction.onerror=function(){
            console.log('hubo un error');
            imprimirAlertas('Hubo un error  verificar El carnet del estudiante','error');
        };
        transaction.oncomplete=function(){
            //console.log('se agrego correctamente');
            imprimirAlertas('Correcto','exito');
            setTimeout(() => {
              window.location.href='index.html'  
            }, 3000);
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

})();