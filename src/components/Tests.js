import React, { Component } from "react";
import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import nanoid from "nanoid";

import List from '@material-ui/core/List';

import Test from "./Test";

@inject("store")
@observer
class Tests extends Component {
  static propTypes = {
    store: PropTypesMobx.observableObject,
  };

  renderTestList = (tests) => (
    <List>
      {tests.map(item =>
        <Test key={nanoid} name={item.title} questions={item.questions} />
      )}
    </List>);

  render() {
    const { tests }= this.props.store;
    return (
      <div>{tests.length && this.renderTestList(tests)}</div>
    );
  }
}

export default Tests;
