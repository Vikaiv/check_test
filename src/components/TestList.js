import React, { Component, Fragment } from "react";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import nanoid from "nanoid";

import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import Test from "./Test";
import TestDialog from "./TestDialog";

const styles = theme => ({
  addButton: {
    marginLeft: "auto",
    marginRight: 15,
    display: "flex",
  }
})

@inject("store")
@observer
class TestList extends Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  state = {
    isTestDialogOpen: false
  }

  openTestDialog = () => {
    this.setState({isTestDialogOpen: true})
  }

  closeTestDialog = () => {
    this.setState({isTestDialogOpen: false})
  }

  renderTestList = (tests) => (
    <List>
      {tests.map(item =>
        <Test key={nanoid()} name={item.name} questions={item.questions} />
      )}
    </List>);

  render() {
    const { store, classes } = this.props;
    const { tests }= store.tests;
    console.log("tests", tests);
    return (
      <Fragment>
        {tests && tests.length ? this.renderTestList(tests) : ""}
        <Fab
          color="secondary"
          aria-label="Добавить"
          className={classes.addButton}
          onClick={this.openTestDialog}
        >
          <AddIcon />
        </Fab>
        <TestDialog
          open={this.state.isTestDialogOpen}
          onOpen={this.openTestDialog}
          onClose={this.closeTestDialog}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(TestList);
