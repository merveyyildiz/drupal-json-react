import React, { Component } from 'react';
import './Image.css';
import base64 from 'base-64';
export default class Image extends Component {
  state = {
    gecici: '',
    durum: 0,
    value: {
      title: '',
      body: ''
    }
  };
  updateTitle = () => {
    this.setState({ durum: 1 });
  };
  getData = e => {
    const title = e.target.value;
    this.setState({ gecici: title });
  };
  handleSubmit = () => {
    const title = this.state.gecici;
    const body = this.state.gecici;
    console.log("kkk");
    console.log(`Basic ${base64.encode('merve:a')}`);
    console.log("lll");
    fetch('http://samet.drp-dev.com/merve/jsonapi/node/gallery', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Basic ${base64.encode('merve:a')}`
      },
      body: JSON.stringify({
      "data": {
        "type": "node--gallery",
        "attributes": {
          "title": "title",
          "body": {
            "value": "body",
            "format": "full_html"
          }
        }
      }
    
    }
    )}).then(response => {
      console.log('response', response);
      if (response.ok) {
        response.json().then((data) => {
          console.log('data', data);
        });
      } else {
        console.log('error');
      }
    });
  };
  render() {
    return (
      <>
        <div className="container">
          <h1>{this.props.title}</h1>
          <img
            className="img"
            alt=""
            src={`http://samet.drp-dev.com/${this.props.url}`}
          />
          <div className="middle">
            <button className="text" onClick={this.updateTitle}>
              Değiş
            </button>
          </div>
        </div>
        {this.state.durum ? (
          <div className="uploadimage">
            <input
              type="text"
              placeholder="Yeni title girin.."
              onChange={this.getData}
            />
            <input type="submit" onClick={this.handleSubmit} />
          </div>
        ) : null}
      </>
    );
  }
}
