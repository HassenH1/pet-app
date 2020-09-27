export const initialState = {
  user: {
    name: "",
    email: "",
    likes: [],
    dislikes: [],
  },
  loading: true,
};

export const reducer = (state = initialState, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  return state;
};
