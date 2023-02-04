import {FC, ReactNode} from "react";
import {JsxElement} from "typescript";
import classes from "./logistics-item.module.css";

type Props = {
  icon: FC;
  children: ReactNode;
};

const LogisticsItem: FC<Props> = ({icon: Icon, children}) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
