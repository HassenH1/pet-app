export const initialState = {
  user: {
    name: "",
    email: "",
    likes: [],
    dislikes: [],
    location: {},
  },
  loading: true,
  data: {
    animals: [],
    page: "",
  },
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
      user: {
        location: {
          lat: action.payload.lat,
          lon: action.payload.lon,
        },
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
