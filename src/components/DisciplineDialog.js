import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";

import FullscreenDialog from "./FullscreenDialog";
import DisciplineForm from "./DisciplineForm";

@inject("store")
@observer
class DisciplineDialog extends React.Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  handleClose = () => {
    this.props.onClose();
  }

  addDiscipline = () => {
    const { disciplines, disciplineForm } = this.props.store;
    this.handleClose();
    disciplines.addDiscipline(disciplineForm.fields);
  }

  render() {
    const { onOpen, open } = this.props;
    return (
        <FullscreenDialog
          title="Добавление дисциплины"
          mainAction={{
              mainActionTitle: "Сохранить",
              mainActionAction: this.addDiscipline,
          }}
          onOpen={onOpen}
          onClose={this.handleClose}
          open={open}
        >
          <DisciplineForm/>
        </FullscreenDialog>
    );
  }
}
export default DisciplineDialog;