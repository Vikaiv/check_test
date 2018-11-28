import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Bar2D from 'fusioncharts/fusioncharts.charts';

ReactFC.fcRoot(FusionCharts, Bar2D, FusionTheme);

const Bar2dChart = ({configs}) => {
  const chartConfigsBar = {
    type: 'bar2d',
    ...configs,
  }

  return (
    <ReactFC
      {...chartConfigsBar}
    />
  )
  
};

export default Bar2dChart;