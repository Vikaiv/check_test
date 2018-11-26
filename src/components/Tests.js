import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import nanoid from "nanoid";

import List from '@material-ui/core/List';

import theme from "../theme";
import Test from "./Test";

@inject("store")
@observer
class Tests extends Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  renderTestList = (tests) => (
    <List>
      {tests.map(item =>
        <Test key={nanoid} name={item.title} questions={item.questions} />
      )}
    </List>);

  render() {
    const { tests }= this.props.store;
    console.log(tests.length);
    return (
        <ThemeProvider theme={theme}>
          <div>{tests.length && this.renderTestList(tests)}</div>
        </ThemeProvider>
    );
  }
}

export default Tests;
