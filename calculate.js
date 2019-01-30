function add(a,b){
    return a+b;
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
    var result='';
    if(operator=='plus'){
        result=add(a,b);
    }else if(operator=='minus'){
        result=subtract(a,b);
    }else if(operator=='product'){
        result=multiply(a,b);
    }else if(operator=='quotient'){
        result=divide(a,b);
    }
    return result;
}