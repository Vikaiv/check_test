import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import DisciplineForm from "./DisciplineForm";


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@inject("store")
@observer
class DisciplineDialog extends React.Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  constructor(props) {
    super(props);
  }

  handleClose = () => {
    this.props.onClose();
  }

  addDiscipline = () => {
    const { disciplines, disciplineForm } = this.props.store;
    disciplines.addDiscipline(disciplineForm.fields);
  }

  render() {
    const { classes, open, onOpen, onClose } = this.props;
    return (
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Добавление дисциплины
              </Typography>
              <Button color="inherit" onClick={this.addDiscipline}>
                Сохранить
              </Button>
            </Toolbar>
          </AppBar>
          <DisciplineForm />
        </Dialog>
    );
  }
}

DisciplineDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisciplineDialog);