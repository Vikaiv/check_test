import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import nanoid from "nanoid";

import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import Discipline from "./Discipline";
import DisciplineDialog from "./DisciplineDialog";

const styles = theme => ({
  addButton: {
    marginLeft: "auto",
    marginRight: 15,
    display: "flex",
  }
})

@inject("store")
@observer
class DisciplineList extends Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  state = {
    isDisciplineDialogOpen: false
  }

  addDiscipline = () => {
    this.closeDisciplineDialog();
    this.store.disciplines.addDiscipline();
  }

  openDisciplineDialog = () => {
    this.setState({isDisciplineDialogOpen: true})
  }

  closeDisciplineDialog = () => {
    this.setState({isDisciplineDialogOpen: false})
  }

  renderDisciplineList = (disciplines) => (
      <List>
        {disciplines.map(item =>
          (<Discipline
              key={nanoid()}
              name={item.description}
              number={item.number}
              elementaries={item.elementaries}
              id={item._id}
              isInfoShown={item.isInfoShown}
            />
        ))}
      </List>
    );

  render() {
    const { classes } = this.props;
    const { disciplines } = this.props.store.disciplines;
    return (
      <Fragment>
        {disciplines.length ? this.renderDisciplineList(disciplines) : ""}
        <Fab
          color="secondary"
          aria-label="Добавить"
          className={classes.addButton}
          onClick={this.openDisciplineDialog}
        >
          <AddIcon />
        </Fab>
        <DisciplineDialog
          open={this.state.isDisciplineDialogOpen}
          onOpen={this.openDisciplineDialog}
          onClose={this.closeDisciplineDialog}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(DisciplineList);
