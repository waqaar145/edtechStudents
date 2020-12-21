import { takeLatest, put, all, call } from "redux-saga/effects";
import { contentActionTypes } from "./content.actiontype";
import { contentService } from "../../services";
import { actions } from "./content.action";
import { func } from "prop-types";

export function* handleGetChapters({ data: { subject_slug, chapter_slug } }) {
  try {
    yield put(actions.request());
    let {
      data: {
        data: { chapters, subject },
      },
    } = yield contentService.getChaptersBySubjectSlug(
      subject_slug,
      chapter_slug
    );
    yield put(actions.setChapters(chapters));
    yield put(actions.setSubject(subject));
  } catch (error) {
    console.log("Error", error);
  } finally {
    yield put(actions.complete());
  }
}

export function* handleGetContents({ data: { chapter_slug, content_type } }) {
  try {
    const {
      data: {
        data: {
          contents: { contents },
        },
      },
    } = yield contentService.getContentByChapterSlug(
      chapter_slug,
      content_type
    );
    yield put(actions.setContents(contents));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetCounts({ data: { chapter_slug } }) {
  try {
    const {data: {data}} = yield contentService.getCountsByChapterSlug(chapter_slug);
    yield put(actions.setCounts(data));
  } catch (error) {
    console.log(error);
  }
}

export function* getChapters() {
  yield takeLatest(contentActionTypes.WATCH_GET_CHAPTERS, handleGetChapters);
}

export function* getContents() {
  yield takeLatest(contentActionTypes.WATCH_GET_CONTENT, handleGetContents);
}

export function* getCounts() {
  yield takeLatest(contentActionTypes.WATCH_GET_COUNTS, handleGetCounts);
}

export function* contentSaga() {
  yield all([call(getChapters), call(getContents), call(getCounts)]);
}
