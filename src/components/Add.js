import React, { Component } from 'react'
import './Add.css'
import axios from 'axios';
import base64 from 'base-64';
export default class Add extends Component {
  state= {
    gecici: '',
    durum: 0,
    value: {
      title: '',
      body: ''
    }
  }
  buttonClick = () => {
    if(this.state.durum){
    this.setState({durum:0})}
    else{
     this.setState({durum:1}) 
    };
  }
   getData = e => {
    const title = e.target.value;
    this.setState({ gecici: title });
  };
  
  handleSubmit = () => {
    const title = this.state.gecici;
    const body = this.state.gecici;
    const instance = axios.create({
  baseURL: "http://samet.drp-dev.com/merve",
  timeout: 1000,
  headers: {
    Authorization: `Basic ${base64.encode("merve:a")}`,
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
});

instance
  .post("/jsonapi/node/gallery", {
    data: {
      type: "node--gallery",
      attributes: {
        title: title,
        body: {
          value: body,
          format: "full_html",
        },
      },
    },
  })
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
      <div>
        <button className="add-button" onClick={this.buttonClick}>Ekle</button>
        { this.state.durum ?
        (
        <div><input
        className="add-input"
              type="text"
              placeholder="Yeni title girin.."
              onChange={this.getData}
            />
           <input className="add-submit" type="submit" onClick={this.handleSubmit} /> </div>) 
           : null }
      </div>
    )
  }
}
