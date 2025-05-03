var resultNode=null;
var resultItemNode=null;
window.addEventListener('load',()=>{
    resultNode=document.getElementsByClassName('result')[0];
    resultItemNode=document.getElementsByClassName('result-item')[0];
    let cloneResultItem=resultItemNode.cloneNode(true);
    resultNode.append(cloneResultItem);
    cloneResultItem=resultItemNode.cloneNode(true);
    resultNode.append(cloneResultItem);
});