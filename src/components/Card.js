import React, { Component } from 'react';
import axios from 'axios';
import './Card.css';
export default class Card extends Component {
  state = {
    imgurl: [],
    variable: 0
  };
  randomimage = () => {
    this.setState({ imgurl: [] });
    const sınır = 8;
    for (let i = 0; i < sınır; i++) {
      axios
        .get(`https://dog.ceo/api/breeds/image/random`)
        .then(res => {
          const url = res.data.message;
          const old_url = this.state.imgurl;
          const imgurl = [...old_url, url];
          this.setState({ imgurl });
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState({ variable: 1 });
  };
  componentDidMount() {
    this.randomimage();
  }

  render() {
    const { imgurl } = this.state;
    const dizi = imgurl.map((imgurl, index) => {
      if (this.state.variable) {
        return <img key={index} className="img" alt="" src={imgurl} />;
      } else {
        return null;
      }
    });
    return (
      <>
        <div className="frame1">
          <div className="frame">{dizi}</div>
          <button className="button" onClick={this.randomimage}>
            Değiş
          </button>
          
        </div>
      </>
    );
  }
}
