import React, { Component } from 'react';
import './Datas.css';
import {Link} from 'react-router-dom';
export default class Datas extends Component {
  render() {
    const url=`http://samet.drp-dev.com/${this.props.src}`;
    return (
      <div className="container">
        {' '}
        <table>
        <tr>
       <td> <Link to={{pathname:"/list", state:{title:this.props.title, id:this.props.id, src:this.props.src}}}>{this.props.title}</Link></td>
      <td style={{paddingLeft:"20%" }}> {this.props.id}</td>
      <td style={{paddingLeft:"40%" }}><img src={url} alt=""/></td>
      </tr></table></div>
    );
  }
}
