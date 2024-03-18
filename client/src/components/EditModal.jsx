import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowEditTodoModal } from "../redux-state/modalSlice.js";
import { removeTodos, updateTodos } from "../redux-state/todoSlice.js";
import AddTodo from "./modal/AddTodo.jsx";
import MainBtn from "./modal/MainBtn.jsx";
import CheckBtn from "./modal/CheckBtn.jsx";
import InputText from "./modal/InputText.jsx";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  tooltipClasses,
} from "@mui/material";

function EditModal() {
  const [imputeValue, setImputeValue] = useState("");
  const [value, setValue] = useState(null);
  const [showCheck, setShowCheck] = useState(false);
  const [showMainBtn, setShowMainBtn] = useState(true);
  const [showServerMessage, setShowServerMessage] = useState(true);

  const todos = useSelector((state) => state.todos.todos);
  const serverMessage = useSelector((state) => state.todos.message);
  const date = useSelector((state) => state.date.dateCell);
  const showModal = useSelector((state) => state.modal.showEditTodoModal);
  const dispatch = useDispatch();

  const replacements = { date_: "", _: "." };

  const newDate = date.replace(/date_|_/g, (match) => replacements[match]);

  const marginTop = {
    popper: {
      sx: {
        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
          {
            marginTop: "3px",
          },
      },
    },
  };
  const edit = (todoName, index) => {
    setValue(todoName);
    setImputeValue("");
    setShowServerMessage(false);
    setShowCheck(false);
  };
  const remove = (todoName, done) => {
    dispatch(removeTodos({ date, todoName, done }));
    setShowServerMessage(true);
  };

  const changeInput = (e) => {
    setImputeValue(e.target.value);
    setShowCheck(true);
    setShowMainBtn(false);
  };
  const updateTodo = (todoName, done) => {
    setShowMainBtn(true);
    setImputeValue("");
    dispatch(updateTodos({ date, todoName, imputeValue, done }));
    setShowServerMessage(true);
    setShowCheck(false);
  };

  const cancel = () => {
    setShowMainBtn(true);
    setValue(null);
  };

  const close = () => {
    dispatch(setShowEditTodoModal(false));
    setShowServerMessage(false);
    setValue("");
    setImputeValue("");
    setShowMainBtn(true);
  };
  const checkDone = (todoName, isDone) => {
    let done;
    isDone === "done" ? (done = "planned") : (done = "done");

    dispatch(updateTodos({ date, todoName, imputeValue: todoName, done }));
    setShowServerMessage(false);
  };

  const res = todos.map((todo, index) => {
    if (todo[date]) {
      return (
        <div key={index}>
          <ul>
            {todo[date].map((todoItem, index) => {
              let item = Object.keys(todoItem)[0];
              if (item === "0") {
                return false;
              }
              const done = Object.values(todoItem)[0];
              return (
                <li key={index} className={"group item"}>
                  <div className={"flex flex-nowrap items-center"}>
                    <InputText
                      item={item}
                      value={value}
                      done={done}
                      imputeValue={imputeValue}
                      changeInput={changeInput}
                    />

                    {item == value && showCheck && (
                      <CheckBtn
                        updateTodo={updateTodo}
                        item={item}
                        done={done}
                        cancel={cancel}
                        marginTop={marginTop}
                      />
                    )}

                    {showMainBtn && (
                      <MainBtn
                        edit={edit}
                        checkDone={checkDone}
                        remove={remove}
                        item={item}
                        done={done}
                        index={index}
                        marginTop={marginTop}
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  });

  return (
    <Dialog
      onClose={close}
      open={showModal}
      componentsProps={{
        backdrop: { style: { backgroundColor: "grey", opacity: 0.1 } },
      }}
    >
      <DialogTitle className={"bg-amber-400  text-center"}>
        <div className={"h-16 leading-[1.2]"}>
          <h3>{newDate}</h3>
          {showServerMessage && <strong>{serverMessage}</strong>}
        </div>
      </DialogTitle>
      <DialogContent>
        <AddTodo setShowServerMessage={setShowServerMessage} />
        <>{res}</>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
