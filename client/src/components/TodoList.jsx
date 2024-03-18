import { useSelector } from "react-redux";

function TodoList({ dateStr }) {
  const todos = useSelector((state) => state.todos.todos);

  const res = todos.map((todo) => {
    if (dateStr in todo) {
      return todo[dateStr].map((item, index) => {
        const done = Object.values(item)[0];
        const todo = Object.keys(item)[0];
        return (
          <span key={index} className={`block text-xs sm:text-sm ${done}`}>
            {todo}
          </span>
        );
      });
    }
  });

  return <div className={"overflow-hidden"}>{res}</div>;
}

export default TodoList;
