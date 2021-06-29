import { takeLatest, put, all, call } from "redux-saga/effects";
import { contentActionTypes } from "./content.actiontype";
import { contentService } from "../../services";
import { actions } from "./content.action";

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
    yield put(actions.complete());
  } catch (error) {
    console.log("Error", error);
  }
}

export function* handleGetContents({ data: { chapter_slug, content_type } }) {
  try {
    yield put(actions.request());
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
    yield put(actions.complete());
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetCounts({ data: { chapter_slug } }) {
  try {
    yield put(actions.request());
    const {
      data: { data },
    } = yield contentService.getCountsByChapterSlug(chapter_slug);
    yield put(actions.setCounts(data));
    yield put(actions.complete());
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetChaptersListBasicDetails ({data: {subject_slug, chapter_slug}}) {
  try {
    yield put(actions.request());
    let {
      data: {
        data: { chapters, subject },
      },
    } = yield contentService.getChaptersListBasicDetailsBySubjectSlug(
      subject_slug,
      chapter_slug
    );
    yield put(actions.setChaptersBasicList(chapters));
    yield put(actions.setSubjectBasicList(subject));
    yield put(actions.complete());
  } catch (error) {
    console.log("Error", error);
  }
}

export function* handleGetContentsListBasicDetails({ data: { chapter_slug, content_type } }) {
  try {
    yield put(actions.request());
    const {
      data: {
        data: {
          contents: { contents },
        },
      },
    } = yield contentService.getContentListBasicDetailsByChapterSlug(
      chapter_slug,
      content_type
    );
    yield put(actions.setContentsBasicList(contents));
    yield put(actions.complete());
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

export function* getChaptersBasic() {
  yield takeLatest(contentActionTypes.WATCH_GET_DISCUSSION_CHAPTERS, handleGetChaptersListBasicDetails);
}

export function* getContentBasic() {
  yield takeLatest(contentActionTypes.WATCH_GET_DISCUSSION_CONTENT, handleGetContentsListBasicDetails);
}

export function* contentSaga() {
  yield all([
    call(getChapters),
    call(getContents),
    call(getCounts),
    call(getChaptersBasic),
    call(getContentBasic)
  ]);
}
