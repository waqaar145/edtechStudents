import { topLevelActionTypes } from "./top_level.actiontype";

const initalState = {
  semesters: [],
  subjects: [],
  loading: false,
  failed: false,
};

export const TopLevel = (state = initalState, action = {}) => {
  switch (action.type) {
    case topLevelActionTypes.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case topLevelActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case topLevelActionTypes.SET_ENGG_PAGE_DATA:
      const { semesters, subjects } = action.data;
      return {
        ...state,
        semesters,
        subjects,
      };

    default:
      return state;
  }
};
