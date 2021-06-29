(function(){
    let DB_global;
    const listado_clinetesHTML=document.querySelector('#listado-clientes');
    document.addEventListener('DOMContentLoaded',()=>{
        crearDB();


        //mostrar la informacion en la bases de datos
        if(window.indexedDB.open('progra',1))
        {
            obtenerNotas();
        }
        listado_clinetesHTML.addEventListener('click',eliminarregistro);


    });
    function eliminarregistro(e) //metodo para cuando se usa un inner html
    {
        if(e.target.classList.contains('eliminar'))
        {
            //dataset es para obtener los datos personalizos,datos que puse desde un inner html
            const idelimnar=Number(e.target.dataset.cliente);
            console.log(idelimnar) //me manda en consola el id que voy a eliminar
            const confirmar=confirm('Seguro que dese elimar este alumno')
            console.log(confirmar); //me da un true o un false dependiendo si le doy si o no
            if(confirmar)
            {
                console.log('eliminando')
                const transaction=DB_global.transaction(['progra'],'readwrite');
                const objectStore=transaction.objectStore('progra');
                objectStore.delete(idelimnar);
                transaction.oncomplete=function(){
                    console.log('eliminacion correcta')
                    e.target.parentElement.parentElement.remove(); //esto por que use inner html
                }
                transaction.onerror=function(){
                    console.log('Error al eliminar')
                   
                    
                }
            }
            else{
                console.log('cancelaste la eliminacion')
                
            }
        }
    }

    function crearDB(){
        const crearbd=window.indexedDB.open('progra',1)
        crearbd.onerror=function(){
            
            console.log('Hubo un problema al crear la base de datos');
        };
        crearbd.onsuccess=function()
        {
            console.log('Base de datos creada')
            DB_global=crearbd.result;
        }
        crearbd.onupgradeneeded=function(e){
            const instabd=e.target.result;
            const objectStore=instabd.createObjectStore('progra',{keyPath:'id', autoIncrement:true});
            objectStore.createIndex('nombreinput','nombreinput',{unique:false});
            objectStore.createIndex('carnetinput','carnetinput',{unique:true});
            objectStore.createIndex('Parcial1input','Parcial1input',{unique:false});
            objectStore.createIndex('Parcial2input','Parcial2input',{unique:false});
            objectStore.createIndex('ExamenFinalinput','ExamenFinalinput',{unique:false}); //estas variables deven ser iguales que las del objeto que crremos
            objectStore.createIndex('Zonainput','Zonainput',{unique:false});
            objectStore.createIndex('resultado','resultado',{unique:false});
            objectStore.createIndex('id','id',{unique:true});
            console.log('base de datos creada y lista')
        
        }
    }
    function obtenerNotas()
    {
        //abrir conexion para ver si todo esta bien
        const abrirconexion2=window.indexedDB.open('progra',1)
        abrirconexion2.onerror=function(){
            console.log('hubo un error');
        }
        abrirconexion2.onsuccess=function(){
            console.log('abriendo bqse de datos corectamente para mostrar los datos');
            DB_global=abrirconexion2.result;
            const objectStore=DB_global.transaction('progra').objectStore('progra');
            objectStore.openCursor().onsuccess=function(e){
               const cursor= e.target.result; //el resultado poor medio de esteevento
                if(cursor)
                {
                    const {nombreinput,carnetinput,Parcial1input,Parcial2input,ExamenFinalinput,Zonainput,resultado,id}=cursor.value //son las variables del objeto que le pase const objetoNotas={nombreinput,carnetinput,Parcial1input,Parcial2input,ExamenFinalinput,Zonainput,resultado,id:Date.now()} linea 72
                    //console.log(cursor.value)
                  
                    listado_clinetesHTML.innerHTML+=`
                            <tr>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombreinput} </p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                        <p class="text-gray-700">${carnetinput}</p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                        <p class="text-gray-600">${Parcial1input}</p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                    <p class="text-gray-600">${Parcial2input}</p>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                    <p class="text-gray-600">${ExamenFinalinput}</p>
                                    </td>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                    <p class="text-gray-600">${Zonainput}</p>
                                    </td>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                    <p class="text-gray-600">${resultado}</p>

                                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar" >Eliminar</a>
                                    </td>
                            </tr>
                    `;
                    cursor.continue();
                }
                else
                {
                    console.log('ya no existev nalores en la bases de datos')

                }
            }
        }
    }
   
})();