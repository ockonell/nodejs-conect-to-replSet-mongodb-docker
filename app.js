const express = require('express');
const app = express();
const mongoCli = require('mongodb').MongoClient;
var dtbs;

mongoCli.connect('mongodb://127.0.0.1:27030/?replicaSet=rs0&readPreference=secondaryPreferred',(err, database)=>{
    if(err){
        console.log('1----->>>'+err);
    }else{
        dtbs = database;
        app.listen(3000);
        console.log("--->> Escuchando en puerto 3000");
    }
});

app.get('/',(req, res)=>{
    dtbs.db('nombres').collection('name').find().toArray((err, list)=>{
        if(err){
            res.send(err)
        }else{
            for(let i=0; i<list.length;i++){
                console.log('-> '+ list[i].nombre)
            }            
            res.send(Object.values(list))
        }
    });               
});
