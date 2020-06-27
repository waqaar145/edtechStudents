const knex = require('./../../../db/knex');
const { check, validationResult } = require('express-validator');
const {unExpectedError} = require('./../../../messages/error');


module.exports.getFirstChapterSlugBySubjectSlug = async (req, res) => { // this fetches first chapter's slug of the the selected subject
  await check('subject_slug').isLength({min: 1, max: 500}).withMessage('Subject slug is required.').run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: 'Subject slug is required',
      data: errors.array()
    });
  }

  try {
    await check('subject_slug').isLength({min: 1, max: 500}).withMessage('Subject slug is required.').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        message: 'Subject slug is required',
        data: errors.array()
      });
    }

    let sub_slug = req.params.subject_slug;
    let result = await knex.select(
                            'ed_chapters.cp_id as id',
                            'ed_chapters.cp_name as chapter_name',
                            'ed_chapters.cp_number as chapter_number',
                            'ed_chapters.cp_slug as slug',
                            'ed_chapters.cp_is_active as is_active'
                          ).from('ed_chapters')
                          .innerJoin('ed_subjects', 'ed_subjects.sb_id', 'ed_chapters.cp_subject_id')
                          .where('ed_chapters.cp_is_deleted', false)
                          .where('ed_subjects.sb_slug', sub_slug)
                          .orderBy('ed_chapters.cp_number', 'ASC')
                          .limit(1)

    return res.status(200).send({
      message: 'Chapters list has been fetched',
      data: result
    })
  } catch (err) {
    return res.status(422).send(unExpectedError(
      'Something went wrong, please try to fetch again',
      'Something went wrong, please try to fetch again',
      'semester'
    ))
  }
}

module.exports.getChapterBySubjectSlug = async (req, res) => { // fetches all chapters of a subject slug
  try {
    await check('subject_slug').isLength({min: 1, max: 500}).withMessage('Subject slug is required.').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        message: 'Subject slug is required',
        data: errors.array()
      });
    }

    let sub_slug = req.params.subject_slug;

    let subject = await knex.select(
                                  'ed_subjects.sb_id as id',
                                  'ed_subjects.sb_name as subject_name',
                                  'ed_subjects.sb_description as description',
                                  'ed_subjects.sb_thumbnail as thumbnail'
                                )
                                .from('ed_subjects')
                                .where('sb_slug', sub_slug)
                                .first();

    let result = await knex.select(
                            'ed_chapters.cp_id as id',
                            'ed_chapters.cp_name as chapter_name',
                            'ed_chapters.cp_number as chapter_number',
                            'ed_chapters.cp_slug as slug',
                            'ed_chapters.cp_is_active as is_active'
                          ).from('ed_chapters')
                          .innerJoin('ed_subjects', 'ed_subjects.sb_id', 'ed_chapters.cp_subject_id')
                          .where('ed_chapters.cp_is_deleted', false)
                          .where('ed_subjects.sb_slug', sub_slug)
                          .orderBy('ed_chapters.cp_number', 'ASC')

    return res.status(200).send({
      message: 'Chapters list has been fetched',
      data: {
        subject,
        chapters: result
      }
    })
  } catch (err) {
    return res.status(422).send(unExpectedError(
      'Something went wrong, please try to fetch again',
      'Something went wrong, please try to fetch again',
      'semester'
    ))
  }
}

module.exports.getContentByChapterSlug = async (req, res) => {

  await check('chapter_slug').isLength({min: 1, max: 500}).withMessage('Chapter slug is required.').run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: 'Chapter slug is required',
      data: errors.array()
    });
  }

  if (!(req.query.content_type === 'all' || req.query.content_type === 'theories' || req.query.content_type === 'sums')) {
    return res.status(422).send(unExpectedError(
      'Content type could be only of these i.e all, thoery or sum',
      'Content type could be only of these i.e all, thoery or sum',
      'content_type'
    ))
  }

  const {chapter_slug} = req.params;
  const content_type = req.query.content_type;

  let content_type_arr = [];
  if (content_type === 'all') {
    content_type_arr = [1, 2]
  } else if (content_type === 'theories') {
    content_type_arr = [1];
  } else if (content_type === 'sums') {
    content_type_arr = [2];
  } else {
    return res.status(404).send(unExpectedError(
      'Content type does not exist',
      'Content type does not exist',
      'content_type'
    ))
  }

  try {
    let result = await knex.select(
                              'ed_contents.cn_id as id',
                              'ed_contents.cn_type as content_type',
                              'ed_contents.cn_difficulty_level as difficulty_level',
                              'ed_contents.cn_name as name',
                              'ed_contents.cn_slug as slug',
                              'ed_contents.cn_description as description',
                              'ed_contents.cn_is_active as is_active',
                              'ed_contents.cn_created_at as created_at',
                              'ed_contents.cn_updated_at as updated_at',

                              'ed_admins.a_name as admin_name',
                              'ed_admins.a_slug as admin_slug',
                      
                            ).from('ed_contents')
                            .innerJoin('ed_admins', 'ed_admins.a_id', 'ed_contents.cn_admin_id')
                            .innerJoin('ed_chapters', 'ed_chapters.cp_id', 'ed_contents.cn_chapter_id')
                            .where('ed_contents.cn_is_deleted', false)
                            .where('ed_chapters.cp_slug', chapter_slug)
                            .whereIn('ed_contents.cn_type', content_type_arr)
                            .orderBy('ed_contents.cn_id', 'DESC');

    let ids = [] // collecting all content_ids
    for (let cn of result) {
      ids.push(cn.id) 
    }

    let tags = await knex('ed_content_years').whereIn('cy_content_id', ids);

    let tag_ids = []; // collecting year ids 
    for (let t_id of tags) {
      tag_ids.push(t_id.cy_year_id);
    }
    let years = await knex('ed_years').whereIn('y_id', tag_ids);
    
    let year_object = {}; // creating object with year's id and value
    for (let year of years) {
      year_object = {
        ...year_object,
        [year.y_id]: {
          id: year.y_id,
          month: year.y_month,
          year: year.y_year
        }
      }
    }

    let tag_object = {}; // creating object with content id as key and value as related tags array
    for (let tag of tags) {
      if (tag.cy_content_id in tag_object) {
        tag_object[tag.cy_content_id].push(year_object[tag.cy_year_id])
      } else {
        tag_object = {
          ...tag_object,
          [tag.cy_content_id]: [year_object[tag.cy_year_id]]
        }
      }
    }

    let contents = [];
    for (let content of result) {
      contents.push({
        ...content,
        years_asked: tag_object[content.id]
      })
    }

    return res.status(200).send({
      message: 'Content list have been fetched',
      data: contents
    });

  } catch (err) {
    return res.status(422).send(
      unExpectedError(
        'Years list could not be fetched',
        'Years list could not be fetched',
        'year'
      )
    )
  }
}