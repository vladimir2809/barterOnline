var resultNode=document.getElementsByClassName('result')[0];
var resultItemNode=document.querySelector('.result-item');
if (resultItemNode!=undefined)
{
    SendRequest('get', "/getMyBarterArr/", "", function(request){ 
        if (request.response!='')
        {      
            let response=JSON.parse(request.response);
            console.log(response)
            if (response.length==0)
            {
              document.querySelector('.myBarter-title').innerText='У вас нет ни одного бартера!'

            }
            viewsBarterArr(response);
        }
    });
}
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