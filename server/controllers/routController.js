import Todo from "../models/Todo.js";

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({
      date: { $in: req.query[0] },
    });

    if (todos) {
      const arrTodos = todos.map((todo) => {
        return { [todo.date]: todo.todos };
      });

      return res.status(201).json({
        data: arrTodos,
        message: "Данные получены",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Ошибка при получении дел",
    });
  }
};

export const create = async (req, res) => {
  try {
    const { date, value } = req.body;
    const isUsed = await Todo.findOne({ date });
    if (isUsed) {
      const arr = isUsed._doc.todos;

      for (const arrKey of arr) {
        if (Object.keys(arrKey)[0] === value) {
          return res.status(301).json({
            message: "Такое дело уже есть",
          });
        }
      }

      await Todo.updateOne(
        { date },
        { $push: { todos: { [value]: "planned" } } },
        { upsert: true },
      );
      if (isUsed.todos.length === 0) {
        res.status(201).json({
          message: "Первое дело создано",
        });
      } else {
        res.status(201).json({
          message: "Дело добавилось",
        });
      }
    } else {
      const todo = new Todo({ date, todos: { [value]: "planned" } });
      await todo.save();
      res.status(201).json({
        message: "Первое дело создано",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при создании дела",
    });
  }
};

export const update = async (req, res) => {
  try {
    const { date, todoName, imputeValue, done } = req.body;

    const isUsed = await Todo.findOne({ date });
    const arrTodos = isUsed._doc.todos;

    for (const todo of arrTodos) {
      if (imputeValue === todo) {
        return res.status(301).json({
          message: "Такое дело уже есть",
        });
      }
    }

    await Todo.updateOne(
      {
        date,
        todos: { $in: [{ [todoName]: "planned" }, { [todoName]: "done" }] },
      },
      { $set: { "todos.$": { [imputeValue]: done } } },
    );

    res.status(201).json({
      message: "Дело изменилось",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при добавлении дела",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { date, todoName } = req.body;

    await Todo.updateOne(
      { date },
      { $pull: { todos: { [todoName]: { $in: ["planned", "done"] } } } },
    );
    res.status(201).json({
      message: "Дело удалилось",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при удалении дела",
    });
  }
};
