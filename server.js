const express=require('express');
const app=express();

var fileUpload = require('express-fileupload');

const expressHandlebars =require('express-handlebars');
const {Pool} = require('pg');
var  AES  =  require ( "crypto-js/aes" ) ; 
var  SHA256  =  require ( "crypto-js/sha256" ) ;
const cookieParser=require('cookie-parser');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
//console.log (SHA256(" Сообщение")) ;

var categoryList=[];
var categoryListStr='';
var categoryListId=[];
var cityList=[];
var dataUser=[];
var cityStart="Москва";
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
pool.query("SELECT * FROM category", (err, resDB) =>{
  if (!err)
  {

    for (let i=0;i<resDB.rows.length;i++)
    {
      categoryList.push(resDB.rows[i].name);
      categoryListId.push(resDB.rows[i].id);
      
    }
    for (let i=0;i<categoryList.length;i++)
    {
      console.log("i: "+i+" id: "+categoryListId[i]+" category: "+categoryList[i]);

    }
    // categoryListStr = `<option value="0" class="search-block__option" selected>Все категории</option>`
    for (let i=0;i<categoryList.length;i++)
    {
        categoryListStr+=`<option value="${i}" class="search-block__option">${categoryList[i]}</option>`
    }
    // console.log (SHA256("Сообщение")) ;
     console.log(categoryListStr);
  }
  else
  {
    console.log(err);
  }
});
function getIdCategoryFromDB(num)
{
  
  for (let i=0;i<categoryListId.length;i++)
  {
    if (num==i)
    {
      return categoryListId[i];
    }
  }
}
pool.query('SELECT * FROM city ORDER BY name',function(err, resDB){
  if (!err)
  {
    for (let i=0;i<resDB.rows.length;i++)
    {
      cityList.push(resDB.rows[i].name);
    }
    //console.log (cityList);
  }
});
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


