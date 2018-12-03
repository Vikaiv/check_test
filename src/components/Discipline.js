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

const styles = theme => ({
  list: {
    paddingLeft: 15,
  }
})

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
        • {item.number} {item.elementaryName}
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
    store.tests.fetchTests(id);
    store.testForm.updateField("discipline", id);
  }

  deleteDiscipline = (id) => {
    console.log(id);
    const { store } = this.props;
    store.disciplines.deleteDiscipline(id);
  }

  render() {
    const { name, elementaries, id, classes } = this.props;
    const { isInfoShown } = this.state;
    return (
      <BaseList
        primaryText={name}
        secondaryText={
            <List className={classes.list}>
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
        onDeleteItem={() => this.deleteDiscipline(id)}
      >
      </BaseList>
    )
  }
}

export default withStyles(styles)(Discipline);