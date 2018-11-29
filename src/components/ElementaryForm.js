import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  indexField: {
    marginRight: theme.spacing.unit,
    width: 170,
  },
  nameField: {
    width: `calc(100% - 170px - ${theme.spacing.unit}px)`
  },
  addButton: {
    marginLeft: "auto",
    marginRight: 15,
    display: "flex",
  }
});


class ElementaryForm extends Component {
  render() {
    const { classes, onElementaryChanged, index } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id={`number-${index}`}
          label="Индекс компетенции"
          type="text"
          fullWidth
          className={classes.indexField}
          margin="normal"
          onChange={onElementaryChanged}
        />
        <TextField
          id={`elementaryName-${index}`}
          label="Название компетенции"
          type="text"
          fullWidth
          className={classes.nameField}
          margin="normal"
          onChange={onElementaryChanged}
        />
      </form>)
  }
};
export default withStyles(styles)(ElementaryForm);