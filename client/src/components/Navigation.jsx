import { useDispatch, useSelector } from "react-redux";
import { setDateBeginning } from "../redux-state/dateSlice.js";
import { Button } from "@mui/material";

function Navigation() {
  const dispatch = useDispatch();
  const dateBeginning = useSelector((state) => state.date.dateBeginning);

  const dayMs = 24 * 60 * 60 * 1000;
  const setDate = (direction) => {
    direction === "next" &&
      dispatch(setDateBeginning(dateBeginning + dayMs * 7));
    direction === "prev" &&
      dispatch(setDateBeginning(dateBeginning - dayMs * 7));
  };

  const style = {
    fontSize: { xs: "11px", md: "12px" },
    height: "30px",
    backgroundColor: "#888",
    "&:hover": {
      backgroundColor: "#555",
    },
  };

  return (
    <div className={"flex justify-center gap-10 pt-7"}>
      <Button sx={style} variant="contained" onClick={() => setDate("prev")}>
        Назад
      </Button>
      <Button sx={style} variant="contained" onClick={() => setDate("next")}>
        Вперёд
      </Button>
    </div>
  );
}

export default Navigation;
