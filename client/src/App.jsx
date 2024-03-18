import { useSelector } from "react-redux";
import Cell from "./components/Cell.jsx";
import EditModal from "./components/EditModal.jsx";

export default function App() {
  const isError = useSelector((state) => state.todos.isLoading);

  return (
    <div className={"wrap-container"}>
      <h1 className={"title"}>ОРГАНАЙЗЕР НА НЕДЕЛЮ</h1>
      {isError == "error" && (
        <strong className={"error"}>"Ошибка при получении дел"</strong>
      )}
      <Cell />
      <EditModal />
    </div>
  );
}
