import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import {
  MdThumbUp,
  MdMoreVert,
  MdSearch,
  MdAccountBalance,
  MdBookmark,
  MdSend,
  MdPeople,
  MdEmail,
} from "react-icons/md";
import ContentLayout from "./../src/layouts/Content";
import BasicButton from "../src/components/Button/Basic";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { contentActionTypes } from "./../src/store/content/content.actiontype";
import { contentBuilderActionTypes } from './../src/store/contentBuilder/contentBuilder.actiontype'
import EmptyStateText from "./../src/components/EmptyState/EmptyText";
import { emptyStateUrls } from "./../src/utils/imageUrls";
import ReactHtmlParser from 'react-html-parser';

const Content = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {contents} = useSelector(state => state.Content, shallowEqual);
  const discussionOn = useSelector(state => state.ContentBuilder.subjectLayoutBuilder.discussion.on, shallowEqual);

  const handleDiscussion = (type, content) => {
    if (type) dispatch({type: contentBuilderActionTypes.START_DISCUSSION, data: content});
    else dispatch({type: contentBuilderActionTypes.STOP_DISCUSSION});
  };

  return (
    <ContentLayout>
      {contents.length > 0 ? contents.map((content, i) => {
        return (
          <div className="content-wrapper" key={i} id={content.slug}>
            <div className="content-header">
              <div className="chapter-name">{ReactHtmlParser(content.name)}</div>
            </div>
            <div className="content-body">
              {ReactHtmlParser(content.description)}
            </div>
            <div className="content-footer">
              <div className="user-interacted">
                <div className="icon">
                  <MdThumbUp />
                </div>
                <div className="count">123</div>
              </div>
              <div className="user-actions">
                <div className="text">
                  {
                  !discussionOn 
                    ? <BasicButton 
                        title="Discussion" 
                        onClick={() => handleDiscussion(true, content)} /> 
                        : 
                      <BasicButton 
                        title="Stop Discussion"
                        onClick={() => handleDiscussion(false)} />
                  }
                </div>
                <div className="icon bootstrap-dropdown-style">
                  <Dropdown>
                    <Dropdown.Toggle>
                      <MdMoreVert />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        <span className="dropdown-item-icon">
                          <MdAccountBalance />
                        </span>{" "}
                        Add to My Study Room
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        <span className="dropdown-item-icon">
                          <MdBookmark />
                        </span>{" "}
                        Add to Bookmark
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <span className="dropdown-item-icon">
                          <MdSend />
                        </span>
                        Request for a Change
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <span className="dropdown-item-icon">
                          <MdPeople />
                        </span>{" "}
                        Invite Friends to Read
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <span className="dropdown-item-icon">
                          <MdEmail />
                        </span>{" "}
                        Email me
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        );
      })
      :
      <EmptyStateText
        text="There isn't anything to show."
        subText="Please try after sometime."
        image={emptyStateUrls.emptyState.enggSemstersList}
        width="400"
      />
      }
    </ContentLayout>
  );
};

Content.getInitialProps = async ({ store, query }) => {
  try {
    await store.dispatch({
      type: contentActionTypes.WATCH_GET_CHAPTERS,
      data: {
        subject_slug: query.subject_slug,
        chapter_slug: query.chapter_slug,
      }
    });
    await store.dispatch({
      type: contentActionTypes.WATCH_GET_COUNTS,
      data: {
        chapter_slug: query.chapter_slug,
      },
    });
    await store.dispatch({
      type: contentActionTypes.WATCH_GET_CONTENT,
      data: {
        chapter_slug: query.chapter_slug,
        content_type: query.content_type,
      },
    });
    return {};
  } catch (err) {
    return {};
  }
};

export default Content;
