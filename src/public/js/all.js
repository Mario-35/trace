// global form datas
let _COLUMNS = [];
var _STORE = {}; 



// version date
  console.log("version : 13/06/2025 ADAM Mario");

  function checkFree(e){
  if(e.target.value == 3 ){
    var tb = document.querySelector(".DropDownInputOverride");
    tb.style.display ="inline-block";
  }else{
    var tb = document.querySelector(".DropDownInputOverride");
    tb.style.display ="none";
  }
}