import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import QuestionWordingResult from "./QuestionWordingResult";
import Pie3dChart from "./charts/Pie3dChart";
import Bar2dChart from "./charts/Bar2dChart";
import data from "../fakeData/fakeData.json"


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

const chartConfigs = {
  width: '700', 
  height: '400',
  dataFormat: 'json',
}

const coverageChartConfigsTotal = {
  ...chartConfigs,
  dataSource: data.coverage.total,
}

const coverageChartConfigsByElementary = {
  ...chartConfigs,
  dataSource: data.coverage.byElementary,
}

const questionTypesDiversityConfigs = {
  ...chartConfigs,
  dataSource: data.questionTypesDiversity.percentage,
}

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bar2dContainer = styled.div`
  align-self: flex-start;
`

const TableContainer = styled(ChartContainer)`
  align-items: flex-start;
  padding-left: 20px;
  padding-right: 25px;
`;

const renderUnusedQuestionTypesList = (types, classes) => (
  <List className={classes.list}>
    {types.map((type, index) => (
      <ListItem key={`unused-${index}`} className={classes.item}>
        <ListItemText primary={`• ${type}`} />
      </ListItem>
    ))}
  </List>
)

const ResultsPage  = ({classes}) =>
    (<Fragment>
      <ChartContainer>
        <Pie3dChart
          configs={coverageChartConfigsTotal}
        />
        <Bar2dContainer>
          <Bar2dChart
            configs={coverageChartConfigsByElementary}
          />
        </Bar2dContainer>
        <Pie3dChart
          configs={questionTypesDiversityConfigs}
        />
      </ChartContainer>
      <TableContainer>
        <Typography variant="h6" className={classes.title}>
          Список неиспользуеммых типов вопроса:
        </Typography>
        {renderUnusedQuestionTypesList(data.questionTypesDiversity.missedTypes, classes)}
        <QuestionWordingResult data={data.wrongQuestionWording}/>
      </TableContainer>
    </Fragment>)


export default withStyles(styles)(ResultsPage);