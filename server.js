const express=require('express');
const app=express();
var fileUpload = require('express-fileupload');
const expressHandlebars =require('express-handlebars');
const {Pool} = require('pg');
var  AES  =  require ( "crypto-js/aes" ) ; 
var  SHA256  =  require ( "crypto-js/sha256" ) ;
const cookieParser=require('cookie-parser');
//console.log (SHA256(" Сообщение")) ;

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
        // console.log (SHA256("Сообщение")) ;
        // console.log(categoryListStr);
      }
      else
      {
        console.log(err);
      }
    })
  })
  const secretCookie='qwerty';

  app.use(fileUpload({}));
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser(secretCookie));
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
    console.log(req.cookies);
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
    //if (SHA256(req.body.registrationPassword+'')===SHA256("1234567") )

    // if (isArraysEqual(SHA256(req.body.registrationPassword),SHA256("1234567")))
    // {
    //   console.log ("CRYPTO YES")

    // }
    //let flagNewUser=false;
    pool.query(`SELECT count(*) FROM tableuser 
                WHERE email='${req.body.registrationEmail+''}'`,(err,resDB)=>{
        if (err==undefined)
        {
          
            console.log(resDB);
            console.log("resDB.rows[0].count ="+resDB.rows[0].count)
            if (resDB.rows[0].count != 0)
            {
              console.log('user repeat registration');
              res.render('registration',{flagModal: true, data: req.body});
              //return;
            }
            else
            {
     //         flagNewUser=true;
                addNewUser ()
            }
        }
    });
    /*
      ЗАПРОС НА РЕГИСТРАЦИЮ НОВОГО ПОЛЬЗОВАТЕЛЯ
    */
   //if (flagNewUser==true)
    function addNewUser ()
    {

        //   let password=(SHA256(req.body.registrationPassword).words.join(','))
        //   console.log(password)
        //   let query=`
        //       INSERT INTO tableuser(name, surname, email, password, role)
        //       VALUES ('${req.body.registrationName+''}',
        //               '${req.body.registrationSurname+''}',
        //               '${req.body.registrationEmail+''}',
        //               '${password}',
        //               'user');
        //   `;
        //   pool.query(query, (err, resDB) =>{
          //       if (err==undefined)
          //       {
            //         console.log("newUser "+req.body.registrationName)
      //       }
      //       else
      //       {
        //         console.log("Error newUser",err);
        //       }
        //   });
        
      res.send('User New');
    }
  })
  /*
    Код отвечаюший за вход пользователя
  */
  app.post('/userIn/', function(req, res){
      console.log("Why inner", req.body.signInLogin);
      pool.query(`SELECT * FROM tableuser
                  WHERE email='${req.body.signInLogin}'`,(err, resDB)=>{
          console.log(resDB)
          let flagError=true;
          if (resDB.rowCount==1)
          {
            let password=(SHA256(req.body.signInPassword).words.join(','))
            let passwordDB=resDB.rows[0].password;
            if (password==passwordDB)
            {
             
              flagError=false;
              res.cookie('user',`${resDB.rows[0].name}  ${resDB.rows[0].surname}`);
              res.send(`Добро пожаловать ${resDB.rows[0].name}  ${resDB.rows[0].surname}`);

            }

          }
          if (flagError==true)
          {
            //res.send(`неверный логин или пароль`);
            res.render('signIn',{flagSignInError: true})
          }
      });

  });
  app.post("/upload/",function(req,res){
    req.files.give_loadImg.mv('views/imgUser/'+req.files.give_loadImg.name);
    console.log(req.files.give_loadImg/*.name*/);
    // console.log(req.body.newStuff__giveName);
    res.send('success');
    //res.render('newBarter');
  })
  
  function isArraysEqual(firstArray, secondArray) {
    return firstArray.toString() === secondArray.toString();
  }