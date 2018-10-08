import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
// import Elementary from "./Elementary";
// import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
// import theme from "../../../../../../theme";

const Elementary = styled.div`
  display: flex;
  height: 20px;
`;
class Discipline extends Component {
  state = {
    isInfoShown: false,
  }

  renderElementaries = (elementaries) =>
    elementaries.map(item =>
      <Elementary>
        {item.number} {item.description}
      </Elementary>)

  showInfo = () => {
    this.setState({isInfoShown: !this.state.isInfoShown})
  }

  render() {
    const { number, name, elementaries } = this.props;
    console.log(elementaries);
    const { isInfoShown } = this.state;
    console.log(isInfoShown);
    return (
      <div>
        {number}
        {name}
        <button onClick={this.showInfo}>Show info</button>
        {isInfoShown &&
          <div>{this.renderElementaries(elementaries)}</div>
        }
        <button onClick={() => console.log("show test")}>Show available tests</button>
    </div>
    )
  }
}

export default Discipline;