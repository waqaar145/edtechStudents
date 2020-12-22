import Link from "next/link";
const Chapters = ({chapters, chapter_slug, subject_slug, content_type}) => {
  return (
    <ul>
      {chapters.length > 0 &&
        chapters.map((chapter, index) => {
          return (
            <li
              key={chapter.id}
              className={chapter.slug === chapter_slug ? "active" : ""}
            >
              <Link
                href={`/content?subject_slug=${subject_slug}&chapter_slug=${chapter.slug}&content_type=${content_type}`}
                as={`/subject/${subject_slug}/chapter/${chapter.slug}/${content_type}`}
                passHref={true}
              >
                <a className={chapter.slug === chapter_slug ? "active" : ""}>
                  <div className="chapter-number">
                    <span className="chapter-number">{index + 1}</span>
                  </div>
                  <div className="chapter-name">{chapter.chapter_name}</div>
                </a>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default Chapters;
