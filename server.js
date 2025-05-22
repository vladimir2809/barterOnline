const express=require('express');
const app=express();
var fileUpload = require('express-fileupload');
const expressHandlebars =require('express-handlebars');
const {Pool} = require('pg');

var categoryList=[];
var categoryListStr='';
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
    pool.query("SELECT * FROM category", (err, resDB) =>{
      if (!err)
      {

        for (let i=0;i<resDB.rows.length;i++)
        {
          categoryList.push(resDB.rows[i].name);
          
        }
        console.log(categoryList);
        categoryListStr = `<option value="1" class="search-block__option" selected>Все категории</option>`
        for (let i=0;i<categoryList.length;i++)
        {
            categoryListStr+=`<option value="${i+2}" class="search-block__option">${categoryList[i]}</option>`
        }
        // console.log(categoryListStr);
      }
      else
      {
        console.log(err);
      }
    })
  })
  
  app.use(fileUpload({}));
  app.use(express.urlencoded({ extended: true }))
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
    res.render('index',{categoryList: categoryListStr});
  })
  app.get("/newBarter/",function(req,res){

    res.render('newBarter',{categoryList: categoryListStr});
  })
  app.get("/signIn/",function(req,res){

    res.render('signIn');
  })
  app.get("/registration/",function(req,res){

    res.render('registration');
  })
  app.get("/test/",function(req,res){
    pool.query(`SELECT * FROM city;`, (err, resDB) =>{
      if (!err)
      {

        let result=[];
        for (let i = 0; i < resDB.rows.length; i++)
        {
          let value=resDB.rows[i].name;
          console.log('i='+i,resDB.rows[i]);
          result+=`<li>${value}</li>`;
        }
        res.render('newBarter',{result: result})
      
      }
      else
      {
        console.log(err);
      }
    })
  });
  app.post("/newUser/",(req, res)=>{
    console.log(req.body);
    res.send('User New');
  })
  app.post("/upload/",function(req,res){
    req.files.give_loadImg.mv('views/imgUser/'+req.files.give_loadImg.name);
    console.log(req.files.give_loadImg/*.name*/);
    // console.log(req.body.newStuff__giveName);
    res.send('success');
    //res.render('newBarter');
  })