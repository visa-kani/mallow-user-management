import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "../../api/create";
import { getUser } from "../../api/list";
import { updateUser } from "../../api/update";
import { deleteUser } from "../../api/delete";
import { FormData } from "../../constant/usersType";

interface userState {
  userData: FormData | null;
  loading: boolean;
  error: string | null;
}

const initialState: userState = {
  userData: null,
  loading: false,
  error: null,
};

// Create user thunk
export const CreateUser = createAsyncThunk(
  "create/user",
  async (values: FormData, thunkAPI) => {
    try {
      const response = await createUser(values);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to create user");
    }
  }
);

// Get user thunk
export const GetUserData = createAsyncThunk(
  "list/users",
  async (params?: any) => {
    try {
      const response = await getUser(params);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

// Update user thunk
export const UpdateUserData = createAsyncThunk(
  "update/user",
  async ({ values, id }: { values: any; id: any }, thunkAPI) => {
    try {
      const response = await updateUser(values, id);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to update user");
    }
  }
);

// Delete user thunk
export const DeleteUserData = createAsyncThunk(
  "delete/user",
  async (id: any, thunkAPI) => {
    try {
      const response = await deleteUser(id);
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  }
);

// Slice
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder.addCase(CreateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      CreateUser.fulfilled,
      (state, action: PayloadAction<FormData>) => {
        state.loading = false;
        state.userData = action.payload;
      }
    );
    builder.addCase(CreateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get
    builder.addCase(GetUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      GetUserData.fulfilled,
      (state, action: PayloadAction<FormData>) => {
        state.loading = false;
        state.userData = action.payload;
      }
    );
    builder.addCase(GetUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(UpdateUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      UpdateUserData.fulfilled,
      (state, action: PayloadAction<FormData>) => {
        state.loading = false;
        state.userData = action.payload;
      }
    );
    builder.addCase(UpdateUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(DeleteUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(DeleteUserData.fulfilled, (state) => {
      state.loading = false;
      state.userData = null;
    });
    builder.addCase(DeleteUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
