import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Pie3D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import QuestionWordingResult from "./QuestionWordingResult";
import data from "../fakeData/fakeData.json"

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  list: {
    paddingBottom: 30,
    paddingTop: 5,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 0`,
    paddingLeft: 15,
  },
  item: {
    paddingTop: 6,
    paddingBottom: 6
  }
});

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

const renderUnusedQuestionTypesList = (types, classes) => (
  <List className={classes.list}>
    {types.map((type, index) => (
      <ListItem key={`unused-${index}`} className={classes.item}>
        {console.log(type)}
        <ListItemText primary={`• ${type}`} />
      </ListItem>
    ))}
  </List>
)

const ResultsPage  = ({classes}) =>
    (<Fragment>
      <ReactFC
        {...coverageChartConfigs}
      />
      <ReactFC
        {...questionTypesDiversityConfigs}
      />
      <Typography variant="h6" className={classes.title}>
        Список неиспользуеммых типов вопроса:
      </Typography>
      {renderUnusedQuestionTypesList(data.questionTypesDiversity.missedTypes, classes)}
      <QuestionWordingResult data={data.wrongQuestionWording}/>
    </Fragment>)


export default withStyles(styles)(ResultsPage);