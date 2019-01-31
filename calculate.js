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
        console.log("H");
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


    if(x=='+') operators+=' +';
    if(x=='-') operators+=' -';
    if(x=='*') operators+=' *';
    if(x=='/') operators+=" /";

    if(x=='='){
        evaluate(res.innerHTML,operators);
    }else{
        //if(res.innerHTML==0) {
          //  res.innerHTML=""; 
        //}
    
        res.append(x); 
    }
}


function evaluate(result,operators){
    result=result.split(/[ +()*\/:?-]/g);
    if(operators.length>0) operators=operators.split(' ');
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
        // operators=removeFromArray(operators,operators[i]);
        a=tmp;
    }
    res.innerHTML="";
    tmp=Math.round(tmp*1000)/1000;
    res.append(tmp);  
    refresh();
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

function removeFromArray(arr, removeNum){
    var newArr=[];
    var j=0;
    for(var i=0; i<arr.length;i++){
        if(arr[i] ==removeNum) continue;
        else{
            newArr[j]=arr[i];
            j++;
        }
    }
    return newArr;
}

function disableDecimal(){
    decimal.style.color="beige";
}

function enableDecimal(){
    decimal.style.color="maroon";
}