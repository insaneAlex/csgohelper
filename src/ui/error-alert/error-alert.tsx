import {FC, ReactNode} from "react";
import classes from "./error-alert.module.css";

export const ErrorAlert: FC<{children: ReactNode}> = ({children}) => (
  <div className={classes.alert}>{children}</div>
);
