import ReactHtmlParser from "react-html-parser";
const QuickLinks = ({ contents }) => {
  return (
    <>
      {contents.map((content, i) => {
        return (
          <li key={i}>
            <span className="link-number">{i + 1}</span>
            <a href={`#${content.slug}`}>{ReactHtmlParser(content.name)}</a>
          </li>
        );
      })}
    </>
  );
};

export default QuickLinks;