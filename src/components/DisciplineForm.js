import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ElementaryForm from "./ElementaryForm";

const styles = theme => ({
  addButton: {
    marginLeft: "auto",
    marginRight: 15,
    display: "flex",
  }
});

const FormContainer = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 25px;
`

class DisciplineForm extends React.Component {
  state = {
    elementaries: [{number: "", elementaryName: ""}],
    disciplineName: "",
  }

  addElementaryField = () => {
    this.setState({ 
      elementaries: this.state.elementaries.concat([{number: "", elementaryName: ""}])
    })
  }

  renderInputs = (elementaries) => {
    return elementaries.map((item, index) => (
      <ElementaryForm
        key={`input-${index}`}
        index={index}
        onElementaryChanged={this.handleElementariesChanged}
      />))
  }

  handleNameChanged = (event) => {
    this.setState({ disciplineName: event.target.name })
  }

  handleElementariesChanged = (event) => {
    const { id, value } = event.target;
    const digitRegExp = /\d{1,4}/;
    const typeRegExp = /(number|elementaryName)/;
    const index = digitRegExp.exec(id);
    const type = typeRegExp.exec(id)[0];
    console.log("type",type);
    this.setState((state) => {
      state.elementaries[index][type] = value;
    }, () => console.log(this.state))
  }

  render() {
    const { classes, open, } = this.props;
    const { elementaries } = this.state;
    return (
      <FormContainer>
          <TextField
            autoFocus
            id="discipline-name"
            label="Название"
            type="text"
            fullWidth
            onChange={this.handleNameChanged}
          />
          {this.renderInputs(elementaries)}
          <Fab
            color="secondary"
            aria-label="Добавить"
            className={classes.addButton}
            onClick={this.addElementaryField}
          >
            <AddIcon />
        </Fab>
      </FormContainer>
    );
  }
}

export default withStyles(styles)(DisciplineForm);