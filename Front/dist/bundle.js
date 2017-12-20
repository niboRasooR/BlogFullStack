/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__query__ = __webpack_require__(1);



class Storage{
  get mode(){
    return this._mode;
  }

  setMode(mode){
   this.mode = mode; 
  }
  set mode (mode){
    this._mode = mode; 
    if (mode === "EditBlog"){
      this.blogView.renderEditView();
    }

    if (mode === 'BlogView') {
      this.blogView.renderBlogs(this.blogs)
    }
    if (mode === 'SuperUser') {
      this.blogView.renderBlogs(this.blogs, mode)
    }

  }
  
  get author(){
    return this._author;
  }

  set author (value){
    this._author = value;
  }
  set mainText(text){
    this._mainText = text; 

  }
  get mainText(){
    return this._mainText;
  }

  set blogEntries(data){
    this._enries =data;
    this.blogView.renderEntireBlog(data); 
  }

  get blogEntries(){
    return this._entries;
  }

  addEntry(entry){
    //locally
    this._entries.push(entry);
    this.mode = 'BlogView';
    //post to backend
    Object(__WEBPACK_IMPORTED_MODULE_0__query__["a" /* postToBlog */])(entry);
  }

  deleteEntry(entry){
    let index = this._enries.indexOf(entry);
    if(index >=0){
      this._enries.splice(index, 1);
      this.mode = "SuperUser";
    }
  }

  
}
let storage = new Storage();
  

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export queryEntries */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return postToBlog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storage__ = __webpack_require__(0);




function queryEntries () {

 let headers = initHeaders();
 

  let url = '/blog';
  
  makeFetch(url, 'get', headers, __WEBPACK_IMPORTED_MODULE_0__storage__["a" /* storage */].entries);
}

function makeFetch(url, methodString, headersObj, storageField)
{ 
  let init = {
    method: methodString,
    headers: headersObj
  }
  fetch(url, init).then((response) =>{
    console.log(" got response " + response);
    return response.json();
  }).then((data) => {
    if(data){
      console.log(" GOT DATA: "+ data);
      storageField = data;
    }
  })
}
function initHeaders(){
  let headers = new Headers();
  headers.append('Content-type', 'application/json');
  headers.append('Accept', '*/*');
  console.log(headers);
  return headers;
}

function postToBlog(entry){
  blog.date = new Date().toISOString();
  let headers = initHeaders();
  console.log(headers);

  for(var pair of headers.entries()){
    console.log(pair[0] + ': ' + pair[1]);
  }

  let url = '/blog';
  makeFetch(url, 'post', headers, entry.id);

}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navMenu__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blogsview__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__query__ = __webpack_require__(1);





function init(){
  const container = document.getElementById("container");
  __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* storage */].navView = new NavView(container);
  __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* storage */].blogView = new __WEBPACK_IMPORTED_MODULE_1__blogsview__["a" /* BlogView */](container);
  __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* storage */].navView.storage = __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* storage */];
  __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* storage */].blogView.storage = __WEBPACK_IMPORTED_MODULE_2__storage__["a" /* storage */];
   container.appendChild(__WEBPACK_IMPORTED_MODULE_2__storage__["a" /* storage */].navView.render())
   queryEntries();

}

window.addEventListener('load' , init);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NavView */


function NavMenu(container){
  this.parent = container; 
  this.render = () => {
  
  let div = document.createElement('div');
  div.style.height = '100vh'
  div.style.backgroundColor = 'khaki'
  let btnNew = button(this.storage.setMode, 'EditBlog', 'New entry', div);

  let btnSuperMode = button(this.storage.changeMode, undefined, 'Super Mode', div );
  
  
  

  function makeElement( parent, typeString, textString){
    let element = document.createElement(typeString);
    if(textString!=undefined){
      title.innerText = textString;
    }
    parent.appendChild(element);
    
  }

  function button(whatItDoes, whatItDoesParamObj, text,  parent){
    let button = document.createElement("button");
    button.addEventListener("click", (event)=>{
      console.log("  ADD EVENT LISTENER "+ text + "CLICK" );
      if(whatItDoesParamObj===undefined){
        this.storage.whatItDoes();
      }
      else {
        this.storage.whatItDoes(whatItDoesParamObj);
      }
    });
    
    

  }
  return div;  
}
  this.mainView = (blogposts) => {
    let mainDiv = document.createElement('div');

    for (let entry of blogposts){
        let entryView = this.NavMenu(entry);
        mainDiv.appendChild(entryView);
    }
  }

 }


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogView; });


