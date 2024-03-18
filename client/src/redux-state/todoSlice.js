import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3002/organizer";

const functionError = (error, rejectWithValue) => {
  console.log(error.message);
  if (axios.isAxiosError(error) && error.response.data.message) {
    console.log({
      error: error.response.data.message,
    });
    return rejectWithValue(error.response.data.message);
  } else if (error instanceof Error) {
    console.log(error.message);
    return rejectWithValue(error.message);
  }
};

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (arrDateWeek, { rejectWithValue }) => {
    try {
      const response = await axios({
        url,
        method: "GET",
        params: [arrDateWeek],
      });
      return response.data.data;
    } catch (error) {
      return functionError(error, rejectWithValue);
    }
  },
);

export const addTodos = createAsyncThunk(
  "todos/addTodos",
  async ({ date, value }, { rejectWithValue }) => {
    if (value.trim() !== "") {
      try {
        const response = await axios({
          url,
          data: JSON.stringify({ date, value }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        return response.data.message;
      } catch (error) {
        return functionError(error, rejectWithValue);
      }
    }
  },
);

export const removeTodos = createAsyncThunk(
  "todos/removeTodos",
  async ({ date, todoName }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ date, todoName }),
      });
      console.log(response.data.message);

      return response.data.message;
    } catch (error) {
      return functionError(error, rejectWithValue);
    }
  },
);

export const updateTodos = createAsyncThunk(
  "todos/updateTodos",
  async ({ date, todoName, imputeValue, done }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    if (imputeValue.trim() !== "") {
      try {
        const response = await axios({
          url,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ date, todoName, imputeValue, done }),
        });
        console.log(response.data);
        return response.data.message;
      } catch (error) {
        return functionError(error, rejectWithValue);
      }
    }
  },
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isLoading: "loading...",
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {})
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = "loaded";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = "error";
        state.message = action.payload;
      })

      .addCase(addTodos.pending, (state) => {
        state.message = null;
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        const date = action.meta.arg.date;
        const value = action.meta.arg.value;
        const arr = [{ [value]: "planned" }];

        state.message = action.payload;
        state.todos = state.todos.concat([{ [date]: arr }]);
      })
      .addCase(addTodos.rejected, (state, action) => {
        state.message = action.payload;
      })

      .addCase(removeTodos.pending, (state) => {
        state.message = null;
      })
      .addCase(removeTodos.fulfilled, (state, action) => {
        state.message = action.payload;

        const date = action.meta.arg.date;
        const todoName = action.meta.arg.todoName;

        state.todos = state.todos.map((item) => {
          if (item[date]) {
            return {
              [date]: item[date].filter(
                (val) => Object.keys(val)[0] !== todoName,
              ),
            };
          }
          return item;
        });
      })
      .addCase(removeTodos.rejected, (state, action) => {
        state.message = action.payload;
      })

      .addCase(updateTodos.pending, (state) => {
        state.message = null;
      })
      .addCase(updateTodos.fulfilled, (state, action) => {
        state.message = action.payload;
        const date = action.meta.arg.date;
        const todoName = action.meta.arg.todoName;
        const todoNewName = action.meta.arg.imputeValue;
        const done = action.meta.arg.done;

        state.todos = state.todos.map((todo) => {
          if (todo[date]) {
            const res = todo[date].map((item) => {
              if (Object.keys(item)[0] === todoName) {
                return { [todoNewName]: done };
              }
              return item;
            });
            return { [date]: res };
          }
          return todo;
        });
      })
      .addCase(updateTodos.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export default todoSlice.reducer;
