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
import { useSelector, useDispatch } from "react-redux";
import { contentActionTypes } from "./../src/store/content/content.actiontype";

const Content = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDiscussion = () => {
    console.log("handleDiscussion");
  };

  return (
    <ContentLayout>
      {Array.from(Array(10), (e, i) => {
        return (
          <div className="content-wrapper" key={i}>
            <div className="content-header">
              <div className="chapter-name">This is name of the topic</div>
              <div className="icon">
                <MdSearch />
              </div>
            </div>
            <div className="content-body">
              This is actual content This is actual content This is actual
              content This is actual content This is actual content This is
              actual content This is actual content This is actual content This
              is actual content This is actual content This is actual content
              This is actual content This is actual content This is actual
              content This is actual content This is actual content This is
              actual content This is actual content This is actual content This
              is actual content This is actual content This is actual content
              This is actual content This is actual content This is actual
              content This is actual content This is actual content This is
              actual content This is actual content This is actual content This
              is actual content This is actual content This is actual content
              This is actual content This is actual content This is actual
              content This is actual content This is actual content This is
              actual content This is actual content This is actual content This
              is actual content This is actual content This is actual content
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
                  <BasicButton title="Discussion" onClick={handleDiscussion} />
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
      })}
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
      },
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
