export const FoxRandomString = new Object({
 
  special_chars:'+-@!%*}[/)$#(>=~^:?;',
  url_safe:'-_.~.~_-',
  numbers: '01234567890123456789',
  lowercase: 'abcdefghijklmnopqurstwvxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQURSTWVXYZ',
  hex: '0A16B278C3D4E5F9',
  mixPat: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[_$@.\+\W])[a-zA-Z0-9\W]{1,}$/,
  ulnPat: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{1,}$/,
  type: 'mix',// mix, num, lwr, upr, uln, hex
  length: 4, 
  arr: undefined,
  setLength: function(i){
    const val = parseInt(i);
    if (val < 4 || isNaN(val)){
      return 4;
    }
    else{
      return val;      
    }
  },
  setType: function(t){    
    switch(true){      
      case t == 'arr':
        return 'arr';
      case /^int\(\d{1,},\d{1,}\)$/.test(t):          
        return 'int';
      case (t[0] == '['):        
        return 'cus';
      case t == 'num':
        return 'num';
      case t == 'lwr':
        return 'lwr';
      case t == 'upr':
        return 'upr';
      case t == 'uln':
        return 'uln';
      case t == 'hex':
        return 'hex';
      case t == 'urs':
        return 'urs';
      case t == ' ':
        return 'non';      
      default:
        return 'mix';
    }    
  },
  setSelection: function(t){
    switch(t){
      case 'non':
        return ' ';
      case 'arr':
        return this.arr;
      case 'num':
        return this.numbers;
      case 'lwr':
        return this.lowercase;
      case 'upr':
        return this.uppercase;
      case 'uln':
        return this.uppercase+this.lowercase+this.numbers;
      case 'hex':
        return this.hex;
      case 'urs':
        return this.uppercase+this.lowercase+this.numbers+this.url_safe;
      default:
        return this.lowercase+this.uppercase+this.numbers+this.special_chars;
    }    
  },
  genRand: function(x){
    return Math.floor(Math.random() * Math.floor(x));
  },
  testOutput: function(type,output){    
    switch (type){      
      case 'mix':
        return this.tested(this.mixPat,output);
      case 'uln':
        return this.tested(this.ulnPat,output);
      case 'urs':
        return this.tested(this.mixPat,output);
      default:
        return output;
    }    
  },
  tested: function(pat,input){
    const re = new RegExp(pat);    
    if(!input.match(re)){      
      return this.filledSlots(input,this.type);
    }
    else{      
      return input;
    }
  },
  filledSlots: function(input, type){
    if (type == 'mix' || type == 'uln' || type == 'urs'){
      const slots = this.getSlots(input.length, type);
      return this.fillSlots(input,slots,type);
    }
  },
  fillSlots: function(input,slots,type){
    input = input.split('');
    if (type == 'mix'){
      input[slots[0]] = this.numbers[this.genRand(this.numbers.length)];
      input[slots[1]] = this.lowercase[this.genRand(this.lowercase.length)];
      input[slots[2]] = this.uppercase[this.genRand(this.uppercase.length)];
      input[slots[3]] = this.special_chars[this.genRand(this.special_chars.length)];
    }
    if (type == 'urs'){
      input[slots[0]] = this.numbers[this.genRand(this.numbers.length)];
      input[slots[1]] = this.lowercase[this.genRand(this.lowercase.length)];
      input[slots[2]] = this.uppercase[this.genRand(this.uppercase.length)];
      input[slots[3]] = this.url_safe[this.genRand(this.url_safe.length)];
    }
    if (type == 'uln'){
      input[slots[0]] = this.numbers[this.genRand(this.numbers.length)];
      input[slots[1]] = this.lowercase[this.genRand(this.lowercase.length)];
      input[slots[2]] = this.uppercase[this.genRand(this.uppercase.length)];      
    }
    input = input.join('');
    return input;
  },
  getSlots: function(length,type){
    const output = [];
    let slotsStr = '';
    if (type == 'mix' || type == 'urs'){
      for (let i = 0; i < 4; i++){
        const randVal = this.atomicFor(slotsStr,length);        
        output.push(randVal);
        slotsStr += randVal;
      }
    }
    else if (type == 'uln'){
      for (let i = 0; i < 3; i++){
        const randVal = this.atomicFor(slotsStr,length);  
        output.push(this.genRand(length));
        slotsStr += randVal;
      }
    }
    return output;    
  },
  atomicFor: function(str,length){
    let randVal = this.genRand(length);
    while (!this.isAtomicIn(randVal,str)){
           randVal = this.genRand(length);
           }
      return randVal;
  },
  isAtomicIn: function(char,str){
    if(str.indexOf(char) > -1){
      return false;
    }
    return true;
  },
  generate: function(length,type){    
    if (this.type == 'non') return this.generateCustom(type);
    let output = '';
    if (type[0] == '['){
      return this.generateCustom(type)
    }
    this.type = this.setType(type);
    if (this.type == 'int'){
      return this.parseInteger(type);
    }
    this.length = this.setLength(length);
    const selection = this.setSelection(this.type); 
    if (this.type == 'arr') return this.arr[this.genRand(this.arr.length)]    
    for (let i = 0; i < this.length; i++){
      output += selection[this.genRand(selection.length)];
    }
    return this.testOutput(this.type,output);
  },
  generateCustom: function(cusRegex){
    return this.parseRegex(cusRegex);    
  },
  parseRegex: function(cusRegex){
    let output = '';    
    let o = [...cusRegex.matchAll(/\[([^\]]+)\](\d{1,2})\{\<([^}]+)\>(.*?)\}\((\d{1,2})\)/g)];   
    if (o.length < 1 && this.type != 'non') return "✘: Unrecognized Pattern";// there is no valid portion Fox Pattern
    for (let j=0; j < o.length; j++){
      let toCreate = o[j][1]; // the type to be created
      if (toCreate.indexOf('arr-') > -1){
        this.type = 'arr';
        this.arr = this.isArrayType(toCreate.split('-')[1])
      }
      else{
        this.type= toCreate;        
      }
      let ofLength = Number(o[j][2]); // the length of portion      
      let formatFlags = (o[j][4] != undefined)? o[j][4]:'';      
      let toSuffix = this.formatSuffix(o[j][3],formatFlags); // the suffix of the portion      
      let toRepeat = Number(o[j][5]); // times to repeat the portion
      let delivaryLength = (ofLength < 4)? 4 : ofLength;      
      for (let i = 0; i < toRepeat; i++){   
        if (this.type == 'arr') toCreate = 'arr';
        let portion = String(this.generate(delivaryLength,toCreate));
        portion = this.parseFlags(portion,ofLength,formatFlags);
        output += ((ofLength != delivaryLength)? portion.substring(0,ofLength):portion)+((toSuffix[1]&&(i == toRepeat-1))?'':toSuffix[0]);      
      }      
    }
    return output;
  },
  formatSuffix: function(str, flags){
    if (flags.indexOf('!') > -1){
      return [str,true]; // Don't place the suffix in the last portion'
    }
    else{
      return [str,false]; // Place the suffix at the last portion too
    }
  },
  isArrayType: function(str){    
    if (this.type == 'arr'){
      let arrName;      
      try{
        if (typeof window != undefined) {          
          arrName = window[str];
        }
        else{
          arrName = global[str];
        }        
        return arrName;
      }
      catch(e){        
        console.log('%c✘ Error: The varibale named "'+str+'" is undefined!\nFoxRandomString','color:red; font-weight: bold');
        return '✘';
      }
    }    
    return str;
  },
  parseInteger: function(intStr){
    let extract = intStr.match(/^int\((\d{1,}),(\d{1,})\)$/);
    let min;
    let max;    
    if (Number(extract[1]) < Number(extract[2]) ){
       min = extract[1];
       max = extract[2];
    }
    else{
       min = extract[2];
       max = extract[1];
    }
    return this.randomInRange(min*1,max*1); //Casting to integer.
  },
  randomInRange: function(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  parseFlags: function(portion,ofLength,formatFlags){
        if (formatFlags.indexOf('L') > -1) portion = portion.toLowerCase();
        if (formatFlags.indexOf('U') > -1) portion = portion.toUpperCase();
        if (formatFlags.indexOf('PS') > -1){
          const padChar = formatFlags.match(/PS(.*)PS/);
          portion = portion.padStart(ofLength,padChar[1]);          
        }
        if (formatFlags.indexOf('PE') > -1){
          const padChar = formatFlags.match(/PE(.*)PE/);
          portion = portion.padEnd(ofLength,padChar[1]);          
        }
        return portion;
  }
});
