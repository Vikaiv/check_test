import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import QuestionForm from "./QuestionForm";

const styles = theme => ({
  addButton: {
    marginLeft: "auto",
    marginRight: 15,
    display: "flex",
  }
});

const questionObject = {
  type: "",
  description: "",
  answerVariants: ["", "", "", ""],
}

const FormContainer = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 25px;
`

@inject("store")
@observer
class TestForm extends React.Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  state = {
    name: "",
    questions: [questionObject],
  }

  addQuestionCard = () => {
    this.setState({ 
      questions: this.state.questions.concat([questionObject])
    })
  }
  
  renderQuestionCards = (questions) => {
    return questions.map((item, index) => {
      return (
      <QuestionForm
        key={`questionForm-${index}`}
        index={index}
        onQuestionChanged={this.handleQuestionsChanged}
        onAnswerVariantsChanged={this.handleAnswerVariantsChanged}
        type={this.state.questions[index].type}
        description={this.state.questions[index].description}
        answerVariants={this.state.questions[index].answerVariants}
      />)})
  }

  handleNameChanged = (event) => {
    this.props.store.testForm.updateField("name", event.target.value)
    this.setState({ name: event.target.value })
  }

  handleAnswerVariantsChanged = (value, index) => {
    this.setState((state) => {
      state.questions[index]["answerVariants"] = value;
      return state;
    }, () => this.props.store.testForm.updateField("questions", this.state.questions))
  }

  handleQuestionsChanged = (event, valueParameter) => {
    const { value, name } = event.target;
    const valueToSet = value || valueParameter;
    const digitRegExp = /\d{1,4}/;
    const typeRegExp = /(type|description)/;
    const index = digitRegExp.exec(name)[0];
    const type = typeRegExp.exec(name)[0];
    this.setState((state) => {
      state.questions[index][type] = valueToSet;
      return state;
    }, () => {
      console.log("state questions after change", this.state.questions[index][type]);
      this.props.store.testForm.updateField("questions", this.state.questions)
    })
  }

  render() {
    const { classes, open } = this.props;
    const { questions, name } = this.state;
    return (
      <FormContainer>
        <TextField
          autoFocus
          id="test-name"
          label="Название теста"
          type="text"
          fullWidth
          onChange={this.handleNameChanged}
          value={name}
        />
        {this.renderQuestionCards(questions)}
        <Fab
          color="secondary"
          aria-label="Добавить"
          className={classes.addButton}
          onClick={this.addQuestionCard}
        >
          <AddIcon />
        </Fab>
      </FormContainer>
    );
  }
}

export default withStyles(styles)(TestForm);