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

module.exports.getChaptersBySubjectSlug = async (req, res) => {
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
