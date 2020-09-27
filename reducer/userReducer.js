export const initialState = {
  name: "",
  email: "",
};

export const reducer = (state, action) => {
  if (action.type === "TEST") {
    return {
      ...state,
      data: "Testing reducer",
    };
  }
  return state;
};
