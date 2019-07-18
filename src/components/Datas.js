import React, { Component } from 'react';
import './Datas.css';
import base64 from 'base-64';
import axios from 'axios';
export default class Datas extends Component {
  state = {
    updateTitle:"",
    update:0,
    durum: 0,
    value: {
      title: '',
      body: ''
    }
  };
  deleteContent = () => {
   const instance = axios.create({
  baseURL: "http://samet.drp-dev.com/merve",
  timeout: 1000,
  headers: {
    Authorization: `Basic ${base64.encode("merve:a")}`,
     "Content-Type": "application/vnd.api+json",
  },
});
instance
  .delete(`/jsonapi/node/gallery/${this.props.id}`)
  .then((response) => {
    console.log("response", response);  
  })
  .catch((error) => {
    console.log("error", error);
  });
  window.location.reload();
  };
update = () => {
  this.setState({update:1});
}
getUpdateData = e => {
  const title= e.target.value;
 this.setState({updateTitle:title});
}
 updateContent = () => {
   const title = this.state.updateTitle;
   const id= this.props.id;
   console.log(id);
    const instance = axios.create({
     baseURL:"http://samet.drp-dev.com/merve",
     timeout:1000,
     headers:{  
        Authorization: `Basic ${base64.encode("merve:a")}`,
        Accept: "application/vnd.api+json",
       "Content-Type": "application/vnd.api+json",
     },
   });
   instance
   .patch(`/jsonapi/node/gallery/d1dde172-b9cc-477f-b3bf-1a0bc3ee2751`,
 {
    data: {
        type: "node--gallery",
        id: "d1dde172-b9cc-477f-b3bf-1a0bc3ee2751",
        attributes: {
            title: title,
        }
    }
}
)
.then((response) => {
    console.log("response", response);
  })
  .catch((error) => {
    console.log("error", error);
  });
    window.location.reload();
 }

    
  render() {
    return (
      <>
        <div className="container">
          <h1>{this.props.title}</h1>
       
          <div className="box">
            <button className="text" onClick={this.deleteContent}>
              Sil
            </button>
             <button className="text" onClick={this.update}>Güncelle</button>
             { this.state.update ?
        (
        <div><input
        className="update-input"
              type="text"
              placeholder="Yeni title girin.."
              onChange={this.getUpdateData}
            />
           <input className="update-submit" type="submit" onClick={this.updateContent} /> </div>) 
           : null }
          </div>
        </div>
        
      </>
    );
  }
}