app.post('/clearCookie/', function(req,res){
  res.clearCookie('user');
  res.clearCookie('userID');
  res.clearCookie('city');
  res.send('cookie Clear')
})
app.get("/",function(req,res){

  

  initDataUser(req.cookies)
  console.log(req.cookies)
  console.log(dataUser[0])
  //console.log(req.cookies.city)
  let data=null;
  let dataCity=false;
  if (dataUser[0]!=undefined)
  {
    data=dataUser[0][0];
  }
  if (Object.keys(req.cookies).length === 0)
  {
    res.cookie('city', cityStart, {maxAge: 1000 * 60 * 60 *24 * 30})
    dataCity=true;
  }
  res.render('index',{categoryList: categoryListStr, dataUser: data, 
                  dataCity: dataCity, cityStart:cityStart});
  //console.log(req.cookies);
})
app.get("/newBarter/",function(req,res){
  let data=null///*req.cookies[0]*/dataUser[0][0];
  if (req.cookies.userID==undefined)
  {
    res.render('signIn');
  }
  if (dataUser[0]!=undefined)
  {
    data=dataUser[0][0];
  }
  res.render('newBarter',{categoryList: categoryListStr, dataUser: data});
})
app.get("/signIn/",function(req,res){

  res.render('signIn');
})
app.get("/registration/",function(req,res){

  res.render('registration');
})
app.get("/exitUser/",function(req,res){
  dataUser[0]=undefined;
  res.clearCookie('user');
  res.clearCookie('userID');
  res.clearCookie('city');
  res.render('index', {flagExit: true});
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

        let password=(SHA256(req.body.registrationPassword).words.join(','))
        console.log(password)
        let query=`
            INSERT INTO tableuser(name, surname, email, password, role)
            VALUES ('${req.body.registrationName+''}',
                    '${req.body.registrationSurname+''}',
                    '${req.body.registrationEmail+''}',
                    '${password}',
                    'user');
        `;
        pool.query(query, (err, resDB) =>{
              if (err==undefined)
              {
                  console.log("newUser "+req.body.registrationName)
          }
          else
          {
              console.log("Error newUser",err);
            }
        });
      
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
            res.cookie('user',`${resDB.rows[0].name}  ${resDB.rows[0].surname}`,{
                      maxAge: 1000 * 60 * 60 * 24 *30,
            });
            res.cookie('userID',`${resDB.rows[0].id}`,{
                      maxAge: 1000 * 60 * 60 * 24 *30,
            });
            dataUser[0]=resDB.rows[0].name;
            route=req.route;
            //res.send(`Добро пожаловать ${resDB.rows[0].name}  ${resDB.rows[0].surname}`);
            res.render('index',{categoryList: categoryList, dataUser: dataUser, route:true})
            // res.writeHead(200, '/index');
            // res.end();

          }

        }
        if (flagError==true)
        {
          //res.send(`неверный логин или пароль`);
          res.render('signIn',{flagSignInError: true})
        }
    });

});
app.post("/saveBarter/", /*upload.single("give_loadImg"),*/ function(req, res, next){
  let stuff={
    name: '',
    category: null,
    imagePath: '000',
    description: '',
  }
  giveStuff=JSON.parse(JSON.stringify(stuff));
  getStuff=JSON.parse(JSON.stringify(stuff));
  let dataForDB={
    userId: null,
    cityName: null,
    // give: stuff,
    // get: stuff,
  }

  
  // Пример использования:
  // console.log(randomName); // Вывод случайного имени, например: "bQ7Z9fWkXp"
  function calcRouteImg(name,numCategory,flag)
  {
    const randomName = generateRandomName(10);
    let type=name.split('.')[1];
    let imgCategory="category"+numCategory+".png";
    if (flag==null) // если картинки нет
    {
      return 'img/default.jpg';
    }
    else if (flag==0)// если картинка есть
    {
      return 'imgUser/'+randomName+'.'+type;
    }
    else if (flag==1) // если картинка должна быть категорией
    {
      return 'img/'+imgCategory;
    }
  }
  function calcPath(flagCategory, numCategory)
  {

    if (flagCategory=='null')
    {
      
      // console.log('not image GIVE + null');
      console.log('image path privat null ');
      return calcRouteImg('',0,null);
    }
    else if (flagCategory==1)
    {
      console.log('image path privat 1 ');
      return calcRouteImg('',numCategory,1);
    }
  }
  console.log(req.body);
  console.log(req.files);
  console.log(req.body.flag_img_category_give+' flag Give');
  console.log(req.body.flag_img_category_get+' flag Get');
  if (req.files!=null)
  {

    if (req.files.give_loadImg!=undefined )
    {
      giveStuff.imagePath=calcRouteImg(req.files.give_loadImg.name,'',0);
      req.files.give_loadImg.mv('views/'+giveStuff.imagePath);
      console.log('image path privat 0 ');      
    }
    else
    {
      giveStuff.imagePath=calcPath(req.body.flag_img_category_give ,req.body.category_load_give);
    }

    if (req.body.get_checkbox!='get_free')
    {

      if (req.files.get_loadImg!=undefined)
      {
        getStuff.imagePath=calcRouteImg(req.files.get_loadImg.name,'',0);
        req.files.get_loadImg.mv('views/'+getStuff.imagePath);
      }
      else
      {
        getStuff.imagePath=calcPath(req.body.flag_img_category_get, req.body.category_load_get);
      }
    } 
    else
    {
      getStuff.imagePath='img/getfree.png';
    }

    //res.send('success');
    //res.render('newBarter');
  }
  if (req.files==null)
  {
    giveStuff.imagePath=calcPath(req.body.flag_img_category_give,req.body.category_load_give);
    if (req.body.get_checkbox!='get_free')
    {
      getStuff.imagePath=calcPath(req.body.flag_img_category_get, req.body.category_load_get);
    }
    else
    {
      getStuff.imagePath='img/getfree.png';
    }
    //res.send('not image file');
  }
  giveStuff.name=req.body.stuff__give__name;
  giveStuff.category=getIdCategoryFromDB(req.body.category_load_give);
  giveStuff.description=req.body.textareaContent_give;

  getStuff.name=req.body.stuff__get__name;
  if (req.body.get_checkbox!='get_free')
  {
    getStuff.category=getIdCategoryFromDB(req.body.category_load_get);
  }
  else
  {
    getStuff.category=getIdCategoryFromDB(0);
  }
  getStuff.description=req.body.textareaContent_get;
  
  dataForDB.userId=req.cookies.userID;
  dataForDB.cityName=req.cookies.city;
  //queryDBcityToId(req.cookies.city/*+'kjh'*/);

  console.log('giveStuff', giveStuff);
  console.log('getStuff', getStuff);
  console.log('dataForDB', dataForDB);
  let query='';
  if (req.body.get_checkbox!='get_free')
  {
    query=`INSERT INTO barter(user_id, city_id, give_name, give_link_image,
                                give_description, give_category_id,
                                get_name, get_link_image,
                                get_description, get_category_id, free) 
              VALUES (${dataForDB.userId},
                      (SELECT id FROM city WHERE '${dataForDB.cityName}' = name),
                      '${giveStuff.name}','${giveStuff.imagePath}',
                      '${giveStuff.description}',${giveStuff.category},
                      '${getStuff.name}','${getStuff.imagePath}',
                      '${getStuff.description}',${getStuff.category},'false');
            `
  }
  else
  {
    query=`INSERT INTO barter(user_id, city_id, give_name, give_link_image,
      give_description, give_category_id,
      get_name, get_link_image,
      get_description, get_category_id, free) 
      VALUES (${dataForDB.userId},
              (SELECT id FROM city WHERE '${dataForDB.cityName}' = name),
              '${giveStuff.name}','${giveStuff.imagePath}',
              '${giveStuff.description}',${giveStuff.category},
              'null','${getStuff.imagePath}',
              'null', ${getStuff.category}, 'true');
      `
  }
  console.log(query);

  pool.query(query, (err, resDB) =>{
    if (!err)
    {
      console.log ("new Barter")
 
    }
    else
    {
      console.log(err);
    }
  });
  //queryDBcityToId(dataForDB.cityId);
  res.redirect("/")
})
var countSearchQuery=0;
app.get('/getBarterArr/', function(req, res){
    let query=` SELECT * FROM barter;`

    pool.query(query, function(err, resDB){
      if (!err)
      {
        console.log(resDB.rows);

        res.send(calcBarterArr(resDB.rows));
      }
      else
      {
        res.send('при чтении данных произошла ошибка')
        console.log(err);
      }
    });
});
app.post('/querySearch/', function(req, res){
    let data=JSON.parse(req.body.data)
    data.nameGive=data.nameGive.toLowerCase();
    data.nameGet=data.nameGet.toLowerCase();
    console.log (data.nameGive, data.nameGet, 
                 data.categoryGive,data.categoryGet ,data.freeGet )
    countSearchQuery++;
    console.log('count search query: '+countSearchQuery);
    let query=`SELECT * FROM barter`;
    let where='';
    let where2='';
    if (data.nameGive=='' && data.nameGet=='' &&
    data.categoryGive==0 && data.categoryGet==0)
    {
      //query=`SELECT * FROM barter;`
      where='';
    }
    if (data.nameGive!=''  &&  data.categoryGive==0 )
    {
      //query=`SELECT * FROM barter WHERE LOWER(give_name) LIKE '%${data.nameGive}%';`
      where=`LOWER(give_name) LIKE '%${data.nameGive}%'`

    }
    if (data.nameGive==''  &&  data.categoryGive!=0 )
    {
      let categoryGive=getIdCategoryFromDB(data.categoryGive)
      //query=`SELECT * FROM barter   WHERE give_category_id = ${categoryGive};`
      where=`give_category_id = ${categoryGive}`;
    }
    if (data.nameGive!='' &&  data.categoryGive!=0 )
    {
      let categoryGive=getIdCategoryFromDB(data.categoryGive)
      // query=`SELECT * FROM barter 
      //       WHERE LOWER(give_name) LIKE '%${data.nameGive}%' AND
      //       give_category_id = ${categoryGive};`
      where =`LOWER(give_name) LIKE '%${data.nameGive}%' AND
              give_category_id = ${categoryGive}`;
    }
    if ( data.nameGet!='' && data.categoryGet==0)
    {
      where2=`LOWER(get_name) LIKE '%${data.nameGet}%'`
    }

    if ( data.nameGet=='' &&  data.categoryGet!=0)
    {
      let categoryGet=getIdCategoryFromDB(data.categoryGet)
      where2=`get_category_id = ${categoryGet}`;
    }
    if ( data.nameGet=='' &&  data.categoryGet!=0)
    {
      let categoryGet=getIdCategoryFromDB(data.categoryGet)
      where2=`get_category_id = ${categoryGet}`;
    }
    if ( data.nameGet!='' &&  data.categoryGet!=0)
    {
      let categoryGet=getIdCategoryFromDB(data.categoryGet)
      // query=`SELECT * FROM barter 
      //       WHERE LOWER(give_name) LIKE '%${data.nameGive}%' AND
      //       give_category_id = ${categoryGive};`
      where2 =`LOWER(get_name) LIKE '%${data.nameGet}%' AND
              get_category_id = ${categoryGet}`;
    }
    if (data.freeGet==true)
    {
      where2 =`free = true`;
    }


    if ( (data.nameGive!='' || data.categoryGive!=0) &&
          ((data.categoryGet!=0 || data.nameGet!='') || data.freeGet==true))
    {
      query=query+' WHERE '+where+' AND '+where2+';';
    }
    else if (where!='')
    {
      query=query+' WHERE '+where+';';
    }
    else if (where2!='')
    {
      query=query+' WHERE '+where2+';';
    }



    // query=query+' WHERE '+where+';';
    console.log(query);
    pool.query(query, function(err, resDB){
      if (!err)
      {
        console.log(resDB.rows);
        res.send(calcBarterArr(resDB.rows));
      }
      else
      {
        console.log(err);
      }
    })
})
function calcBarterArr(rowsDB)
{
  let stuff={
    id:null,
    name: '',
    imagePath: '000',
    description: '',
    category_id: null,
  };
  let barterGiveGet={
    barterId: null,
    userId:null,
    cityId:null,
    free: null,
    give:null,
    get: null,
  }
  let barterGiveGetArr=[];
  for (let i=0;i<rowsDB.length;i++)
  {
    let barterGiveGetOne=JSON.parse(JSON.stringify(barterGiveGet));

    barterGiveGetOne.barterId=rowsDB[i].id;
    barterGiveGetOne.userId=rowsDB[i].user_id;
    barterGiveGetOne.cityId=rowsDB[i].city_id;
    barterGiveGetOne.free=rowsDB[i].free;
    

    let stuffGive=JSON.parse(JSON.stringify(stuff));
    stuffGive.name=rowsDB[i].give_name;
    stuffGive.imagePath=rowsDB[i].give_link_image;
    stuffGive.description=rowsDB[i].give_description;
    stuffGive.category_id=rowsDB[i].give_category_id;
    
    let stuffGet=JSON.parse(JSON.stringify(stuff));
    stuffGet.name=rowsDB[i].get_name;
    stuffGet.imagePath=rowsDB[i].get_link_image;
    stuffGet.description=rowsDB[i].get_description;
    stuffGet.category_id=rowsDB[i].get_category_id;
    
    barterGiveGetOne.give=stuffGive;
    barterGiveGetOne.get=stuffGet;

    barterGiveGetArr.push(barterGiveGetOne);
  }
  return barterGiveGetArr;
}
  app.get('/viewsBarter/', function(req, res){
    res.render('viewsBarter');
  })
  app.post('/listForCity/', function(req,res){
  let result=[];
  //console.log(req);
  key=req.body.key;
  console.log ('Key for city='+key);
  let count=0;
  for (let i=0;i<cityList.length;i++)
  {

    if (cityList[i].indexOf(key+'')==0)
    {
      result.push(cityList[i]);
      count++
      if (count>=10) break;
    }
  }
  console.log(count);
  if (count==0)
  {
    result=null;
  }
  //result=JSON.stringify(cityList);
  res.send(result);
  //res.send('Hello aim ajax response');
});
app.post('/changeCity/',function(req,res){
  let city=req.body.city;
  console.log(req.body);
  console.log(city);
  res.cookie('city',''+city,{
    maxAge: 1000 * 60 * 60 * 24 *30,
  });
  res.send(city);
})
app.post('/getCity/', function(req, res){
  res.send(req.cookies.city);
});
app.post('/ajaxexp/',function(req,res){
  res.send('Hello aim ajax response');
});
// function queryDBcityToId(nameCity)
// {
//   let result=555;
//   pool.query(`SELECT id FROM city WHERE  '${nameCity}' = name;`, (err, resDB) =>{
//     if (!err)
//     {
//       console.log(resDB);
//       if (resDB.rowCount==1)
//       {

//         result=resDB.rows[0].id;
//         console.log(result);
//         return result;
//       }
//       // else
//       // {
//       //   result=null;

//       // }
//       // for (let i=0;i<resDB.rows.length;i++)
//       // {
//       //   categoryList.push(resDB.rows[i].name);
        
//       // }
//       // console.log(categoryList);
//       // categoryListStr = `<option value="1" class="search-block__option" selected>Все категории</option>`
//       // for (let i=0;i<categoryList.length;i++)
//       // {
//       //     categoryListStr+=`<option value="${i+2}" class="search-block__option">${categoryList[i]}</option>`
//       // }
//       // // console.log (SHA256("Сообщение")) ;
//       // // console.log(categoryListStr);
//     }
//     else
//     {
//       console.log(err);
//       return null;
//       //result=null;
//     }
//     // return result;
//   });
// }
function isArraysEqual(firstArray, secondArray) {
  return firstArray.toString() === secondArray.toString();
}
function initDataUser(cookie)
{
  dataUser[0]=cookie.user;
}
function generateRandomName(length)
{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
/*
08.08.2025 останивился на том что подготавливал данные бартера для записи в БД

12.09.2025 остановился на побдоре условий для поискка по категориям
*/
