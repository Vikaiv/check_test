import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import nanoid from "nanoid";
import List from '@material-ui/core/List';
import Discipline from "./Discipline";

@inject("store")
@observer
class DisciplineList extends Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

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
    const { disciplines } = this.props.store.disciplines;
    return (
      <div>{disciplines.length ? this.renderDisciplineList(disciplines) : ""}</div>
    );
  }
}

export default DisciplineList;
