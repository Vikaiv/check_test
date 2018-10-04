import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
// import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
import theme from "../../../../../../theme";

class Discipline extends Component {
  state = {
    isInfoShown: false,
  }

  renderElementaries = (elementaries) => {
    elementaries.map(item =>
      <Elementary>
        <div>{item.number}</div>
        <div>{item.description}</div>
      </Elementary>)
  }

  showInfo = () => {
    this.setState({isInfoShown: !isInfoShown})
  }

  render() {
    const { number, name, elementaries } = this.props;
    const { isInfoShown } = this.state;
    return (
      <div>
        {number}
        {name}
        <button onCLick={this.showInfo}>Show info</button>
        {isInfoShown &&
          this.renderElementaries
        }
    </div>
    )
  }
}

export default Discipline;