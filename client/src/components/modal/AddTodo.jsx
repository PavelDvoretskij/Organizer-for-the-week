import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";
import { addTodos } from "../../redux-state/todoSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function AddTodo({ setShowServerMessage }) {
  const [value, setValue] = useState("");

  const date = useSelector((state) => state.date.dateCell);

  const dispatch = useDispatch();

  const changeValue = (e) => {
    setValue(e.target.value);
  };

  const click = () => {
    dispatch(addTodos({ date, value }));
    setShowServerMessage(true);
    setValue("");
  };

  return (
    <div className={"pt-3"}>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label={"Новое дело"}
          InputLabelProps={{
            style: { fontSize: "15px" },
          }}
          size="small"
          color="success"
          type={"text"}
          fullWidth
          value={value}
          sx={{ placeholder: { fontSize: "10px" } }}
          onChange={changeValue}
        />
        <DialogActions>
          <Button
            type={"submit"}
            onClick={click}
            sx={{
              fontSize: "12px",
            }}
          >
            Создать
          </Button>
        </DialogActions>
      </form>
    </div>
  );
}

export default AddTodo;
