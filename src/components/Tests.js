import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import nanoid from "nanoid";
import Test from "./Test";
import theme from "../theme";

/* eslint-disable camelcase */

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 18px;
  padding-top: 17px;
  padding-bottom: 17px;
  border-top: 1px solid ${theme.colors.lightGray};
`;

const Content = styled.div`
    font-size: 12px;
    line-height: 18px;
    color: ${theme.colors.dark};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.1;
  color: ${theme.colors.limedSpruce};
`;

@inject("store")
@observer
class Tests extends Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  renderTestList = (tests) => (
    <List>
      {tests.map((item, index) =>
        (<TestContainer key={nanoid()}>
            <Test name={item.title} questions={item.questions} />
        </TestContainer>),
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
