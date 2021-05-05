import { topLevelActionTypes } from "./top_level.actiontype";

const initalState = {
  semesters: [],
  subjects: [],
  current_semester: null,
  current_subjects: [],
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
        current_semester: semesters[0].id,
        current_subjects: subjects.filter(
          (subject) => subject.semester_id === semesters[0].id
        ),
      };

    case topLevelActionTypes.SET_SUBJECTS_BY_SEMESTER:
      const { data } = action.data;
      return {
        ...state,
        current_semester: data,
        current_subjects: state.subjects.filter(
          (subject) => subject.semester_id === data
        ),
      };

    default:
      return state;
  }
};
