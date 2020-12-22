import Link from "next/link";
const ChapterInternalTab = ({chapter_slug, subject_slug, content_type, total, theories, sums}) => {
  return (
    <ul>
      <li className={content_type === "all" ? "active" : ""}>
        <Link
          href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=all`}
          as={`/subject/${subject_slug}/chapter/${chapter_slug}/all`}
        >
          <a className="text-links">All ({total})</a>
        </Link>
      </li>
      <li className={content_type === "theories" ? "active" : ""}>
        <Link
          href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=theories`}
          as={`/subject/${subject_slug}/chapter/${chapter_slug}/theories`}
        >
          <a className="text-links">Theories ({theories})</a>
        </Link>
      </li>
      <li className={content_type === "sums" ? "active" : ""}>
        <Link
          href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter_slug}&content_type=sums`}
          as={`/subject/${subject_slug}/chapter/${chapter_slug}/sums`}
        >
          <a className="text-links">Questions ({sums})</a>
        </Link>
      </li>
    </ul>
  );
};

export default ChapterInternalTab;
