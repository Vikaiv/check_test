import React, { Fragment, Component } from "react";
import styled, { ThemeProvider } from "styled-components";
// import { observer, inject, PropTypes as PropTypesMobx } from "mobx-react";
import PropTypes from "prop-types";
// import theme from "../../../../../../theme";

const Elementary = ({ elementary: {number, description} }) =>(
      <div>
        {number}
        {description}
    </div>)

export default Elementary;