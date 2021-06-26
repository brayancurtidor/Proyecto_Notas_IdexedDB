(function(){
    let DB_global;
    document.addEventListener('DOMContentLoaded',(){
        crearDB();
    });

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
            objectStore.createIndex('nombre','nombre',{unique:false});
            objectStore.createIndex('carnet','carnet',{unique:true});
            objectStore.createIndex('parcial1','parcial1',{unique:false});
            objectStore.createIndex('parcial2','parcial2',{unique:false});
            objectStore.createIndex('examenf','examenf',{unique:false});
            objectStore.createIndex('zona','zona',{unique:false});
            objectStore.createIndex('total','total',{unique:false});
            objectStore.createIndex('id','id',{unique:true});
        
        }
    }
})();