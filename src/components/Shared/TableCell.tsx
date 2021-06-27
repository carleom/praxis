import {
  Theme,
  withStyles,
  createStyles,
  TableCell as MUITableCell,
} from "@material-ui/core";
import { Common } from "../../constants";

const commonStyles = {
  fontFamily: "Inter",
  borderBottom: "none",
  padding: 14,
};

const TableCell = withStyles((theme: Theme) =>
  createStyles({
    body: {
      color: theme.palette.grey[400],
      fontSize: 16,
      ...commonStyles,
      [theme.breakpoints.down(Common.DESKTOP_BREAKPOINT)]: {
        fontSize: 14,
        padding: "2px 14px",
      },
    },
    head: {
      color: theme.palette.grey[600],
      fontSize: 12,
      ...commonStyles,
      paddingBottom: 0,
    },
  })
)(MUITableCell);

export default TableCell;
