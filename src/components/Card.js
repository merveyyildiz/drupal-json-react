import React, { Component } from 'react';
import axios from 'axios';
import Datas from './Datas';
import Search from './Search';
import Add from './Add';
import './Card.css';
export default class Card extends Component {
  state = {
    datas: [],
    realy_data: [],
    searchString: ''
  };

  componentDidMount() {
    for (let i = 0; i < 8; i++) {
      axios
        .get(
          'http://samet.drp-dev.com/merve/jsonapi/node/gallery?include=field_gallery_image'
        )
        .then(res => {
          const title = res.data.data[i].attributes.title;
          const id= res.data.data[i].id;
          const data = {
            title: title,
            id:id
          };
          const old = this.state.datas;
          const datas = [...old, data];
          this.setState({ datas: datas, realy_data: datas });
        });
    }
  }
  handleChange = e => {
    const search = e.target.value;
    if (search !== '') {
      const old_datas = this.state.realy_data;
      const datas = old_datas.filter(ttl => {
        return ttl.title.includes(search);
      });
      this.setState({ datas });
    } else {
      this.setState({ datas: this.state.realy_data });
    }
  };

  render() {
    const { datas } = this.state;
    const data = datas.map((data, index) => {
      return <Datas key={index} title={data.title}  id={data.id} />;
    });
    return (
      <>
      <h1>Drupal 8 Json Apı Get, Post, Delete, Patch</h1>
        <Search handleChange={this.handleChange} />
        <Add/>
        <div className="frame">{data}</div>
      </>
    );
  }
}
