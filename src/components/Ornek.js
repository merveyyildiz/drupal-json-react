import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image';
import Search from './Search';
import './Ornek.css';
export default class ornek extends Component {
  state = {
    datas: [],
    realy_data: [],
    searchString: ''
  };

  componentDidMount() {
    for (let i = 0; i < 6; i++) {
      axios
        .get(
          'http://samet.drp-dev.com/merve/jsonapi/node/gallery?include=field_gallery_image'
        )
        .then(res => {
          const title = res.data.data[i].attributes.title;
          const img = res.data.included[i].attributes.uri.url;
          const data = {
            title: title,
            imgurl: img
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
      const datas = old_datas.filter(img => {
        return img.title.includes(search);
      });
      this.setState({ datas });
    } else {
      this.setState({ datas: this.state.realy_data });
    }
  };

  render() {
    const { datas } = this.state;
    const image = datas.map((data, index) => {
      return <Image key={index} title={data.title} url={data.imgurl} />;
    });

    return (
      <>
        <Search handleChange={this.handleChange} />
        <div className="frame">{image}</div>
      </>
    );
  }
}
