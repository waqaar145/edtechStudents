import SubjectLayout from "../../src/components/layouts/SubjectLayout";
import {contentService} from './../../src/services'
import Router from 'next/router'
import { useEffect } from "react";

const AllContent = (props) => {
  const {
    subject_slug,
    chapter_slug
  } = props;


  return (
    <SubjectLayout>
      All content page
    </SubjectLayout>
  )
}

AllContent.getInitialProps = async ({store, req, query}) => {
  try {
    const isServer = !!req;
    const chapters = await contentService.getChaptersBySubjectSlug(query.subject_slug, isServer);
    const contents = await contentService.getContentByChapterSlug(query.chapter_slug, 'all', isServer);
    let data = {chapters: chapters.data.data, contents: contents.data.data};
    console.log('----------------', data)
    // await store.dispatch({type: topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES, data});
    return {
      subject_slug,
      chapter_slug
    }
    return {};
  } catch (err) {
    console.log(err)
    return {}
  }
}


export default AllContent;