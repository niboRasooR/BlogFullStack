'use strict'

import{ storage } from './storage'

function queryEntries () {

 let headers = initHeaders();
 

  let url = '/blog';
  
  makeFetch(url, 'get', headers, storage.entries);
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

export {queryEntries, postToBlog}