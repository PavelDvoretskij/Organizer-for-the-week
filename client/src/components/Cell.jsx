import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDateCell } from "../redux-state/dateSlice.js";
import { setShowEditTodoModal } from "../redux-state/modalSlice.js";
import { getTodos } from "../redux-state/todoSlice.js";
import Navigation from "./Navigation.jsx";
import TodoList from "./TodoList.jsx";

const nameMonth = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const nameDayWeek = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

function Cell() {
  const dateBeginning = useSelector((state) => state.date.dateBeginning);

  const dispatch = useDispatch();

  const date = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const today = date.toLocaleDateString();

  let arr = [];

  for (let i = 1; i < 8; i++) {
    if (date.getDay() == 0) {
      arr.push(dateBeginning - 7 * dayMs + i * dayMs);
    } else {
      arr.push(dateBeginning + i * dayMs);
    }
  }

  const firstMonth = new Date(arr[0]).getMonth();
  const lastMonth = new Date(arr[6]).getMonth();
  const firstYear = new Date(arr[0]).getFullYear();
  const lastYear = new Date(arr[6]).getFullYear();

  let arrDateWeek = [];

  const cell = arr.map((item) => {
    const dateCell = `date_${new Date(item).toLocaleDateString().replace(/\./g, "_")}`;

    arrDateWeek.push(dateCell);

    const showEditModal = (e) => {
      dispatch(setShowEditTodoModal(true));
      dispatch(setDateCell(e.currentTarget.dataset.date));
    };

    return (
      <div key={item} className={"flex flex-col items-center "}>
        <h2 className={"text-center text-sm sm:text-lg"}>
          {nameDayWeek[new Date(item).getDay()]}
        </h2>
        <div
          onClick={showEditModal}
          className={
            new Date(item).toLocaleDateString() === today
              ? "cell bg-pink-200 cursor-pointer"
              : "cell bg-green-200 cursor-pointer"
          }
          data-date={dateCell}
        >
          <span className={"day"}>{new Date(item).getDate()}</span>

          <TodoList dateStr={dateCell} />
        </div>
      </div>
    );
  });

  useEffect(() => {
    dispatch(getTodos(arrDateWeek));
  }, [arrDateWeek]);

  return (
    <>
      <h2 className={"year"}>
        {firstYear === lastYear ? firstYear : firstYear + " - " + lastYear}
      </h2>
      <h3 className={"month"}>
        {firstMonth === lastMonth
          ? nameMonth[firstMonth]
          : nameMonth[firstMonth] + " - " + nameMonth[lastMonth]}
      </h3>
      <Navigation />
      <div className={"wrap"}>{cell}</div>
    </>
  );
}

export default Cell;
