function validInput(elem, type='name')
{
    let flagNoCorrect=false
    if (type=='name')
    {
        let regex= (/^[а-яА-ЯA-Za-z]+$/)//\[а-я,А-Я,a-z,A-Z]\
        flagLit=regex.test(elem.value)
        if (elem.value.length<2 || flagLit==false ||
            elem.value[0] !== elem.value[0].toUpperCase())
            {
                flagNoCorrect=true;
            }
            else
            {
                flagNoCorrect=false;
            }
    }
    else if (type=='email')
    {
        flagNoCorrect=!isEmailValid(elem.value)
        function isEmailValid(value) {
            const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            
             // /^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return EMAIL_REGEXP.test(value);
        }
    }
    else if (type=='password')
    {
        flagNoCorrect= elem.value.length < 7 ? true : false;   
    }
    else if (type=='stringSmall')
    {
        flagNoCorrect= elem.value.length < 2 ? true : false;   
    }
    else if (type=='stringLong')
    {
        flagNoCorrect= elem.value.length < 20 ? true : false;   
    }
    else if (type=='noCorrect')
    {
        flagNoCorrect=true;
    }
    else if (type=='correct')
    {
        flagNoCorrect=false;
    }
    selectColor(elem, flagNoCorrect);
  
    return flagNoCorrect==false ? 1 : 0;
}
function selectColor(elem,value)
{
    if (value==true)
    {
        elem.style.color='red';
        elem.style.outline='1px solid red';
        elem.style.border='1px solid red';
    }
    else
    {
        elem.style.color='black';
        elem.style.border='1px solid green';
        elem.style.outline='1px solid green';
    }
}