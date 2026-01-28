var buttonChange = document.querySelector('.views-barter__button-change');
var buttonAuthor = document.querySelector('.barter__button-author')
if (buttonChange!=undefined)
{
    buttonChange.addEventListener('click', function(){
        const params = new URLSearchParams(window.location.search);
        //alert(params.get('barter_id'));
        window.location.href='/changebarter?barter_id='+params.get('barter_id');
    });
}
// document.querySelector('.barter__button-author')
if (buttonAuthor!=undefined)
{
    buttonAuthor.addEventListener('click', function(){
        const params = new URLSearchParams(window.location.search);
        let barterUserId=document.getElementById('barterUserId').value;
        let data={
            'sender': barterUserId,
            'barter_id': params.get('barter_id')
        }
    // SendRequest('POST', '/newRecipient/', `data=${data}`,function(request){

        // console.log('сообшение отправленно ' + request.response)
        window.location.href=`/messanger?messageNow=true&sender=${data.sender}&barter_id=${data.barter_id}`;
        //});
        // alert (barterUserId)
        //alert(params.get('barter_id'));
        // window.location.href='/changebarter?barter_id='+params.get('barter_id');
        // SendRequest('POST', 'newRecipient', )
    });
}