function BlogView(container){
  this.container = container;

  this.renderEditView = () => {

    let blog = {};

    blog.author = { name:'me'};
    blog.title = 'default title';
    blog.text = '';

    // make header 2
    const h = document.createElement('h2');
    h.innerText = 'New Blog'
    const author = document.createElement('input');

    author.type = 'text';
    author.addEventListener('input',(elemen) => {
      blog.author.name = elemen.target.value;

    });

    const bText = document.createElement('textarea');
    blogText.addEventListener("input", (elem) =>{
      blog.text = elem.target.value;
    })

    button.addEventListener("click", (elem) =>{
      console.log("   add event listener click");
      this.storage.addBlog(blog);
    })

    const bTitle = document.createElement("input");
    blogText.addEventListener("input", (elem)=>{
      blog.title = elem.target.value;

    });

    const button = document.createElement("button");
    button.innerText = "new entry";
    const edit = document.createElement("div");
    edit.appendChild(h);
    edit.appendChild(document.createTextNode("author:")); 
    edit.appendChild(author)
    edit.appendChild(document.createElement('br'))
    edit.appendChild(document.createTextNode('Blog Title'))
    edit.appendChild(blogHeader)
    edit.appendChild(document.createElement('br'))
    edit.appendChild(document.createTextNode('Text body'))
    edit.appendChild(blogText)
    edit.appendChild(document.createElement('br'))
    edit.appendChild(button)
    
    // Check type
    if(typeof this.active !=="undefined"){
      container.removeChild(this.active);
      this.active = undefined;
    }
    this.active = edit;
    this.container.appendChild(edit);
  }

  function makeElement( parent, typeString, textString){
    let element = document.createElement(typeString);
    if(textString!=undefined){
      title.innerText = textString;
    }
    parent.appendChild(element);
    
  }

  function button(whatItDoes, whatItDoesParamObj, text,  parent){
    let button = document.createElement("button");
    button.addEventListener("click", (elem)=>{
      console.log("  ADD EVENT LISTENER "+ text + "CLICK" );
      if(whatItDoesParamObj==undefined){
        this.storage.whatItDoes();
      }
      else {
        this.storage.whatItDoes(whatItDoesParamObj);
      }
    });

    button.innerText =  text;
    parent.appendChild(button);
  }

  this.renderEntry = (blog, mode) => {
    let div = document.createElement("div");
    if(typeof mode !== "undefined"){
      this.button(this.storage.deleteEntry, blog, "delete entry", div);
    } 

    makeElement(div, "h2",  blog.title);
    makeElement(div, "p", blog.text);
    makeElement(div, "p", blog.author);
    
    return div;
  }

  this.renderEntireBlog = (theBlog, mode) =>{
    let view = document.createElement("div");
    
    makeElement(view, "h2", "Latest posts");
    
    for (let blogpost of theBlog){
      let entryView = this.renderEntry(blogpost, mode); 
      view.appendChild(entryView);
    }
    if (typeof this.active !== "undefined"){
      container.removeChild(this.active);
      this.active = undefined;
    }
    this.container.appendChild(view);
    this.active = view;
  }

  
}
//FOR WEBPACK


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTJlNWY1ZjE4ZDIwMGZjNmI0OGUiLCJ3ZWJwYWNrOi8vLy4vYXBwL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3F1ZXJ5LmpzIiwid2VicGFjazovLy8uL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvbmF2TWVudS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvYmxvZ3N2aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTtBQUNxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQjtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7OztBQ3JFQTs7QUFFaUI7O0FBRWpCOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDaERDO0FBR0E7QUFHQTtBQUdBOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsdUM7Ozs7Ozs7O0FDeEJBOztBQUVBO0FBQ0EsMEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQSxhO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMmU1ZjVmMThkMjAwZmM2YjQ4ZSIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IHsgcG9zdFRvQmxvZyB9IGZyb20gJy4vcXVlcnknO1xuXG5jbGFzcyBTdG9yYWdle1xuICBnZXQgbW9kZSgpe1xuICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICB9XG5cbiAgc2V0TW9kZShtb2RlKXtcbiAgIHRoaXMubW9kZSA9IG1vZGU7IFxuICB9XG4gIHNldCBtb2RlIChtb2RlKXtcbiAgICB0aGlzLl9tb2RlID0gbW9kZTsgXG4gICAgaWYgKG1vZGUgPT09IFwiRWRpdEJsb2dcIil7XG4gICAgICB0aGlzLmJsb2dWaWV3LnJlbmRlckVkaXRWaWV3KCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGUgPT09ICdCbG9nVmlldycpIHtcbiAgICAgIHRoaXMuYmxvZ1ZpZXcucmVuZGVyQmxvZ3ModGhpcy5ibG9ncylcbiAgICB9XG4gICAgaWYgKG1vZGUgPT09ICdTdXBlclVzZXInKSB7XG4gICAgICB0aGlzLmJsb2dWaWV3LnJlbmRlckJsb2dzKHRoaXMuYmxvZ3MsIG1vZGUpXG4gICAgfVxuXG4gIH1cbiAgXG4gIGdldCBhdXRob3IoKXtcbiAgICByZXR1cm4gdGhpcy5fYXV0aG9yO1xuICB9XG5cbiAgc2V0IGF1dGhvciAodmFsdWUpe1xuICAgIHRoaXMuX2F1dGhvciA9IHZhbHVlO1xuICB9XG4gIHNldCBtYWluVGV4dCh0ZXh0KXtcbiAgICB0aGlzLl9tYWluVGV4dCA9IHRleHQ7IFxuXG4gIH1cbiAgZ2V0IG1haW5UZXh0KCl7XG4gICAgcmV0dXJuIHRoaXMuX21haW5UZXh0O1xuICB9XG5cbiAgc2V0IGJsb2dFbnRyaWVzKGRhdGEpe1xuICAgIHRoaXMuX2VucmllcyA9ZGF0YTtcbiAgICB0aGlzLmJsb2dWaWV3LnJlbmRlckVudGlyZUJsb2coZGF0YSk7IFxuICB9XG5cbiAgZ2V0IGJsb2dFbnRyaWVzKCl7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXM7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSl7XG4gICAgLy9sb2NhbGx5XG4gICAgdGhpcy5fZW50cmllcy5wdXNoKGVudHJ5KTtcbiAgICB0aGlzLm1vZGUgPSAnQmxvZ1ZpZXcnO1xuICAgIC8vcG9zdCB0byBiYWNrZW5kXG4gICAgcG9zdFRvQmxvZyhlbnRyeSk7XG4gIH1cblxuICBkZWxldGVFbnRyeShlbnRyeSl7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5fZW5yaWVzLmluZGV4T2YoZW50cnkpO1xuICAgIGlmKGluZGV4ID49MCl7XG4gICAgICB0aGlzLl9lbnJpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMubW9kZSA9IFwiU3VwZXJVc2VyXCI7XG4gICAgfVxuICB9XG5cbiAgXG59XG5sZXQgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG4gIGV4cG9ydCB7c3RvcmFnZX1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zdG9yYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnR7IHN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UnXG5cbmZ1bmN0aW9uIHF1ZXJ5RW50cmllcyAoKSB7XG5cbiBsZXQgaGVhZGVycyA9IGluaXRIZWFkZXJzKCk7XG4gXG5cbiAgbGV0IHVybCA9ICcvYmxvZyc7XG4gIFxuICBtYWtlRmV0Y2godXJsLCAnZ2V0JywgaGVhZGVycywgc3RvcmFnZS5lbnRyaWVzKTtcbn1cblxuZnVuY3Rpb24gbWFrZUZldGNoKHVybCwgbWV0aG9kU3RyaW5nLCBoZWFkZXJzT2JqLCBzdG9yYWdlRmllbGQpXG57IFxuICBsZXQgaW5pdCA9IHtcbiAgICBtZXRob2Q6IG1ldGhvZFN0cmluZyxcbiAgICBoZWFkZXJzOiBoZWFkZXJzT2JqXG4gIH1cbiAgZmV0Y2godXJsLCBpbml0KS50aGVuKChyZXNwb25zZSkgPT57XG4gICAgY29uc29sZS5sb2coXCIgZ290IHJlc3BvbnNlIFwiICsgcmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0pLnRoZW4oKGRhdGEpID0+IHtcbiAgICBpZihkYXRhKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiIEdPVCBEQVRBOiBcIisgZGF0YSk7XG4gICAgICBzdG9yYWdlRmllbGQgPSBkYXRhO1xuICAgIH1cbiAgfSlcbn1cbmZ1bmN0aW9uIGluaXRIZWFkZXJzKCl7XG4gIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIGhlYWRlcnMuYXBwZW5kKCdBY2NlcHQnLCAnKi8qJyk7XG4gIGNvbnNvbGUubG9nKGhlYWRlcnMpO1xuICByZXR1cm4gaGVhZGVycztcbn1cblxuZnVuY3Rpb24gcG9zdFRvQmxvZyhlbnRyeSl7XG4gIGJsb2cuZGF0ZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgbGV0IGhlYWRlcnMgPSBpbml0SGVhZGVycygpO1xuICBjb25zb2xlLmxvZyhoZWFkZXJzKTtcblxuICBmb3IodmFyIHBhaXIgb2YgaGVhZGVycy5lbnRyaWVzKCkpe1xuICAgIGNvbnNvbGUubG9nKHBhaXJbMF0gKyAnOiAnICsgcGFpclsxXSk7XG4gIH1cblxuICBsZXQgdXJsID0gJy9ibG9nJztcbiAgbWFrZUZldGNoKHVybCwgJ3Bvc3QnLCBoZWFkZXJzLCBlbnRyeS5pZCk7XG5cbn1cblxuZXhwb3J0IHtxdWVyeUVudHJpZXMsIHBvc3RUb0Jsb2d9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvcXVlcnkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcbiAgTmF2TWVudVxufSBmcm9tICcuL25hdk1lbnUnXG5pbXBvcnQge1xuICBCbG9nVmlld1xufSBmcm9tICcuL2Jsb2dzdmlldydcbmltcG9ydCB7XG4gIHN0b3JhZ2Vcbn0gZnJvbSAnLi9zdG9yYWdlJ1xuaW1wb3J0IHtcbiAgcXVlcnlCbG9nc1xufSBmcm9tICcuL3F1ZXJ5J1xuXG5mdW5jdGlvbiBpbml0KCl7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xuICBzdG9yYWdlLm5hdlZpZXcgPSBuZXcgTmF2Vmlldyhjb250YWluZXIpO1xuICBzdG9yYWdlLmJsb2dWaWV3ID0gbmV3IEJsb2dWaWV3KGNvbnRhaW5lcik7XG4gIHN0b3JhZ2UubmF2Vmlldy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgc3RvcmFnZS5ibG9nVmlldy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdG9yYWdlLm5hdlZpZXcucmVuZGVyKCkpXG4gICBxdWVyeUVudHJpZXMoKTtcblxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcgLCBpbml0KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gTmF2TWVudShjb250YWluZXIpe1xuICB0aGlzLnBhcmVudCA9IGNvbnRhaW5lcjsgXG4gIHRoaXMucmVuZGVyID0gKCkgPT4ge1xuICBcbiAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuc3R5bGUuaGVpZ2h0ID0gJzEwMHZoJ1xuICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2toYWtpJ1xuICBsZXQgYnRuTmV3ID0gYnV0dG9uKHRoaXMuc3RvcmFnZS5zZXRNb2RlLCAnRWRpdEJsb2cnLCAnTmV3IGVudHJ5JywgZGl2KTtcblxuICBsZXQgYnRuU3VwZXJNb2RlID0gYnV0dG9uKHRoaXMuc3RvcmFnZS5jaGFuZ2VNb2RlLCB1bmRlZmluZWQsICdTdXBlciBNb2RlJywgZGl2ICk7XG4gIFxuICBcbiAgXG5cbiAgZnVuY3Rpb24gbWFrZUVsZW1lbnQoIHBhcmVudCwgdHlwZVN0cmluZywgdGV4dFN0cmluZyl7XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGVTdHJpbmcpO1xuICAgIGlmKHRleHRTdHJpbmchPXVuZGVmaW5lZCl7XG4gICAgICB0aXRsZS5pbm5lclRleHQgPSB0ZXh0U3RyaW5nO1xuICAgIH1cbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgXG4gIH1cblxuICBmdW5jdGlvbiBidXR0b24od2hhdEl0RG9lcywgd2hhdEl0RG9lc1BhcmFtT2JqLCB0ZXh0LCAgcGFyZW50KXtcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCk9PntcbiAgICAgIGNvbnNvbGUubG9nKFwiICBBREQgRVZFTlQgTElTVEVORVIgXCIrIHRleHQgKyBcIkNMSUNLXCIgKTtcbiAgICAgIGlmKHdoYXRJdERvZXNQYXJhbU9iaj09PXVuZGVmaW5lZCl7XG4gICAgICAgIHRoaXMuc3RvcmFnZS53aGF0SXREb2VzKCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLndoYXRJdERvZXMod2hhdEl0RG9lc1BhcmFtT2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBcblxuICB9XG4gIHJldHVybiBkaXY7ICBcbn1cbiAgdGhpcy5tYWluVmlldyA9IChibG9ncG9zdHMpID0+IHtcbiAgICBsZXQgbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZm9yIChsZXQgZW50cnkgb2YgYmxvZ3Bvc3RzKXtcbiAgICAgICAgbGV0IGVudHJ5VmlldyA9IHRoaXMuTmF2TWVudShlbnRyeSk7XG4gICAgICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQoZW50cnlWaWV3KTtcbiAgICB9XG4gIH1cblxuIH1cbmV4cG9ydCB7IE5hdlZpZXd9XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvbmF2TWVudS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gQmxvZ1ZpZXcoY29udGFpbmVyKXtcbiAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgdGhpcy5yZW5kZXJFZGl0VmlldyA9ICgpID0+IHtcblxuICAgIGxldCBibG9nID0ge307XG5cbiAgICBibG9nLmF1dGhvciA9IHsgbmFtZTonbWUnfTtcbiAgICBibG9nLnRpdGxlID0gJ2RlZmF1bHQgdGl0bGUnO1xuICAgIGJsb2cudGV4dCA9ICcnO1xuXG4gICAgLy8gbWFrZSBoZWFkZXIgMlxuICAgIGNvbnN0IGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIGguaW5uZXJUZXh0ID0gJ05ldyBCbG9nJ1xuICAgIGNvbnN0IGF1dGhvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cbiAgICBhdXRob3IudHlwZSA9ICd0ZXh0JztcbiAgICBhdXRob3IuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLChlbGVtZW4pID0+IHtcbiAgICAgIGJsb2cuYXV0aG9yLm5hbWUgPSBlbGVtZW4udGFyZ2V0LnZhbHVlO1xuXG4gICAgfSk7XG5cbiAgICBjb25zdCBiVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgYmxvZ1RleHQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlbGVtKSA9PntcbiAgICAgIGJsb2cudGV4dCA9IGVsZW0udGFyZ2V0LnZhbHVlO1xuICAgIH0pXG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlbGVtKSA9PntcbiAgICAgIGNvbnNvbGUubG9nKFwiICAgYWRkIGV2ZW50IGxpc3RlbmVyIGNsaWNrXCIpO1xuICAgICAgdGhpcy5zdG9yYWdlLmFkZEJsb2coYmxvZyk7XG4gICAgfSlcblxuICAgIGNvbnN0IGJUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBibG9nVGV4dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGVsZW0pPT57XG4gICAgICBibG9nLnRpdGxlID0gZWxlbS50YXJnZXQudmFsdWU7XG5cbiAgICB9KTtcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLmlubmVyVGV4dCA9IFwibmV3IGVudHJ5XCI7XG4gICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZWRpdC5hcHBlbmRDaGlsZChoKTtcbiAgICBlZGl0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiYXV0aG9yOlwiKSk7IFxuICAgIGVkaXQuYXBwZW5kQ2hpbGQoYXV0aG9yKVxuICAgIGVkaXQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcbiAgICBlZGl0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdCbG9nIFRpdGxlJykpXG4gICAgZWRpdC5hcHBlbmRDaGlsZChibG9nSGVhZGVyKVxuICAgIGVkaXQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcbiAgICBlZGl0LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdUZXh0IGJvZHknKSlcbiAgICBlZGl0LmFwcGVuZENoaWxkKGJsb2dUZXh0KVxuICAgIGVkaXQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcbiAgICBlZGl0LmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICBcbiAgICAvLyBDaGVjayB0eXBlXG4gICAgaWYodHlwZW9mIHRoaXMuYWN0aXZlICE9PVwidW5kZWZpbmVkXCIpe1xuICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuYWN0aXZlKTtcbiAgICAgIHRoaXMuYWN0aXZlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGVkaXQ7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdCk7XG4gIH1cblxuICBmdW5jdGlvbiBtYWtlRWxlbWVudCggcGFyZW50LCB0eXBlU3RyaW5nLCB0ZXh0U3RyaW5nKXtcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZVN0cmluZyk7XG4gICAgaWYodGV4dFN0cmluZyE9dW5kZWZpbmVkKXtcbiAgICAgIHRpdGxlLmlubmVyVGV4dCA9IHRleHRTdHJpbmc7XG4gICAgfVxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1dHRvbih3aGF0SXREb2VzLCB3aGF0SXREb2VzUGFyYW1PYmosIHRleHQsICBwYXJlbnQpe1xuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGVsZW0pPT57XG4gICAgICBjb25zb2xlLmxvZyhcIiAgQUREIEVWRU5UIExJU1RFTkVSIFwiKyB0ZXh0ICsgXCJDTElDS1wiICk7XG4gICAgICBpZih3aGF0SXREb2VzUGFyYW1PYmo9PXVuZGVmaW5lZCl7XG4gICAgICAgIHRoaXMuc3RvcmFnZS53aGF0SXREb2VzKCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLndoYXRJdERvZXMod2hhdEl0RG9lc1BhcmFtT2JqKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJ1dHRvbi5pbm5lclRleHQgPSAgdGV4dDtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfVxuXG4gIHRoaXMucmVuZGVyRW50cnkgPSAoYmxvZywgbW9kZSkgPT4ge1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmKHR5cGVvZiBtb2RlICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgIHRoaXMuYnV0dG9uKHRoaXMuc3RvcmFnZS5kZWxldGVFbnRyeSwgYmxvZywgXCJkZWxldGUgZW50cnlcIiwgZGl2KTtcbiAgICB9IFxuXG4gICAgbWFrZUVsZW1lbnQoZGl2LCBcImgyXCIsICBibG9nLnRpdGxlKTtcbiAgICBtYWtlRWxlbWVudChkaXYsIFwicFwiLCBibG9nLnRleHQpO1xuICAgIG1ha2VFbGVtZW50KGRpdiwgXCJwXCIsIGJsb2cuYXV0aG9yKTtcbiAgICBcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgdGhpcy5yZW5kZXJFbnRpcmVCbG9nID0gKHRoZUJsb2csIG1vZGUpID0+e1xuICAgIGxldCB2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBcbiAgICBtYWtlRWxlbWVudCh2aWV3LCBcImgyXCIsIFwiTGF0ZXN0IHBvc3RzXCIpO1xuICAgIFxuICAgIGZvciAobGV0IGJsb2dwb3N0IG9mIHRoZUJsb2cpe1xuICAgICAgbGV0IGVudHJ5VmlldyA9IHRoaXMucmVuZGVyRW50cnkoYmxvZ3Bvc3QsIG1vZGUpOyBcbiAgICAgIHZpZXcuYXBwZW5kQ2hpbGQoZW50cnlWaWV3KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmFjdGl2ZSAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5hY3RpdmUpO1xuICAgICAgdGhpcy5hY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgIHRoaXMuYWN0aXZlID0gdmlldztcbiAgfVxuXG4gIFxufVxuLy9GT1IgV0VCUEFDS1xuZXhwb3J0e1xuICBCbG9nVmlld1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2Jsb2dzdmlldy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9