var res=document.getElementById('result');
var decimal=document.getElementById('decimal');
var a='';
var b='';
var operators=[];
var tmp='';
var onceClicked=false;
var firstZero=false;

function add(a,b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator,a,b){
    if(operator=='+'){
        tmp=add(a,b);
    }else if(operator=='-'){
        tmp=subtract(a,b);
    }else if(operator=='*'){
        tmp=multiply(a,b);
    }else if(operator=='/'){
        tmp=divide(a,b);
    }
    return tmp;
}

function sendValue(x,zero){ 
    if(zero==='true'){
        firstZero=false;
        x='.';
        res.append(x);
        return;
    }
    
    
    if(x.charAt(0)==0 && x.length>1){
        if(x.charAt(1)==7 || x.charAt(1)==8 || x.charAt(1)==9 || x.charAt(1)==4 || x.charAt(1)==5 || x.charAt(1)==6 || x.charAt(1)==1 || x.charAt(1)==2 || x.charAt(1)==3){
            x=x.slice(1);
        }
    }

    if(x=='='){
        evaluate(res.innerHTML,operators);
    }else{
        
        var previousCharacter=res.innerHTML[res.innerHTML.length-1];
        if((numberOrSign(previousCharacter)=='1' && numberOrSign(x)=='1')){
            return;
        }else{
            if(x=='+'){
                operators+=' +';
            } 
            if(x=='-') {
                operators+=' -';
            }
            if(x=='*') {
                operators+=' *';
            }
            if(x=='/'){
                operators+=" /";
            } 
        }
        res.append(x); 
    }
}


function evaluate(result,operators){
   
    if(tmp<0 && checkIfMinus(operators)){
        result=result.split(/[ +()*\/:?]/g);
        a=result[0];
        var newA=[];
        newA=a.split(/[-]/g);

        a=Math.round( newA[1] * 1000 ) / 1000;
        b=Math.round( newA[2] * 1000 ) / 1000;
        tmp=operate('+',a*(-1),b*(-1));
        a=tmp;
        res.innerHTML="";
        tmp=Math.round(tmp*1000)/1000;
        res.append(tmp);  
        refresh();
        return;
    }else if(tmp<0 && !checkIfMinus(operators)){
        var newA=[];
        newA=result.split(/[-+/]/g);
        if(newA[newA.length-1]=='0') {
            res.innerHTML="";
            res.append("CANNOT DIVIDE BY ZERO");
            disable();
            return;
        }

        a=Math.round( newA[1] * 1000 ) / 1000;
        b=Math.round( newA[2] * 1000 ) / 1000;
        tmp=operate('-',a,b);
        a=tmp;
        res.innerHTML="";
        tmp=Math.round(tmp*1000)/1000;
        res.append(tmp*(-1));  
        refresh();
        return;
    }
    else{
        result=result.split(/[ +()*\/:?-]/g);
    }
    
    if(operators.length>0) {
        operators=operators.split(' ');
    }
   
    
    a=result[0];


    for(var i=1; i<operators.length;i++){
        b=result[i];
        if(operators[i]=='/' && b=='0') {
            res.innerHTML="";
            res.append("CANNOT DIVIDE BY ZERO");
            disable();
            return;
        }
        a=Math.round( a * 1000 ) / 1000;
        b=Math.round( b * 1000 ) / 1000;
        tmp=operate(operators[i],a,b);
        a=tmp;
    }
    res.innerHTML="";
    tmp=Math.round(tmp*1000)/1000;
    res.append(tmp);  
    refresh();
}

function checkIfMinus(arr){
    for(var i=0; i<arr.length;i++){
        if(arr[i]=='-') return true;
    }
    return false;
}


function refresh(){
    operators=[];
}

function disable(){
    var buttons=document.getElementsByClassName('number');
    var rows=document.getElementsByClassName('row');
    for(var i=0; i<rows.length;i++){
        rows[i].style.display="none";
    }
    for(var i=0; i<buttons.length;i++){
        buttons[i].style.display="none";
    }
    
}

function clearField(){
    res.innerHTML="";
    var buttons=document.getElementsByClassName('number');
    var rows=document.getElementsByClassName('row');
    for(var i=0; i<rows.length;i++){
        rows[i].style.display="";
    }
    for(var i=0; i<buttons.length;i++){
        buttons[i].style.display="";
    }
    refresh();
    enableDecimal();
}


function disableDecimal(){
    decimal.style.display="none";
}

function enableDecimal(){
    decimal.style.display="";
}

function numberOrSign(character){
    //0 number
    //1 sign
    if(character=='1' || character=='2' || character=='3' || character=='4' || character=='5' || character=='6' || character=='7' || character=='8' || character=='9'){
        return '0';
    }else if(character=='+' || character=='-' || character=='*'|| character=='/' || character=='.'){
        return '1';
    }
    return -1;
}

function clearCharacter(){
   var newString='';
   for(var i=0; i<res.innerHTML.length-1; i++){
       newString+=res.innerHTML[i];
   }
   res.innerHTML=newString;
}