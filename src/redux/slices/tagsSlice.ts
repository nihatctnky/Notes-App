import { createSlice, PayloadAction } from "@reduxjs/toolkit";




interface TagState {
    tags: String[];
}

const initialState: TagState = {
    tags: [],
}


const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTag: (state, action: PayloadAction<String>) => {
            if (state.tags.includes(action.payload)) return;
            state.tags.push(action.payload)
        },
    }
})

export default tagsSlice.reducer;
export const { addTag } = tagsSlice.actions;
