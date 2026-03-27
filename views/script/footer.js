instructionElem = document.getElementById('footerInstruction');
rulesElem=document.getElementById('footerRules');
feedbackForm = document.getElementById('feedbackForm');

instructionElem.addEventListener('click', function(event){
    window.location.href='/instruction/';
})
rulesElem.addEventListener('click', function(event){
    window.location.href='/rules/';
})
document.getElementById("footerThank").addEventListener('click', function(){
    document.getElementsByClassName('thank')[0].style.display="block";
})

document.getElementById('footerFeedback').addEventListener('click', function(){
    document.getElementById('feedback').style.display='block';
})
document.getElementById('feedbackCancel').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('feedback').style.display='none';
})
feedbackForm.addEventListener('submit',function(event){
    event.preventDefault();
    const formData = new FormData(feedbackForm);
    let data = Object.fromEntries(formData);
    console.log (data)
    if (data.feedbackName != '' && data.feedbackText != '')
    {
        data=JSON.stringify(data);
        SendRequest('POST', '/feedback/',`data=${data}`,function(request){
            let response=request.response;
            console.log(response);
            if (response == "success")
            {
                feedbackForm.reset();
                document.getElementById('feedback').style.display='none';  
            }
        });
    }
})