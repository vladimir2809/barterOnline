var resultNode=document.getElementsByClassName('result')[0];
var resultItemNode=document.querySelector('.result-item');
let timePressBtnSearch=0;
let checkboxFree=document.getElementById("checkbox-free");
let title=document.querySelector('.title-label');
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
          if (response.length==0)
          {
            title.innerText='В этом городе бартеров нет!'

          }
          viewsBarterArr(response);
        }
      });

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
              if (response.length==0)
              {
                title.innerText='По результату поиска бартеров нет!'
    
              }
              else
              {
                title.innerText='Результат поиска:'
              }
              viewsBarterArr(response, JSON.parse(dataSearch))
            });
          }
        });
    
  }
  setInterval(function(){
    let time=new Date();
    if (time-timePressBtnSearch>1500)
    {
      document.querySelector('.search__button').classList.remove('search__button_disabled')
    }

  },25)
  function viewsBarterArr(data, dataSearch='')
  {
    let numChild=resultNode.childElementCount;
    for (let i=0;i<numChild;i++) {
      resultNode.removeChild(resultNode.lastChild);
    }
    for (let i=data.length-1;i >= 0; i--)
    {
     
      let cloneResultItem=resultItemNode.cloneNode(true);
      cloneResultItem.barterId=data[i].barterId;
      cloneResultItem.classList.remove('result-item_display-none');
      let get=cloneResultItem.querySelector('.stuff-get');
      get.querySelector(".stuff-get img").src=data[i].get.imagePath;
      let getName=get.querySelector(".stuff-get .stuff__name");
      getName.innerText=data[i].get.name !='null' ?  data[i].get.name : '\u00A0';;
      //getName.innerText=data[i].get.name !='undefined' ?  data[i].get.name : '\u00A0';;
      get.querySelector(".stuff-get .stuff__paragraph").innerText=data[i].get.description != 'null'  ?
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
    }
    Array.from(resultNode.children).forEach(element => {
      element.addEventListener('click', function(event){
        let id=element.barterId;
        location.href='/viewsBarter?barter_id='+id;
        // SendRequest('get', "/viewsBarter/", "id="+id, function(request){

        // });
      })
    });
  }