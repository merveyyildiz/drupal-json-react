import React, { Component } from 'react'
import './Page.css';
import base64 from 'base-64';
import axios from 'axios';
export default class Page extends Component {
  state={
     update: 0,
     updateTitle:"", 
     value: {
      title: '',
      body: ''
    }
  }
 deleteContent = () => {
    const instance = axios.create({
      baseURL: 'http://samet.drp-dev.com/merve',
      timeout: 1000,
      headers: {
        Authorization: `Basic ${base64.encode('merve:a')}`,
        'Content-Type': 'application/vnd.api+json'
      }
    });
    instance
      .delete(`/jsonapi/node/gallery/${this.props.location.state.id}`)
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
    window.location.reload();
  };
   getUpdateData = e => {
    const title = e.target.value;
    this.setState({ updateTitle: title });
  };
   updateContent = () => {
    const title = this.state.updateTitle;
    const id = this.props.location.state.id;
    const instance = axios.create({
      baseURL: 'http://samet.drp-dev.com/merve',
      timeout: 1000,
      headers: {
        Authorization: `Basic ${base64.encode('merve:a')}`,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    });
    instance
      .patch(`/jsonapi/node/gallery/${id}`, {
        data: {
          type: 'node--gallery',
          id: id,
          attributes: {
            title: title
          }
        }
      })
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
    window.location.reload();
  };
   update = () => {
    if(this.state.update){
    this.setState({ update: 0 });
    }else{
      this.setState({ update: 1 });
    }
  };
  render() {
    const url = `http://samet.drp-dev.com/${this.props.location.state.src}`;
    return (
     <>
      <h1>ÖZELLİKLER</h1>
      <div className="page-component">
      
      <p><span>NAME:</span><span>{this.props.location.state.title}</span></p>
        <p><span>ID:</span><span>{this.props.location.state.id}</span></p>
        <img src={url} alt=""/>
     <button onClick={this.deleteContent} className="text">Sİl</button>
     <button className="text" onClick={this.update}>Güncelle</button>
          {this.state.update ?
            (
               <div><input
                className="update-input"
                type="text"
                placeholder="Yeni title girin.."
                onChange={this.getUpdateData}
              />
                <input className="update-submit" type="submit" onClick={this.updateContent} /> </div>)
            : null}
      </div>
     
      </>
    )
  }
}
