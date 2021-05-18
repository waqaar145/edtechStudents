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
import Router, { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import BasicButton from "./Button/Basic";

const ContentComponent = ({ content, className, removeDiscussionButton }) => {
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
          Last updated at <span className="text">12th July 2021</span>
        </div>
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
