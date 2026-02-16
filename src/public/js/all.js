// global form datas
let _COLUMNS = [];
var _STORE = {}; 



function getElement(name) {
  if (typeof name === "string") {
    element = document.getElementById(name);
    if (element) return element;
    console.log("element not found ========> " + name);
  } else return name;
}

function hide(element) {
    element = getElement(element);
    if(element) {
      element.classList.remove("visible");
      element.classList.add("invisible");
    }
}

function show(element) {
    element = getElement(element);
    if (element) {
      element.classList.remove("invisible");
      element.classList.add("visible");
    }
}

function showParentClass(elementName, className) {
    const elem = document.getElementById(elementName);
      if(elem)
        show(elem.parentNode.closest('.' + className));
}

function hideParentClass(elementName, className) {
    const elem = document.getElementById(elementName);
      if(elem)
        hide(elem.parentNode.closest('.' + className));
}

function setReadOnly(names) {
    if (typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = getElement(name);
        if (elem) {
            elem.setAttribute("readonly", "");
            elem.setAttribute("disabled", "");
        }
      });
}

function removeReadOnly(names) {
    if (typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = getElement(name);
        if (elem) {
            elem.removeAttribute("readonly");
            elem.removeAttribute("disabled");
        }
      });
}

function setDisabled(element) {
    elem = getElement(element);
    if(elem) 
        elem.setAttribute("disabled", "");
}
function removeDisabled(element) {
    elem = getElement(element);
    if(elem) 
       elem.removeAttribute("disabled");
}

function multipleHide(names) {
    if(typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = document.getElementById(name);
        if(elem)
          hide(elem.parentNode.closest('.form-group'));
      });
}

function multipleShow(names) {
    if (typeof names === "string") names = [names];
    names.forEach(name => {
        const elem = document.getElementById(name);
        if(elem) 
          show(elem.parentNode.closest('.form-group'));
      });
}

function setVisible(list, visible) {
    list.forEach(name => {
      const elem = document.getElementById(name);
      if (name == visible ) 
        show(elem);
      else 
        hide(elem)
    });
}


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

function 	svgs(name, text) {
		switch (name) {
			case "search":
        return `<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>`
			case "download":
				return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"> <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /> </svg>${text ? ` ${text}` : ''}`
			case "dbAdd":
				return `<svg width="22px" height="22px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-database-plus"> <title>657</title> <defs> </defs> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g transform="translate(1.000000, 0.000000)" fill="#FFF"> <path d="M6.43,5 C9.98119094,5 13,3.83708138 13,2.5 C13,1.16291862 9.98119094,0 6.43,0 C2.87880906,0 0,1.16291862 0,2.5 C0,3.83708138 2.87880906,5 6.43,5 Z" class="si-glyph-fill"> </path> <path d="M6.494,9.919 C10.055,9.919 12.941,8.937 12.941,7.723 L12.941,4.377 C12.941,5.049 10.009,6.051 6.494,6.051 C2.979,6.051 0.047,5.049 0.047,4.377 L0.047,7.723 C0.047,8.937 2.934,9.919 6.494,9.919 L6.494,9.919 Z" class="si-glyph-fill"> </path> <rect x="10" y="13" width="4.915" height="0.957" class="si-glyph-fill"> </rect> <path d="M0.0160000001,9.444 L0.0160000001,12.713 C0.0160000001,13.901 2.903,14.859 6.463,14.859 C7.332,14.859 8.16,14.8 8.918,14.697 L8.918,11.958 L10.958,11.958 L10.958,10.52 C9.789,10.841 8.198,11.081 6.463,11.081 C2.947,11.08 0.0160000001,10.1 0.0160000001,9.444 L0.0160000001,9.444 Z" class="si-glyph-fill"> </path> <rect x="12" y="11" width="0.958" height="4.937" class="si-glyph-fill"> </rect> </g> </g> </svg>${text ? ` ${text}` : ''}`
			case "printer":
				return `<svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V11C20.6569 11 22 12.3431 22 14V18C22 19.6569 20.6569 21 19 21H5C3.34314 21 2 19.6569 2 18V14C2 12.3431 3.34315 11 5 11V5ZM5 13C4.44772 13 4 13.4477 4 14V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V14C20 13.4477 19.5523 13 19 13V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V13ZM7 6V12V14H17V12V6H7ZM9 9C9 8.44772 9.44772 8 10 8H14C14.5523 8 15 8.44772 15 9C15 9.55228 14.5523 10 14 10H10C9.44772 10 9 9.55228 9 9ZM9 12C9 11.4477 9.44772 11 10 11H14C14.5523 11 15 11.4477 15 12C15 12.5523 14.5523 13 14 13H10C9.44772 13 9 12.5523 9 12Z" fill="#FFF"/>${text ? ` ${text}` : ''}`
			case "edit":
        return `<svg width="22px" height="22px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>edit_text_bar [#1373]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-339.000000, -800.000000)" fill="#fff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M286.15,654 C285.5704,654 285.1,653.552 285.1,653 L285.1,647 C285.1,646.448 285.5704,646 286.15,646 C286.7296,646 287.2,645.552 287.2,645 C287.2,644.448 286.7296,644 286.15,644 L285.1,644 C283.93975,644 283,644.895 283,646 L283,654 C283,655.105 283.93975,656 285.1,656 L286.15,656 C286.7296,656 287.2,655.552 287.2,655 C287.2,654.448 286.7296,654 286.15,654 M301.9,644 L294.55,644 C293.9704,644 293.5,644.448 293.5,645 C293.5,645.552 293.9704,646 294.55,646 L300.85,646 C301.4296,646 301.9,646.448 301.9,647 L301.9,653 C301.9,653.552 301.4296,654 300.85,654 L294.55,654 C293.9704,654 293.5,654.448 293.5,655 C293.5,655.552 293.9704,656 294.55,656 L301.9,656 C303.06025,656 304,655.105 304,654 L304,646 C304,644.895 303.06025,644 301.9,644 M293.5,659 C293.5,659.552 293.0296,660 292.45,660 L288.25,660 C287.6704,660 287.2,659.552 287.2,659 C287.2,658.448 287.6704,658 288.25,658 L289.3,658 L289.3,642 L288.25,642 C287.6704,642 287.2,641.552 287.2,641 C287.2,640.448 287.6704,640 288.25,640 L292.45,640 C293.0296,640 293.5,640.448 293.5,641 C293.5,641.552 293.0296,642 292.45,642 L291.4,642 L291.4,658 L292.45,658 C293.0296,658 293.5,658.448 293.5,659" id="edit_text_bar-[#1373]"> </path> </g> </g> </g> </svg>${text ? ` ${text}` : ''}`
      case "api":
        return `<svg fill="#FFF" width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon"> <path d="M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 0 0-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 0 0 0 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM578.9 546.7a8.03 8.03 0 0 0-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 0 0-11.3 0L363 475.3l-43-43a7.85 7.85 0 0 0-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 68.9-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 0 0 0 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2z"/> </svg>${text ? ` ${text}` : ''}`
      case "plus":
        return `<svg width="18px" height="18px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H5Z" fill="#FFF"/> <path d="M9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V5Z" fill="#FFF"/> </svg>${text ? ` ${text}` : ''}`
    default:
      break;
		}
	}