import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});


class QuestionVariants extends Component {
  render() {
    const { classes } = this.props;
    return (
      <form className={classes} noValidate autoComplete="off">
        <TextField
          id="answerVariant1"
          label="Вариант 1"
          type="text"
          fullWidth
          // className={classes.indexField}
          margin="normal"
          // onChange={onElementaryChanged}
        />
        <TextField
          id="answerVariant2"
          label="Вариант 2"
          type="text"
          fullWidth
          // className={classes.nameField}
          margin="normal"
          // onChange={onElementaryChanged}
        />
        <TextField
          id="answerVariant3"
          label="Вариант 3"
          type="text"
          fullWidth
          // className={classes.indexField}
          margin="normal"
          // onChange={onElementaryChanged}
        />
        <TextField
          id="answerVariant4"
          label="Вариант 4"
          type="text"
          fullWidth
          // className={classes.nameField}
          margin="normal"
          // onChange={onElementaryChanged}
        />
      </form>)
  }
};
export default withStyles(styles)(QuestionVariants);