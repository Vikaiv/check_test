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

  // addTest = () => {
  //   const { disciplines, disciplineForm } = this.props.store;
  //   this.handleClose();
  //   disciplines.addDiscipline(disciplineForm.fields);
  // }

  render() {
    const { onOpen, open } = this.props;
    return (
        <FullscreenDialog
          title="Добавление теста"
          mainAction={{
              mainActionTitle: "Сохранить",
              mainActionAction: () => {},
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