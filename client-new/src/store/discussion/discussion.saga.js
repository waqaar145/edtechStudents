import { takeLatest, put, all, call } from "redux-saga/effects";
import { commentActionTypes } from "./discussion.actiontype";
import { commentService } from "../../services";
import { actions } from "./discussion.action";

export function* handleGetContentByContentSlug({ data: { content_slug } }) {
  try {
    yield put(actions.request());
    const {
      data: { data },
    } = yield commentService.getContentByContentSlug(content_slug);
    yield put(actions.setDiscussionContent(data.content));
    yield put(actions.complete());
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetComments({ data: { content_slug, query, req } }) {
  try {
    yield put(actions.requestComment());
    let {data: {data: {comments, totalEntries}}} = yield commentService.getDiscussionByContentSlug(content_slug, query, req);
    yield put(actions.getComments({comments, totalEntries}))
    yield put(actions.completeComment());
  } catch (error) {
    console.log("Error", error);
  }
}

export function* getContentByContentSlug() {
  yield takeLatest(
    commentActionTypes.WATCH_GET_CONTENT_BY_CONTENT_SLUG,
    handleGetContentByContentSlug
  );
}

export function* getComments() {
  yield takeLatest(commentActionTypes.WATCH_GET_COMMENTS_BY_CONTENT_SLUG, handleGetComments);
}

export function* discussionSaga() {
  yield all([
    call(getContentByContentSlug),
    call(getComments)
  ]);
}
