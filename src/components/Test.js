

import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import nanoid from "nanoid";
// import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
// import theme from "../../../../../../theme";

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
    const { name, questions } = this.props;
    return (
      <div>
        {name}
        {this.state.isInfoShown &&
          this.renderQuestions(questions)
        }
        <button onClick={this.showInfo}>show</button>
        <button onClick={this.checkTest}>Проверить тест на соответствие</button>
    </div>)
  } 
}
export default Test;