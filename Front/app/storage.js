'use strict'
import { postToBlog } from './query';

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
    postToBlog(entry);
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
  export {storage}