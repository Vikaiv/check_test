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
    inputs: [""],
  }

  addElementaryField = () => {
    this.setState({ inputsCount: this.state.inputs.push("") })
  }

  renderInputs = (inputs) => {
    return inputs.map((item, index) => <ElementaryForm key={`input-${index}`}/>)
  }

  render() {
    const { classes, open, } = this.props;
    const { inputs } = this.state;
    return (
      <FormContainer>
          <TextField
            autoFocus
            id="discipline-name"
            label="Название"
            type="text"
            fullWidth
          />
          {this.renderInputs(inputs)}
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