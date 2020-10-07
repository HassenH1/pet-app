export const initialState = {
  user: {
    name: "",
    email: "",
    likes: [],
    dislikes: [],
  },
  loading: true,
  data: {
    animals: [],
    page: "",
  },
  location: {},
};

export const reducer = (state = initialState, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "SET_USER_LOCATION") {
    return {
      ...state,
      location: {
        lat: action.payload.coords.latitude,
        lon: action.payload.coords.longitude,
      },
    };
  }
  if (action.type === "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === "FETCH_DATA") {
    return {
      ...state,
      data: {
        animals: action.payload.animals,
        page: action.payload.page,
      },
    };
  }
  return state;
};
