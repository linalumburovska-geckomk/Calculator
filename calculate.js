(function(){
    "use strict";

    var res=document.getElementById('result');
    var decimal=document.getElementById('decimal');
    var a='';
    var b='';
    var operators=[];
    var tmp='';
    var firstZero=false;
    
    //Ability to use keyboard besides clicking on each button
    document.addEventListener("keypress",function(event) {
        console.log(event.keyCode);
        if(event.keyCode===48) {
            sendValue('0','false');
        } else if(event.keyCode===49) {
            sendValue('1','false');
        } else if(event.keyCode===50) {
            sendValue('2','false');
        } else if(event.keyCode===51) {
            sendValue('3','false');
        } else if(event.keyCode===52) {
            sendValue('4','false');
        } else if(event.keyCode===53) {
            sendValue('5','false');
        } else if(event.keyCode===54) {
            sendValue('6','false');
        } else if(event.keyCode===55) {
            sendValue('7','false');
        } else if(event.keyCode===56) {
            sendValue('8','false');
        } else if(event.keyCode===57) {
            sendValue('9','false');
        } else if(event.keyCode===43) {
            sendValue('+','false');
        } else if(event.keyCode===45) {
            sendValue('-','false');
        } else if(event.keyCode===42) {
            sendValue('*','false');
        } else if(event.keyCode===47) {
            sendValue('/','false');
        } else if(event.keyCode===46) {
            sendValue('.','true');
        } else if(event.keyCode===13) {
            sendValue('=','false');
        }
        
    });
    
    //Sending values on click to execute the result
    document.querySelectorAll('.number.all').forEach((element) => element.addEventListener('click',function(){
        if(element.innerHTML==='.') {
            sendValue(element.innerHTML,'true');
            disableDecimal();
        } else if(numberOrSign(element.innerHTML)==='1' && element.innerHTML!='.') {
            sendValue(element.innerHTML,'false');
            enableDecimal();
        } else {
            sendValue(element.innerHTML,'false');
        }
        
    }));
    
    //Clear buttons on click
    document.querySelectorAll('.delete').forEach((element) => element.addEventListener('click',function(){
        if(element.innerHTML==='Clear') {
            clearField();
        } else {
            clearCharacter();
        } 
    }));
    
    //-------------------------
    
    //Adding two integers
    function add(a,b) {
        return parseFloat(a) + parseFloat(b);
    }
    
    //Subtracting two integers
    function subtract(a,b) {
        return a-b;
    }
    
    //Multiplying two integers
    function multiply(a,b) {
        return a*b;
    }
    
    //Dividing two integers
    function divide(a,b) {
        return a/b;
    }
    
    //Function which takes an operator, two integers and calls a suitable function for executing the operation
    function operate(operator,a,b) {
        if(operator==='+'){
            tmp=add(a,b);
        } else if(operator==='-') {
            tmp=subtract(a,b);
        } else if(operator==='*') {
            tmp=multiply(a,b);
        } else if(operator==='/') {
            tmp=divide(a,b);
        }
        return tmp;
    }
    
    //Function that gets the value for the clicked button and appends it to the result. 
    //Also, this functions does all the necessary checking if the input is valid
    function sendValue(x,zero) { 
        if(zero==='true') {
            firstZero=false;
            x='.';
            var countDecimals=0;
            var countSigns=0;
            for(var i=0;i<res.innerHTML.length;i++) {
                if(res.innerHTML[i]==='.') {
                    countDecimals++;
                }
                if(numberOrSign(res.innerHTML[i])===1) {
                    countSigns++;
                }
            }
            if(countDecimals>0 && x==='.' && countSigns===1) {
                return;
            }else {
                res.append(x);
                return;
            }
        }
        
        if(x==='=') {
            evaluate(res.innerHTML,operators);
        } else {
            var previousCharacter=res.innerHTML[res.innerHTML.length-1];
            if((numberOrSign(previousCharacter)==='1' && numberOrSign(x)==='1')) {
                return;
            } else {
                if(x==='+') {
                    operators+=' +';
                } 
                if(x==='-') {
                    operators+=' -';
                }
                if(x==='*') {
                    operators+=' *';
                }
                if(x==='/') {
                    operators+=" /";
                } 
            }
            res.append(x); 
        }
    }
    
    //Function that evaluates the result (positive and negative integers) according to the operators
    function evaluate(result,operators) {
        if(tmp<0 && checkIfMinus(operators)) {
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
        } else if(tmp<0 && !checkIfMinus(operators)) {
            var newA=[];
            newA=result.split(/[-+/]/g);
            if(newA[newA.length-1]==='0') {
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
        } else {
            result=result.split(/[ +()*\/:?-]/g);
        }
        
        if(operators.length>0) {
            operators=operators.split(' ');
        }
       
        a=result[0];
        for(var i=1; i<operators.length;i++) {
            b=result[i];
            if(operators[i]==='/' && b==='0') {
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
    
    //Function that checks if there is a minus sign in the result because there is a difference between minus as operator and minus as sign for negative numbers
    function checkIfMinus(arr) {
        for(var i=0; i<arr.length;i++){
            if(arr[i]==='-') return true;
        }
        return false;
    }
    
    //Function that refreshes the table with operators
    function refresh() {
        operators=[];
    }
    
    //Function that disables all buttons when dividing by zero
    function disable() {
        var buttons=document.getElementsByClassName('number');
        var rows=document.getElementsByClassName('row');
        for(var i=0; i<rows.length;i++) {
            rows[i].style.display="none";
        }
        for(var i=0; i<buttons.length;i++) {
            buttons[i].style.display="none";
        }
        
    }
    
    //Function that clears the result field
    function clearField() {
        res.innerHTML="";
        var buttons=document.getElementsByClassName('number');
        var rows=document.getElementsByClassName('row');
        for(var i=0; i<rows.length;i++) {
            rows[i].style.display="";
        }
        for(var i=0; i<buttons.length;i++) {
            buttons[i].style.display="";
        }
        refresh();
        enableDecimal();
    }
    
    // Disables the decimal button
    function disableDecimal() {
        decimal.style.display="none";
    }
    
    // Enables the decimal button
    function enableDecimal() {
        decimal.style.display="";
    }
    
    //Return if the character is digit or operator
    function numberOrSign(character) {
        //0 number
        //1 sign
        if(character==='1' || character==='2' || character==='3' || character==='4' || character==='5' || character==='6' || character==='7' || character==='8' || character==='9'){
            return '0';
        }else if(character==='+' || character==='-' || character==='*'|| character==='/' || character==='.'){
            return '1';
        }
        return -1;
    }
    
    //Enables clearing the last character instead of clearing the whole result field
    function clearCharacter() {
       var newString='';
       for(var i=0; i<res.innerHTML.length-1; i++){
           newString+=res.innerHTML[i];
       }
       res.innerHTML=newString;
    }
})();
