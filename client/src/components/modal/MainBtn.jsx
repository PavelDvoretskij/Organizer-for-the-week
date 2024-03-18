import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Check, DeleteForever, Edit } from "@mui/icons-material";

function MainBtn({ edit, checkDone, remove, item, done, index, marginTop }) {
  return (
    <div>
      <div className={"btn-container"}>
        <Tooltip title="Изменить" disableInteractive slotProps={marginTop}>
          <IconButton size={"small"} onClick={() => edit(item, index)}>
            <Edit color={"success"} sx={{ fontSize: "15px" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Отметить" disableInteractive slotProps={marginTop}>
          <IconButton size={"small"} onClick={() => checkDone(item, done)}>
            <Check color={"success"} sx={{ fontSize: "15px" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Удалить" disableInteractive slotProps={marginTop}>
          <IconButton size={"small"} onClick={() => remove(item)}>
            <DeleteForever color={"error"} sx={{ fontSize: "15px" }} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

export default MainBtn;
