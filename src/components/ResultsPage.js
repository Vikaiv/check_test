import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Pie3D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import QuestionWordingResult from "./QuestionWordingResult";
import data from "../fakeData/fakeData.json"

import { withStyles } from '@material-ui/core/styles';

ReactFC.fcRoot(FusionCharts, Pie3D, FusionTheme);
const chartConfigs = {
  type: 'pie3d',
  width: '700', 
  height: '400',
  dataFormat: 'json',
}

const coverageChartConfigs = {
  ...chartConfigs,
  dataSource: data.coverage,
}

const questionTypesDiversityConfigs = {
  ...chartConfigs,
  dataSource: data.questionTypesDiversity.percentage,
}

// const chartConfigs = {
//   type: 'pie3d',// The chart type
//   width: '700', // Width of the chart
//   height: '400', // Height of the chart
//   dataFormat: 'json',
//   dataSource: data.coverage,
// }
class ResultsPage extends Component {
  render = () =>
    (<Fragment>
      <ReactFC
        {...coverageChartConfigs}
      />
      <ReactFC
        {...questionTypesDiversityConfigs}
      />
      <QuestionWordingResult data={data.wrongQuestionWording}/>
    </Fragment>)
}


export default ResultsPage;