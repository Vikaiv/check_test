import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
// import theme from "../../../../../../theme";
import views from '../views/views';

const Elementary = styled.div`
  display: flex;
  height: 20px;
`;

@inject("store")
@observer
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

  showTests = (id) => {
    const { store } = this.props;
    const {router: {goTo}} = store;
    goTo(views.tests);
    store.fetchTests(id);
  }

  render() {
    const { number, name, elementaries, id } = this.props;
    const { isInfoShown } = this.state;
    return (
      <div>
        {number}
        {name}
        <button onClick={this.showInfo}>Show info</button>
        {isInfoShown &&
          <div>{this.renderElementaries(elementaries)}</div>
        }
        <button onClick={() => this.showTests(id)}>Show available tests</button>
    </div>
    )
  }
}

export default Discipline;