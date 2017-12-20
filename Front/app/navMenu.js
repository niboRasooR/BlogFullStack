'use strict'

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
export { NavView}