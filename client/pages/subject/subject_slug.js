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
    console.log('--------------', query)
    // const isServer = !!req;
    // let subject_slug = '';
    // if (isServer) {
    //   subject_slug = query.subject_slug
    // } else {
    //   subject_slug = Object.keys(query)[1];
    // }

    // console.log(subject_slug)
    // const chapters = await contentService.getChaptersBySubjectSlug(subject_slug, isServer);
    // let chapter_slug = chapters.data.data[0].slug;
    // // res.redirect('http://localhost:4000/subject/name/theories')
    // // res.end()
    // // const contents = await contentService.getContentByChapterSlug(query.subject_slug, chapter_slug, isServer);
    // // let data = {chapters: chapters.data.data, contents: contents.data.data};
    // // await store.dispatch({type: topLevelActionTypes.WATCH_ENGG_PAGE_CHANGES, data});
    // console.log('=====================================---', {
    //   subject_slug,
    //   chapter_slug
    // });
    // return {
    //   subject_slug,
    //   chapter_slug
    // }
    return {};
  } catch (err) {
    console.log(err)
    return {}
  }
}


export default AllContent;