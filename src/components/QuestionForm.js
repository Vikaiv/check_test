import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import nanoid from "nanoid";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import QuestionVariants from "./QuestionVariants";
import questionTypes from "../data/questionTypes";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: "15px 25px 14px 10px"
  },
  select: {
    width: "100%"
  },
  addButton: {
    marginLeft: "auto",
    marginRight: 15,
    display: "flex",
  },
  formControl: {
    marginLeft: 0,
    marginRight: 0,
    minWidth: 170,
    width: "50%"
  },
});


class QuesionForm extends Component {

  renderQuestionOptions = (options) => (
    options.map(option => (
      <MenuItem
        value={option.value}
        key={nanoid()}
      >
        {option.label}
      </MenuItem>))
  );

  handleQuestionChanged = (event, value) => {
    console.log("changeee", value);
    () => this.props.onQuestionChanged(event. value);
  }

  render() {
    const { classes, onQuestionChanged, onAnswerVariantsChanged, index, type, answerVariants } = this.props;
    return (
      <Card className={classes.container}>
        <TextField
          name={`description-${index}`}
          label="Формулировка вопроса"
          type="text"
          fullWidth
          margin="normal"
          onChange={onQuestionChanged}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="question-type-select">Тип вопроса</InputLabel>
          <Select
            className={classes.select}
            value={type}
            onChange={onQuestionChanged}
            inputProps={{
              name: `type-${index}`,
              id: 'question-type-select',
            }}
          >
            {this.renderQuestionOptions(questionTypes)}
          </Select>
        </FormControl>
        {(type === "alternativeChoice" ||
          type === "multipleChoice") &&
          <QuestionVariants
            cardIndex={index}
            onAnswerVariantsChanged={onAnswerVariantsChanged}
            answerVariants={answerVariants}
          />
        }
      </Card>)
  }
};
export default withStyles(styles)(QuesionForm);