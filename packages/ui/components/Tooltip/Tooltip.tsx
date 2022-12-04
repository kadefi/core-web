import ClickAwayListener from "@mui/material/ClickAwayListener";
import MuiTooltip from "@mui/material/Tooltip";
import { ReactElement, useState } from "react";

import { Breakpoint } from "../../constants";
import { useMinWidth } from "../../hooks";

type Props = {
  children: ReactElement;
  content: string;
  tooltipClassname?: string;
};
const Tooltip = (props: Props) => {
  const { children, tooltipClassname, content } = props;

  const mdAndAbove = useMinWidth(Breakpoint.md);

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  if (mdAndAbove) {
    return (
      <MuiTooltip
        arrow
        title={content}
        slotProps={{ tooltip: { className: tooltipClassname } }}
      >
        {children}
      </MuiTooltip>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <MuiTooltip
        arrow
        title={content}
        slotProps={{ tooltip: { className: tooltipClassname } }}
        onClose={handleTooltipClose}
        open={open}
        onClick={handleTooltipOpen}
      >
        {children}
      </MuiTooltip>
    </ClickAwayListener>
  );
};

export default Tooltip;
