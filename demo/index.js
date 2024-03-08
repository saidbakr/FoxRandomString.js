var list = ['Ali','Omar','John','Winster','Coli','Romio','Sandy','Lily','Huwan','Salma', 'Marco','Mohammed','Silva','Capitano','Folio','Randa','Yavoka','Seefi','Antonio','Carmen','Olga','Yafgini','Kamel','Lion','Hassan','Suzan','Mysaa','Helmy','Fahima','Roben','Andeera','Lucy','Rose','Alpa','Baker','George','Georgia','Alberta','Sandra','Tuto'];
var list2 = ['red','blue','green','yellow','cyan','orange','brown'];
//import { FoxRandomString } from "foxrandomstring";
let originalBg = 'rgb(228, 228, 221)';
// The template of hex values at 6 chars length
let colorTpl = `<span style='background:{VAL}' onmouseover="document.querySelector('body').style.backgroundColor=this.style.backgroundColor" onmouseout="document.querySelector('body').style.backgroundColor='rgb(228, 228, 221)'"><span class='highlight'>{VAL}</span></span><br />`;
// Creating an object of the FoxRandomString
let rand = Object.create(FoxRandomString);
// Reserving the original class's special chars list
let originalSpChars = rand.special_chars;
// Getting the DOM of the regenerate button
const genBtn = document.querySelector("#genBtn");
// Adding a click event listener to the regenerate button
genBtn.addEventListener("click", function () {
  // Getting the length desired for the string from Length field
  let l = document.querySelector("#len").value;
  // Getting the string type from the dropdown list Type
  let t = document.querySelector("#type").value;
  // Loading the custom special chars
  let special_chars = document.querySelector("#spChars").value.trim();
  // Determine the choice of custom special chars is allowed or not
  let isCustomSpChars = document.querySelector("#yes").checked;
  // Sets the rand object special chars from the custom or from the original
  rand.special_chars = isCustomSpChars ? special_chars : originalSpChars;
  gen(l, t);
});
const yes = document.querySelector("#yes");
yes.addEventListener("change", function () {
  if (this.checked) {
    document.querySelector("#spChars").removeAttribute("disabled");
    this.parentNode.getElementsByTagName("span")[0].textContent = "Yes";
  } else {
    document.querySelector("#spChars").setAttribute("disabled", "disabled");
    this.parentNode.getElementsByTagName("span")[0].textContent = "No";
  }
});
// Validate Special Characters field to contain special characters only
let spCharsField = document.querySelector("#spChars");
let initVal = spCharsField.value;
// Regex that match unrepeated non word characters
const regex = /^(?:(\W)(?!.*\1))*$/g;
spCharsField.addEventListener("change", function () {
  if (!this.value.match(regex) || this.value.length < 1) {
    this.value = initVal;
    alert(
      "This field should not be empty and it should contain unrepeated special characters only!"
    );
  } else {
    initVal = this.value;
  }
});
/*
 * @return string
 * @val: the string value
 * @isColor: boolean
 * It printout the colorTpl if isColor true
 */
function printVal(val, isColor) {
  if (isColor) {
    return colorTpl.replaceAll("{VAL}", val);
  } else {
    return val + "<br />";
  }
}
/*
 * @return string
 * @l: int the length of the string
 * @t: string the type of the string, uln, int,lwr, upr, hex, urs, mix
 */
function gen(l, t) {
  // the initial output
  let out = "";
  // no color by default
  let isColor = false;
  // check if the desired type hex and the length 6 to be a color
  if (l == 6 && t == "hex" || t == '[non]1{<rgba(>}(1)[int(0,255)]3{<,>}(3)[non]1{<0.>}(1)[int(0,99)]2{<)>}(1)') {
    // Yes it is a hex color format
    isColor = true;
  }
  // Looping to generate 10 strings
  for (let i = 0; i < 10; i++) {
    // Using the rand object's method generate to make the a random string with the specified length and type
    let val = rand.generate(l, t);
    if (t == 'hex' && l == 6) val = '#'+val;
    // Concatenates the value of out.
    out += printVal(val, isColor);
  }
  // Replcing the contents of the element #app with the final output
  document.querySelector("#app").innerHTML = out;
}
// Initially generate default random strings list with length 16 and type mix
gen(16, "mix");
