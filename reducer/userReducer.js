export const initialState = {
  user: {
    name: "",
    email: "",
    likes: [],
    dislikes: [],
  },
  loading: true,
};

export const reducer = (state, action) => {
  if (action.type === "SET_USER") {
    console.log(state, "<----------------the state in reducer?");
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
