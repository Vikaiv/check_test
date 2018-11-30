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
  questionType: "",
  description: "",
  answerVariants: [],
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
      console.log("render question cards", this.state.questions[index].questionType);
      return (
      <QuestionForm
        key={`questionForm-${index}`}
        index={index}
        onQuestionChanged={this.handleQuestionsChanged}
        questionType={this.state.questions[index].questionType}
        description={this.state.questions[index].description}
      />)})
  }

  handleNameChanged = (event) => {
    this.props.store.testForm.updateField("name", event.target.value)
    this.setState({ name: event.target.value })
  }

  handleQuestionsChanged = (event) => {
    const { value, name } = event.target;
    const digitRegExp = /\d{1,4}/;
    const typeRegExp = /(questionType|questionDescription)/;
    const index = digitRegExp.exec(name)[0];
    console.log("index", index);
    const type = typeRegExp.exec(name)[0];
    console.log(this.state.questions[index][type]);
    this.setState((state) => {
      state.questions[index][type] = value;
      return state;
    }, () => {
      console.log("state questions after change", this.state.questions);
      this.props.store.testForm.updateField("questions", this.state.questions)
    })
  }

  render() {
    const { classes, open, } = this.props;
    const { questions, name } = this.state;
    console.log("render state", this.state.questions);
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