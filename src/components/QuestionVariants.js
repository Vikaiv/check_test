import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import nanoid from "nanoid";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class QuestionVariants extends Component {
  state = {
    variantInputs: ["", "", "", ""],
  }

  handleAnswerVariantsChanged = (event) => {
    const { value, id } = event.target;
    const digitRegexp = /\d{1,3}/
    const index = digitRegexp.exec(id)[0];
    // this.props.onQuestionChanged(event, array);
    this.setState(state => {
      state.variantInputs[index] = value;
      return state;
    } , () => this.props.onAnswerVariantsChanged(this.state.variantInputs, 0));
  }

  renderAnswerVariants = (inputs, cardIndex) => (
    inputs.map((item, index) => 
      <TextField
        key={`${cardIndex}-${index}`}
        id={`variant-${index}`}
        name={`answerVariants-${cardIndex}`}
        label={`Вариант ${index+1}`}
        type="text"
        fullWidth
        margin="normal"
        onChange={this.handleAnswerVariantsChanged}
        value={this.state.variantInputs[index]}
    />
    )
  )

  render() {
    const { classes, cardIndex, answerVariants } = this.props;
    return (
      <form className={classes} noValidate autoComplete="off">
        {this.renderAnswerVariants(this.state.variantInputs, cardIndex)}
      </form>)
  }
};
export default withStyles(styles)(QuestionVariants);