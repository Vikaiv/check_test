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
class FullscreenDialog extends React.Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  constructor(props) {
    super(props);
  }

  addDiscipline = () => {
    const { disciplines, disciplineForm } = this.props.store;
    disciplines.addDiscipline(disciplineForm.fields);
  }

  render() {
    const {
      children,
      classes,
      open,
      title,
      onClose,
      mainAction: {mainActionTitle, mainActionAction}
    } = this.props;
    return (
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              <Button color="inherit" onClick={mainActionAction}>
                {mainActionTitle}
              </Button>
            </Toolbar>
          </AppBar>
          {children}
        </Dialog>
    );
  }
}

FullscreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullscreenDialog);