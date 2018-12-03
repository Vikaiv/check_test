import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";

import FullscreenDialog from "./FullscreenDialog";
import TestForm from "./TestForm";

@inject("store")
@observer
class TestDialog extends React.Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  handleClose = () => {
    this.props.onClose();
  }

  addTest = () => {
    const { tests, testForm } = this.props.store;
    this.handleClose();
    tests.addTest(testForm.fields);
  }

  render() {
    const { onOpen, open } = this.props;
    return (
        <FullscreenDialog
          title="Добавление теста"
          mainAction={{
              mainActionTitle: "Сохранить",
              mainActionAction: this.addTest,
          }}
          onOpen={onOpen}
          onClose={this.handleClose}
          open={open}
        >
          <TestForm/>
        </FullscreenDialog>
    );
  }
}
export default TestDialog;