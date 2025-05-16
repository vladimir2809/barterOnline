const {Pool} = require('pg');
const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "barter_online",
  password: "qwerty",
  port: 5432,
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// const dom = new JSDOM('',{
//         url: __dirname+"/city_list.html",
//         referrer:__dirname+"/city_list.html",
//         contentType: "text/html",
//         includeNodeLocations: true,
//         storageQuota: 10000000,
//     });
  
//   const document = dom.window.document;
//   const bodyEl = document.body; // implicitly created
//   const pEl = document.querySelector(".geolocation__region-name");
// //   const textNode = pEl.firstChild;
// //   const imgEl = document.querySelector("img");
  
//   console.log(__dirname+"/city_list.html");
//   console.log(dom.window.document);

//   console.log(dom.nodeLocation(bodyEl));   // null; it's not in the source
//   console.log(dom.nodeLocation(pEl));      // { startOffset: 0, endOffset: 39, startTag: ..., endTag: ... }
//   console.log(dom.nodeLocation(textNode)); // { startOffset: 3, endOffset: 13 }
//   console.log(dom.nodeLocation(imgEl));    // { startOffset: 13, endOffset: 32 }



/*
    кОД ОТВЕЧАЮШИЙ ЗА ВСТАВКУ ГОРОДОВ РОССИИ В БАЗУ ДАННЫХ
*/
// JSDOM.fromFile("city_list.html", {}).then(dom => {
//     // console.log(dom.serialize());
//     const document = dom.window.document;
//     const bodyEl = document.body; // implicitly created
//     const elems = document.querySelectorAll(".block-uicatalog__content li:not(.fname)>a");
//     console.log(elems);
//     list=[];
//     for (let i=0;i<elems.length;i++)
//     {
//         list.push(elems[i].innerHTML);
//     }
//     list.sort();
//     for (let i=0;i<list.length;i++)
//     {
        
//         //console.log('i='+i+' value='+list[i]);
//         pool.query(`INSERT INTO city(name) VALUES ('${list[i]}')`, (err, resDB) =>{
//             console.log("error= "+err);
//         } )
//     }
//   })