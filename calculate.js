var res=document.getElementById('result');
var a='';
var b='';
var operators=[];
var tmp='';

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

function sendValue(x){   
    if(x=='+') operators+=' +';
    if(x=='-') operators+=' -';
    if(x=='*') operators+=' *';
    if(x=='/') operators+=" /";

    if(x=='='){
        evaluate(res.innerHTML,operators);
    }else{
        res.append(x);
    }
}


function evaluate(result,operators){
    result=result.split(/[ +()*\/:?-]/g);
    operators=operators.split(' ');
    a=result[0];
    for(var i=1; i<operators.length;i++){
        b=result[i];
        if(operators[i]=='/' && b=='0') {
            res.innerHTML="";
            res.append("CANNOT DIVIDE BY ZERO");
            disable();
            return;
        }
        tmp=operate(operators[i],a,b);
        // operators=removeFromArray(operators,operators[i]);
        a=tmp;
    }
    res.innerHTML="";
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