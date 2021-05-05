import striptags from 'striptags';
import {sliceString} from './../../../utils/stringOperations'

const QuickLinks = ({ contents }) => {
  return (
    <ul>
      {
        contents.map((content, i) => {
          return (
            <li key={i}>
              <span className="link-number">{i + 1}</span>
              <a href={`#${content.slug}`}>{sliceString(striptags(content.name), 49)} </a>
            </li>
          )
        })
      }
    </ul>
  );
};

export default QuickLinks;