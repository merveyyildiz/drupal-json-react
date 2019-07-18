import React, { Component } from 'react';
import './Search.css';
import {Animated} from "react-animated-css";
export default class Search extends Component {
  render() {
    return (
      <Animated animationIn="jello" animationOut="fadeOut">
      <input
        type="text"
        placeholder="Search here..."
        className="search animate snake"
        onChange={this.props.handleChange}
      />
      </Animated>
    );
  }
}
