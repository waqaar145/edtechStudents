import {
  MdFavorite,
  MdMoreVert,
  MdSearch,
  MdAccountBalance,
  MdBookmark,
  MdSend,
  MdPeople,
  MdEmail,
} from "react-icons/md";
import Router, { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import BasicButton from "./Button/Basic";
import Moment from 'react-moment';

const ContentComponent = ({ content, className, removeDiscussionButton, handleContentReaction }) => {
  const router = useRouter();
  const { subject_slug, chapter_slug } = router.query;

  return (
    <div className={`content-wrapper ${className}`} id={content.slug}>
      <div className="content-header">
        <div className="chapter-name">{ReactHtmlParser(content.name)}</div>
      </div>
      <div className="content-body">
        {ReactHtmlParser(content.description)}
        <div className="last-updated-at">
          Last updated at <span className="text">
            <Moment format="Do MMMM, YYYY h:mm a">
                {content.updated_at}
            </Moment>
          </span>
        </div>
      </div>
      <div className="content-footer">
        <div className="user-interacted quick-actions ">
          <div className={`heart ${content.liked ? 'heart-active' : ''}`}>
            <MdFavorite onClick={() => handleContentReaction(content)}/>
          </div>
          <div className="total-heart">{content.total_likes}</div>
        </div>
        <div className="user-actions">
          <div className="text">
            {!removeDiscussionButton && (
              <BasicButton
                className="primary-btn"
                title={`Discussion (${content.total_comments})`}
                onClick={() => {
                  Router.push(
                    `/discussion?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_slug=${content.slug}`,
                    `/${subject_slug}/${chapter_slug}/discussion/${content.slug}`
                  );
                }}
              />
            )}
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
};

export default ContentComponent;
