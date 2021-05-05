const knex = require('./../../../db/knex');
const { check, validationResult } = require('express-validator');
const {unExpectedError} = require('./../../../messages/error');

module.exports.getSemesters = async (req, res) => {
  try {
    let result = await knex.select(
                            'ed_semesters.sm_id as id',
                            'ed_semesters.sm_name as name',
                            'ed_semesters.sm_slug as slug',
                            'ed_semesters.sm_thumbnail as thumbnail'
                          ).from('ed_semesters')
                          .where('ed_semesters.sm_is_deleted', false)
                          .orderBy('ed_semesters.sm_id', 'ASC')

    return res.status(200).send({
      message: 'Semesters list has been fetched',
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

module.exports.getSubjects = async (req, res) => {
  try {
    let result = await knex.select(
                            'ed_subjects.sb_id as id',
                            'ed_subjects.sb_name as name',
                            'ed_subjects.sb_slug as slug',
                            'ed_subjects.sb_thumbnail as thumbnail',
                            'ed_semesters.sm_id as semester_id',
                            'ed_semesters.sm_name as semester_name'
                          ).from('ed_subjects')
                          .innerJoin('ed_semesters', 'ed_semesters.sm_id', 'ed_subjects.sb_semester_id')
                          .where('ed_subjects.sb_is_deleted', false)
                          .orderBy('ed_subjects.sb_id', 'ASC')

    return res.status(200).send({
      message: 'Subjects list has been fetched',
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