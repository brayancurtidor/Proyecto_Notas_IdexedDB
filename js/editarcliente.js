(function(){
 let DBGlobal;
 let idalumno;
        const nombreinputedicion=document.querySelector('#nombre')
       const carnetinputedicion=document.querySelector('#carnet')
       const Parcial1inputedicion=document.querySelector('#Parcial1')
       const Parcial2inputedicion=document.querySelector('#Parcial2')
       const ExamenFinalinputedicion=document.querySelector('#ExamenFinal')
       const Zonainputedicion=document.querySelector('#Zona')
       const resultadoedicion=document.querySelector('#total')
       const formularioHTML=document.querySelector('#formulario')
    document.addEventListener('DOMContentLoaded',()=>{
        ConectarDB();
        //actualizar cuando se le de al boton
        formularioHTML.addEventListener('submit',Actualizaralumno);


        //vrificar los ID de la url
        //URLSearchParams=buscar o ver que paramtros hay disponibes en la URL
        //window.location.search me da los parametros disponibles, en este caso el id
        const parametrosURL=new URLSearchParams(window.location.search)
         idalumno=parametrosURL.get('id') //tomamos el parametros id 
        //console.log(idalumno);
        if(idalumno)
        {
            setTimeout(() => { //lo metemos en uno de stos ya que se tarda en hacer la consulta si n o nos da un error
                obteneralumnosporids(idalumno)
            }, 500);
            
        }
    });
    function obteneralumnosporids(id)
    {
        //console.log(id); //obteniedo la id desde la funcion
        //obter la informacion del cliente
        const transaction=DBGlobal.transaction(['progra'],'readwrite')
        const objectStore=transaction.objectStore('progra');
        //console.log(objectStore); ver la informacion de object store
        const alumno=objectStore.openCursor();
        alumno.onsuccess=function(e)
        {
         const cursor=e.target.result;
         if(cursor) //si existe informacion en el curso
         {
             //console.log(cursor.value) //aqui me trae todos los registros de la base de datos
             if(cursor.value.id===Number(id)) //hacer un where con un if
             {
                console.log(cursor.value) //muestra solo el registro con el id 
                llenarFormulario(cursor.value);
             }
             
             cursor.continue();
         }
                
            
        }
    }
    function ConectarDB()
    {
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
    function llenarFormulario(datosalumno)
    {
        //estos datos son la del objeto que se creo, solo que se mando como parametro en un llamado de esta funcion
       const {nombreinput,carnetinput,Parcial1input,Parcial2input,ExamenFinalinput,Zonainput,resultado,id}=datosalumno
       nombreinputedicion.value=nombreinput; //llenado los inputo segun el id
       carnetinputedicion.value=carnetinput; //llenado los inputo segun el id
       Parcial1inputedicion.value=Parcial1input; //llenado los inputo segun el id
       Parcial2inputedicion.value=Parcial2input; //llenado los inputo segun el id
       ExamenFinalinputedicion.value=ExamenFinalinput; //llenado los inputo segun el id
       Zonainputedicion.value=Zonainput; //llenado los inputo segun el id
       resultadoedicion.textContent=resultado; //llenado los inputo segun el id
    }
    function Actualizaralumno(e)
    {
        e.preventDefault();
        if(nombreinputedicion.value===''||carnetinputedicion.value===''|| Parcial1inputedicion.value===''|| Parcial2inputedicion.value===''|| ExamenFinalinputedicion.value===''|| Zonainputedicion.value==='')
        {
            imprimirAlertas('Todos los campos son requeridos','error');
            //console.log('Todos los campos son requeridos')
       
        }
        else 
        {
            Number(Parcial1inputedicion);
            Number(Parcial2inputedicion);
            Number(ExamenFinalinputedicion);
            Number(Zonainputedicion);
      
           
            if(isNaN(Parcial1inputedicion.value)||isNaN(Parcial2inputedicion.value)||isNaN(ExamenFinalinputedicion.value)||isNaN(Zonainputedicion.value))
            {


    
                imprimirAlertas('Todas las calificaciones deben ser datos numericos','error');
                //console.log('Todas las calificaciones deben ser datos numericos');

            }else if((Parcial1inputedicion.value)<0||(Parcial2inputedicion.value)<0||(ExamenFinalinputedicion.value)<0||(Zonainputedicion.value)<0)
            {
                imprimirAlertas('Las calificaciones no deben ser negativas','error');
               // console.log('Las calificaciones no deben ser negativas')



            }
         
            else{
                //const resultadoHTML=document.querySelector('#total')
                //resultadoHTML.textContent=resultado;
                let resultado=parseInt(Parcial1inputedicion.value)+parseInt( Parcial2inputedicion.value)+parseInt(Zonainputedicion.value)+parseInt(ExamenFinalinputedicion.value);
                
                if(resultado>100)
                {
                    imprimirAlertas('La calificacion total es mayor a 100','error');
                    //console.log('el valor es mayor a 100')
                }
                else
                {
                    console.log('pasando la validacion')

                    resultadoedicion.textContent=resultado;

                   //************actualizar alumno**********
                   //crear un objeto con los valores del input
                    const AlumnoActualizado={
                        nombreinput:nombreinputedicion.value,
                        carnetinput:carnetinputedicion.value,
                        Parcial1input:Parcial1inputedicion.value,
                        Parcial2input:Parcial2inputedicion.value,
                        ExamenFinalinput:ExamenFinalinputedicion.value,
                        Zonainput:Zonainputedicion.value,
                        resultado:Number(resultado), //se convierte en numero ya que si da no definido
                        id:Number(idalumno) //se convierte el id en numero ya la variable global idalumno esta en string sin esto no se puede atualizar
                        
                    }
                    const transaction=DBGlobal.transaction(['progra'],'readwrite');
                    const objectStore=transaction.objectStore('progra');
                    objectStore.put(AlumnoActualizado);
                    transaction.oncomplete=function()
                    {
                        console.log('editado correctamente')
                        imprimirAlertas('La edicion fue exitosa','exito');
                        setTimeout(() => {
                            window.location.href='index.html'  
                          }, 3000);
                    }
                    transaction.onerror=function(){
                        console.log('no se puede actualizar')
                        imprimirAlertas('El carnet no pertence al alumno','error');
                    }
                   

                   
                }
                
            }
            
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
            formularioHTML.appendChild(divmensaje)
            setTimeout(() => {
                divmensaje.remove();
            }, 3000);
       }
       
   }




})();
        
    /*nombreinputedicion
       carnetinputedicion
       Parcial1inputedicion
       Parcial2inputedicion
       ExamenFinalinputedicion
       Zonainputedicion
       resultadoedicion*/
