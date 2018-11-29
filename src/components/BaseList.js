import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
import nanoid from "nanoid";

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    flexGrow: 1,
    padding: 0,
  },
  padding: {
    paddingLeft: 40,
  },
  containedPrimary: {
    marginRight: 10
  }
});

const BaseList = ({
  classes,
  primaryAction,
  secondaryAction,
  primaryText,
  secondaryText,
  show,
  onDeleteItem,
 }) => (
      <List className={classes.root}>
        <ListItem
          button
          // onClick={primaryAction.action}
        >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <ListItemText className={classes.padding}>
            {primaryText}
            {show && secondaryText}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={onDeleteItem}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={primaryAction.action}
              className={classes.containedPrimary}
              >
                {primaryAction.title}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={secondaryAction.action}
              size="small"
              >
              {secondaryAction.title}
            </Button>
          </div>
        </Grid>
        </ListItem>
    </List>
  )

BaseList.propTypes = {
  classes: PropTypes.object.isRequired,
  primaryAction: PropTypes.shape({
    action: PropTypes.func,
    title: PropTypes.string,
  }),
  secondaryAction: PropTypes.shape({
    action: PropTypes.func,
    title: PropTypes.string,
  }),
  primaryText: PropTypes.string,
  secondaryText: PropTypes.node,
  show: PropTypes.bool,
};

export default withStyles(styles)(BaseList);