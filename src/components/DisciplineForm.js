import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";

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

@inject("store")
@observer
class DisciplineForm extends React.Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

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
    this.props.store.disciplineForm.updateField("disciplineName", event.target.value)
    this.setState({ disciplineName: event.target.value })
  }

  handleElementariesChanged = (event) => {
    const { id, value } = event.target;
    const digitRegExp = /\d{1,4}/;
    const typeRegExp = /(number|elementaryName)/;
    const index = digitRegExp.exec(id);
    const type = typeRegExp.exec(id)[0];
    this.setState((state) => {
      state.elementaries[index][type] = value;
    }, () => this.props.store.disciplineForm.updateField("elementaries", this.state.elementaries)
    )
  }

  render() {
    const { classes, open, } = this.props;
    const { elementaries } = this.state;
    console.log(this.state);
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