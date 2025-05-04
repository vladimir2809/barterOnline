const express=require('express');
const app=express();
const expressHandlebars =require('express-handlebars');
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

  const handlebars = expressHandlebars.create({
    defaultLayout: 'main', 
    extname: 'hbs'
  });


  app.engine('hbs', handlebars.engine);
  app.set('view engine', 'hbs');


  app.listen(80, function(){
    console.log('running');
   // console.log(__dirname);
  });
  app.use(express.static(__dirname + '/views/'))



  app.get("/",function(req,res){
    // pool.query("SELECT * FROM piople;", (err, resDB) =>{
    //     res.send(resDB.rows);
    // } )
    res.render('index');
  })
  app.get("/newBarter/",function(req,res){

      res.render('newBarter');
  })