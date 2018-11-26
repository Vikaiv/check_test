

import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import nanoid from "nanoid";
// import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";

import List from '@material-ui/core/List';

import BaseList from "./BaseList";

class Test extends Component {
  state = {
    isInfoShown: false,
  }

  showInfo = () => {
    this.setState({isInfoShown: !this.state.isInfoShown})
  }

  renderQuestions = (questions) =>
    questions.map(question => 
      <div key={nanoid()}>
        Вопрос: {question.description}
        Тип вопроса: {question.question_type}
        Варианты ответа: {question.answer_variants}
        Правильный ответ: {question.right_answer}
      </div>
    )

  render = () => {
    const { name, questions, classes } = this.props;
    const { isInfoShown } = this.props;
    return (
      <BaseList
        primaryText={name}
        secondaryText={
            <List classes={classes}>
              {this.renderQuestions(questions)}
            </List>
        }
        primaryAction={{
          action:  this.showInfo,
          title: "Развернуть",
        }}
        secondaryAction={{
          action: this.checkTest,
          title: "Проверить на соответствие",
        }}
        show={isInfoShown}
      >
      </BaseList>)
    }
}

export default Test;