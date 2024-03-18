import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Close, Save } from "@mui/icons-material";

function CheckBtn({ updateTodo, item, done, cancel, marginTop }) {
  return (
    <div className={"flex flex-nowrap items-center"}>
      <Tooltip title="Сохранить" disableInteractive slotProps={marginTop}>
        <IconButton size={"small"} onClick={() => updateTodo(item, done)}>
          <Save className={"cursor-pointer"} sx={{ fontSize: "15px" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Отменить" disableInteractive slotProps={marginTop}>
        <IconButton size={"small"} onClick={cancel}>
          <Close className={"cursor-pointer"} sx={{ fontSize: "15px" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default CheckBtn;
