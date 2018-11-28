import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  paddingNone: {
    paddingRight: 70
  },
  paddingDense: {
    paddingRight: 15,
    paddingLeft: 15,
  }
});

const renderMistakes = (data) => (
  data.map(mistake => (
    <span>{mistake},<br /></span>
  ))
)

const renderTableContent = (data, classes) => (
  data.map(row => (
    <TableRow className={classes.row} key={row.id}>
      <CustomTableCell padding="checkbox" component="th" scope="row">
        {row.number}
      </CustomTableCell>
      <CustomTableCell className={classes.paddingDense}>{row.title}</CustomTableCell>
      <CustomTableCell padding="dense">
        {renderMistakes(row.mistakes)}
      </CustomTableCell>
    </TableRow>
  ))
)

const QuestionWordingResult = ({data, classes}) => (
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        <CustomTableCell padding="checkbox">№</CustomTableCell>
        <CustomTableCell className={classes.paddingDense}>Вопрос</CustomTableCell>
        <CustomTableCell padding="dense">Список ошибок</CustomTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
       {renderTableContent(data, classes)}
    </TableBody>
  </Table>
);

export default withStyles(styles)(QuestionWordingResult);