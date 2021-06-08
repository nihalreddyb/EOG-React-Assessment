import { createSlice, PayloadAction } from 'redux-starter-kit';

export type TelemetryOptions = {
  allOptions: Array<string>
  availableOptions: Array<string>,
  selectedOptions: Array<string>
}

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  allOptions: [] as Array<string>,
  availableOptions: [] as Array<string>,
  selectedOptions: [] as Array<string>
}

const slice = createSlice({
  name: 'telemetryDataOptions',
  initialState,
  reducers: {
    updateTelemetryOptions: (state, action: PayloadAction<TelemetryOptions>) => {
      const { allOptions, selectedOptions } = action.payload;
      if(state.allOptions && state.allOptions.length === 0) {
        allOptions.forEach(option => {
          state.allOptions.push(option);
          state.availableOptions.push(option);
        });
      } else {
        selectedOptions.forEach(selectedOption => {
          if(!state.selectedOptions.includes(selectedOption)) {
            state.selectedOptions.push(selectedOption);
            state.availableOptions.splice(state.availableOptions.indexOf(selectedOption), 1)
          }
        })
        state.selectedOptions.forEach(selectedOption => {
          if(!selectedOptions.includes(selectedOption)) {
            state.selectedOptions.splice( state.selectedOptions.indexOf(selectedOption) , 1)
            state.availableOptions.push(selectedOption);
          }
        });
      }
            
    },
    dataOptionsAPIErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});


export const reducer = slice.reducer;
export const actions = slice.actions;
