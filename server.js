const express=require('express');
const app=express();
const {Pool} = require('pg');
const pool = new Pool({
    user: "myuser",
    host: "localhost",
    database: "mydatabase",
    password: "qwerty",
    port: 5432,
  });
  pool.query('SELECT NOW()', (err, res) => {
    if(err) {
      console.error('Error connecting to the database', err.stack);
    } else {
      console.log('Connected to the database:', res.rows);
    }
  })
  app.listen(80, function(){
    console.log('running');
   // console.log(__dirname);
  });
  app.get("/",function(req,res){
    pool.query("SELECT * FROM piople;", (err, resDB) =>{
        res.send(resDB.rows);
    } )
  })