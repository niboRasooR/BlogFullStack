'use strict'

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
export{
  BlogView
}