# FoxRandomString.js
Random string Javascript object with specified types of the output

## Generate Random Strings

The generate(length, type) takes two optional parameters:

`length`: the desired length ,int, of the random string.
`type`: the type of generated string, string, and it take one of the following string values


* **int**: numbers
* **lwr**: Lowercase
* **upr**: uppercase
* **uln**: Uppercase, LowerCase and Numbers
* **urs**: URL safe
* **hex**: Hexadecimal
* **mix**: Mix of Special Characters and alphanumerical.

Notice: The default value and the minimum of the length parameter is 4. The default value of type parameter is `mix` 

## Version 2.0.0 and Major changes

* The basic type `int` is renamed to `num` and new basic type `int(min,max)` is added where *min* and *max* are integers and this type is a random integer between the two values. e.g. `int(0,255)` is a random integer between 0 and 255.

* Custom `Fox Patterns` to customize the format of the generated random string based on the basic types and these custom strings has type named `cus`

* New type `non` is introduced to faciliate adding static format and contents to the string such as sperators, symbols, etc

## Fox Patterns

Instead of passing basic types such as `lwr` and `hex` as a type of required string, **Fox Patterns** come with handy utility to format and shape the generated string to what ever you need based on available basic types. For example:

```javascript
let type = '[int(0,255)]3{<.>!}(4)[non]1{<:>}(1)[int(0,65535)]4{<*>!}(1)';
let length = 4 // any filler integer
let rand = Object.create('FoxRandomString');
output = rand.generate(length,type);
console.log(output);
// The output is a string of a random IP4 address with a random port.
type = '[hex]8{<->L}(1)[hex]4{<->L}(3)[hex]12{<->!L}(1)';
// Fox Pattern for UUID like string
console.log(length,type);
```
In other words, Fox Patterns turns types into patterns.

Fox Pattern consists of portions each portion consists of 4 major custom patterns.
For example, the Fox Pattern of UUID, starts with `[hex]` a basic type name between square brackets, followed by an integer `8` that says make the type `hex` generated has the length `8` characters. It followed by curly brackets `{}` which contain the separator `-` between `<->` and other optional formating Flags outside `<>` in this case it is `L` which means change the string to lower case and finally we see an integer between two braces `(1)` it tells make this pattern once.


The next portion `[hex]4{<->L}(3)` almost the same but here we said repeat the pattern three times `(3)`. The final portion `[hex]12{<->!L}(1)` also the same as the first with a change that we said `12` Hexadecimal characters in length with the formating flag `!L` which tells turn the string into lowercase and `!` say not place the separator at the last generated pattern of that portion.

### General rules and notes about Fox Pattern

* It should has no any white spaces between portions or between patterns inside the portion.
* It should be written in the same order. i.e. 
  \[**Type between square brackets**\]**Integer**{\<**Separator**\>Flags}\(**Number of repeatation**\)
  


#### It is also available as [**NPM package**](https://www.npmjs.com/package/foxrandomstring)
```
npm i foxrandomstring
```

  
## New in version 2.1.0

-Adding new flag `PSxPS` and `PExPE` where `x` any padding string. **PS** stands for padding start, while **PE** padding end. These flags introduced to provide padding to the generated string for example:

```javascript
let type = '[int(0,255)]3{<.>!}(4)'
//it should generate random integer between 0 and 255 with length 3 characters. However, if the string is, for example, 21! 
type = '[int(0,255)]3{<.>!PS0PS}(4)'
// padding the string to reach 3 with 0. i.e 21 will be 021
```
-Fixing Type Casting issue in int generator.

## New in version 2.2.0
Adding new custom type array, in which, it could randomely select among a predefined array indices. It follows the pattern below:
```javascript
// Array to random select from its indices
var varName = ['John','Doe','Ali', 'Sandra','Jim','Romio','Randa'];
let type = '[arr-varName]1{< >}(2)';
let rand = Object.create('FoxRandomString');
//In some conditions, eval does not work, so you have to define the property arr of the object by the array itself
rand.arr = varName;
console.log(rand.generate(4,type));
```

### Demo of the old version [jsbin demo](https://jsbin.com/baxubaf/1/edit?html,js,output)

### [Version 2.x.x demo](https://55h27v-1234.csb.app/)
### Another most recent demo [on livecodes.io](https://v22.livecodes.io/?x=id/7pe5pt3hadd)
