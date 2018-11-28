import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Pie3D from 'fusioncharts/fusioncharts.charts';

ReactFC.fcRoot(FusionCharts, Pie3D, FusionTheme);

const Pie3dChart = ({configs}) => {
  const chartConfigsPie = {
    type: 'pie3d',
    ...configs,
  }

  return (
    <ReactFC
      {...chartConfigsPie}
    />
  )
  
};

export default Pie3dChart;