import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
import nanoid from "nanoid";

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import BaseList from "./BaseList";

import views from '../views/views';

const Elementary = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

@inject("store")
@observer
class Discipline extends Component {

  state = {
    isInfoShown: false
  }

  renderElementaries = (elementaries) =>
    elementaries.map(item =>
      <Elementary
        key={nanoid()}
      >
        • {item.description}
      </Elementary>)

showDisciplineInfo = () => {
  this.setState({
    isInfoShown: !this.state.isInfoShown,
  })
}

  showTests = (id) => {
    const { store } = this.props;
    const {router: {goTo}} = store;
    goTo(views.tests);
    store.fetchTests(id);
  }

  render() {
    const { name, elementaries, id, classes } = this.props;
    const { isInfoShown } = this.state;
    return (
      <BaseList
        primaryText={name}
        secondaryText={
            <List classes={classes}>
              {this.renderElementaries(elementaries)}
            </List>
        }
        primaryAction={{
          action:  this.showDisciplineInfo,
          title: "Развернуть",
        }}
        secondaryAction={{
          action: () => this.showTests(id),
          title: "Перейти к тестам",
        }}
        show={isInfoShown}
      >
      </BaseList>
    )
  }
}

export default Discipline;