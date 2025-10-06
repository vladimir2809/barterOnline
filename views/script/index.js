var resultNode=document.getElementsByClassName('result')[0];
// var resultItemNode=document.getElementsByClassName('result-item')[0];
var resultItemNode=document.querySelector('.result-item');
let timePressBtnSearch=0;
let checkboxFree=document.getElementById("checkbox-free");
if (resultItemNode!=undefined)
    {
      
      checkboxFree.addEventListener('change', function(event){
        let inputText=document.getElementById("query-search-get");
        let inputCategory=document.getElementById("category-get");
        if (checkboxFree.checked==true)
        {
          inputText.disabled=true;
          inputCategory.disabled=true;
        }
        else
        {
          inputText.disabled=false;
          inputCategory.disabled=false;
        }
      })
      SendRequest('get', "/getBarterArr/", "", function(request){ 
        if (request.response!='')
        {      
          let response=JSON.parse(request.response);
          console.log(response)
          viewsBarterArr(response);
          // for (let i=response.length-1;i >= 0; i--)
          // {
          //   let cloneResultItem=resultItemNode.cloneNode(true);
          //   let get=cloneResultItem.querySelector('.stuff-get');
          //   get.querySelector(".stuff-get img").src=response[i].get.imagePath;
          //   get.querySelector(".stuff-get .stuff__name").innerText=response[i].get.name;
          //   get.querySelector(".stuff-get .stuff__paragraph").innerText=response[i].get.description;
            
          //   let give=cloneResultItem.querySelector('.stuff-give');
          //   give.querySelector(".stuff-give img").src=response[i].give.imagePath;
          //   give.querySelector(".stuff-give .stuff__name").innerText=response[i].give.name;
          //   give.querySelector(".stuff-give .stuff__paragraph").innerText=response[i].give.description;
          //   resultNode.append(cloneResultItem);
          //   // `UPDATE table_name указывает таблицу, в которой нужно обновить данные.SETcolumn1 = value1, column2 = value2, ... определяет столбцы, которые нужно обновить, и новые значения для них.WHERE condition определяет условие, по которому будут выбраны записи для обновления. Если это ус`
          // }
        }
        document.querySelector('.question-city__close').addEventListener('click',function(){
          document.querySelector('.question-city').style.display='none';
        });
        document.querySelector('.question-city__ok').addEventListener('click',function(){
          document.querySelector('.question-city').style.display='none';
        });
        document.querySelector('.question-city__select').addEventListener('click',function(){
          document.querySelector('.question-city').style.display='none';
          document.querySelector('.city-block').style.display='block';
        });
        let searchButton=document.querySelector('.search__button');
        
        searchButton.addEventListener("click", function(){
            if (searchButton.classList.contains('search__button_disabled')==false)
            {
              timePressBtnSearch=new Date();
              this.classList.add('search__button_disabled');
              let nameGive=document.getElementById('query-search-give').value;
              //query-search-get
              let nameGet=document.getElementById('query-search-get').value;
              let categoryGive=document.getElementById('category-give').value;
              let categoryGet=document.getElementById('category-get').value;
              let checkboxFree=document.getElementById('checkbox-free').checked;

              let dataSearch=JSON.stringify({nameGive:nameGive,
                                            nameGet:nameGet,
                                            categoryGive:categoryGive,
                                            categoryGet:categoryGet,
                                            freeGet: checkboxFree })
              SendRequest('post',"/querySearch/",`data=${dataSearch}`,function(request){
                let response=JSON.parse(request.response);
                console.log(response);
                viewsBarterArr(response, JSON.parse(dataSearch))
              });
            }
          });
     
      // let cloneResultItem=resultItemNode.cloneNode(true);
      // resultNode.append(cloneResultItem);
      // cloneResultItem=resultItemNode.cloneNode(true);
      // resultNode.append(cloneResultItem);
      
      //previewFile();
    });
  }
  setInterval(function(){
    let time=new Date();
    //console.log(time-timePressBtnSearch);
    if (time-timePressBtnSearch>1500)
    {
      document.querySelector('.search__button').classList.remove('search__button_disabled')
    }

  },25)
  function viewsBarterArr(data, dataSearch='')
  {
    //resultNode.innerHTML='';
    //let parentElement = document.getElementById('list'); // Получаем элемент
    // Получаем живую коллекцию дочерних элементов
   //if(resultNode.children.length>0)

    let numChild=resultNode.childElementCount;
    for (let i=0;i<numChild;i++) {
      resultNode.removeChild(resultNode.lastChild);
    }


    //alert(resultNode.childElementCount);
    //alert(data);
    // resultItemNode.style.display='grid';
    for (let i=data.length-1;i >= 0; i--)
    {
     
      let cloneResultItem=resultItemNode.cloneNode(true);
      cloneResultItem.classList.remove('result-item_display-none');
      let get=cloneResultItem.querySelector('.stuff-get');
      get.querySelector(".stuff-get img").src=data[i].get.imagePath;
      let getName=get.querySelector(".stuff-get .stuff__name");
      getName.innerText=data[i].get.name !='null' ?  data[i].get.name : '\u00A0';;
      get.querySelector(".stuff-get .stuff__paragraph").innerText=data[i].get.description != 'null' ?
                                                                  data[i].get.description : '\u00A0';;
      
      let give=cloneResultItem.querySelector('.stuff-give');
      give.querySelector(".stuff-give img").src=data[i].give.imagePath;
      let giveName=give.querySelector(".stuff-give .stuff__name");
      giveName.innerText=data[i].give.name 
      give.querySelector(".stuff-give .stuff__paragraph").innerText=data[i].give.description
      if (dataSearch!='')
      {
        if (dataSearch.nameGet!='')
        {
          //console.log(getName.innerText);
          if (getName.innerText!='\u00A0')
          getName.innerHTML=distinguishTextYellow(dataSearch.nameGet, getName.innerText)
        }
        if (dataSearch.nameGive!='')
        {
          giveName.innerHTML=distinguishTextYellow(dataSearch.nameGive, giveName.innerText)
        }
      }
      resultNode.append(cloneResultItem);
      // `UPDATE table_name указывает таблицу, в которой нужно обновить данные.SETcolumn1 = value1, column2 = value2, ... определяет столбцы, которые нужно обновить, и новые значения для них.WHERE condition определяет условие, по которому будут выбраны записи для обновления. Если это ус`
    }
  }