const express=require('express');
const app=express();
var fileUpload = require('express-fileupload');
const expressHandlebars =require('express-handlebars');
const {Pool} = require('pg');
const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "barter_online",
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
  
  app.use(fileUpload({}));
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
  app.get("/test/",function(req,res){

    pool.query(`SELECT * FROM city;`, (err, resDB) =>{
      if (!err)
      {

        let result=[];
        for (let i=1; i < resDB.rows.length; i++)
        {
          let value=resDB.rows[i].name;
          console.log('i='+i,resDB.rows[i]);
          result.push(`<li>${value}</li>`)
          //if (i==1001) break;
        }
        res.send(result);             
      }
      else
      {
        console.log(err);
      }
      })
      // res.render('newBarter');
  })
  app.post("/upload/",function(req,res){
    req.files.give_loadImg.mv('views/imgUser/'+req.files.give_loadImg.name);
    console.log(req.files.give_loadImg/*.name*/);
    // console.log(req.body.newStuff__giveName);
    res.send('success');
    //res.render('newBarter');
  })