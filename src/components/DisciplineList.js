import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import Discipline from "./Discipline";
import theme from "../theme";

/* eslint-disable camelcase */

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const DisciplineContainer = styled.div`
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
class DisciplineList extends Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  renderDisciplineList = (disciplines) => (
    <List>
      {disciplines.map(item =>
        (<DisciplineContainer key={nanoid()}>
            <Discipline name={item.description} number={item.number} elementaries={item.elementaries} />
        </DisciplineContainer>),
      )}
    </List>);

  render() {
    const disciplines = this.props.store.disciplines;
    // console.log(disciplines);
    return (
        <ThemeProvider theme={theme}>
          <div>{this.renderDisciplineList(disciplines)}</div>
        </ThemeProvider>
    );
  }
}

export default DisciplineList;
