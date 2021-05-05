const knex = require("./../../../db/knex");
const { check, validationResult } = require("express-validator");
const { getPaginationValues } = require("../../../utils/pagination");
const { unExpectedError } = require("./../../../messages/error");
const { currentUserFormate } = require("./../../../utils/basicFormatting")

module.exports.getContentByContentSlug = async (req, res) => {
  const { content_slug } = req.params;

  await check("content_slug")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content slug is required.")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: "Chapter slug is required",
      data: errors.array(),
    });
  }

  try {
    let result = await knex
      .select(
        "ed_contents.cn_id as id",
        "ed_contents.cn_type as content_type",
        "ed_contents.cn_difficulty_level as difficulty_level",
        "ed_contents.cn_name as name",
        "ed_contents.cn_slug as slug",
        "ed_contents.cn_description as description",
        "ed_contents.cn_is_active as is_active",
        "ed_contents.cn_created_at as created_at",
        "ed_contents.cn_updated_at as updated_at",

        "ed_admins.a_name as admin_name",
        "ed_admins.a_slug as admin_slug",

        "ed_subjects.sb_id as subject_id",
        "ed_subjects.sb_name as subject_name",

        "ed_chapters.cp_id as chapter_id",
        "ed_chapters.cp_name as chapter_name"
      )
      .from("ed_contents")
      .innerJoin("ed_admins", "ed_admins.a_id", "ed_contents.cn_admin_id")
      .innerJoin(
        "ed_chapters",
        "ed_chapters.cp_id",
        "ed_contents.cn_chapter_id"
      )
      .innerJoin(
        "ed_subjects",
        "ed_subjects.sb_id",
        "ed_contents.cn_subject_id"
      )
      .where("ed_contents.cn_is_deleted", false)
      .where("ed_contents.cn_slug", content_slug);

    let ids = []; // collecting all content_ids
    for (let cn of result) {
      ids.push(cn.id);
    }

    let tags = await knex("ed_content_years").whereIn("cy_content_id", ids);

    let tag_ids = []; // collecting year ids
    for (let t_id of tags) {
      tag_ids.push(t_id.cy_year_id);
    }
    let years = await knex("ed_years").whereIn("y_id", tag_ids);

    let year_object = {}; // creating object with year's id and value
    for (let year of years) {
      year_object = {
        ...year_object,
        [year.y_id]: {
          id: year.y_id,
          month: year.y_month,
          year: year.y_year,
        },
      };
    }

    let tag_object = {}; // creating object with content id as key and value as related tags array
    for (let tag of tags) {
      if (tag.cy_content_id in tag_object) {
        tag_object[tag.cy_content_id].push(year_object[tag.cy_year_id]);
      } else {
        tag_object = {
          ...tag_object,
          [tag.cy_content_id]: [year_object[tag.cy_year_id]],
        };
      }
    }

    let contents = [];
    for (let content of result) {
      contents.push({
        ...content,
        years_asked: tag_object[content.id],
      });
    }

    return res.status(200).send({
      message: "Content has been fetched",
      data: {
        content: contents,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(422)
      .send(
        unExpectedError(
          "Content could not be fetched",
          "Content could not be fetched",
          "content"
        )
      );
  }
};

module.exports.getCommentsOfContent = async (req, res) => {
  await check("content_slug")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content slug is required.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: "Content slug is required",
      data: errors.array(),
    });
  }

  const {
    offset,
    limit,
    sort,
    q
  } = getPaginationValues(req.query);

  try {
    const { content_slug } = req.params;

    let content = await knex
      .select("ed_contents.cn_id as id", "ed_contents.cn_slug as slug")
      .from("ed_contents")
      .where("cn_slug", content_slug)
      .first();

    if (!content) {
      return res
        .status(404)
        .send(
          unExpectedError(
            "Content does not exist",
            "Content does not exist",
            "subject"
          )
        );
    }

    let totalEntries = await knex("ed_comments")
      .count("comm_id as count")
      .where("ed_comments.comm_is_active", true)
      .where("ed_comments.comm_parent_id", null)
      .where("ed_comments.comm_content_id", content.id);

    let comments = await knex
      .select(
        "ed_comments.comm_id as id",
        "ed_comments.comm_parent_id as parent_id",
        "ed_comments.comm_comment as comment",
        "ed_comments.comm_created_at as created_at",
        "ed_comments.comm_updated_at as updated_at",

        "ed_users.u_id as user_id",
        "ed_users.u_uuid as user_uuid",
        "ed_users.u_first_name as first_name",
        "ed_users.u_last_name as last_name",
        "ed_users.u_username as username"
      )
      .from("ed_comments")
      .innerJoin("ed_users", "ed_users.u_id", "ed_comments.comm_user_id")
      .where("ed_comments.comm_content_id", content.id)
      .where("ed_comments.comm_parent_id", null)
      .where("ed_comments.comm_is_deleted", false)
      .where("ed_comments.comm_is_active", true)
      .orderBy("id", sort)
      .offset(offset)
      .limit(limit);

    let finalComments = [];
    for (let comment of comments) {
      // need improvement
      let childComment = await knex
        .select(
          "ed_comments.comm_id as id",
          "ed_comments.comm_parent_id as parent_id",
          "ed_comments.comm_comment as comment",
          "ed_comments.comm_created_at as created_at",
          "ed_comments.comm_updated_at as updated_at",

          "ed_users.u_id as user_id",
          "ed_users.u_uuid as user_uuid",
          "ed_users.u_first_name as first_name",
          "ed_users.u_last_name as last_name",
          "ed_users.u_username as username"
        )
        .from("ed_comments")
        .innerJoin("ed_users", "ed_users.u_id", "ed_comments.comm_user_id")
        .where("ed_comments.comm_content_id", content.id)
        .where("ed_comments.comm_parent_id", comment.id)
        .where("ed_comments.comm_is_deleted", false)
        .where("ed_comments.comm_is_active", true)
        .orderBy("id", "desc");
      comment.childComment = childComment;
      finalComments.push(comment);
    }

    return res.status(200).send({
      message: "Comments have been fetched",
      data: {
        comments: finalComments,
        totalEntries: +totalEntries[0].count,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .send(
        unExpectedError(
          "Something went wrong, please try to fetch again",
          "Something went wrong, please try to fetch again",
          "semester"
        )
      );
  }
};

module.exports.addComment = async (req, res) => {

  await check("comment").isLength({ min: 1, max: 10000 }).withMessage("Comment is required.").run(req);
  await check("content_id").isNumeric().withMessage("Content Id is required.").run(req);
  await check("parent_id").isLength().withMessage("Parent Id is required.").run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: "Chapter slug is required",
      data: errors.array(),
    });
  }

  try {

    const {
      content_id,
      parent_id,
      comment
    } = req.body;

    let content = await knex("ed_contents").where("cn_id", content_id);
    if (content.length < 1) {
      return res.status(422).send(unExpectedError(
          "Content does not exist",
          "Content does not exist",
          "subject"
        )
      );
    }

    if (parent_id) {
      let commentRes = await knex("ed_comments").where("comm_id", parent_id);
      if (commentRes.length < 1) {
        return res.status(422).send(unExpectedError(
          "Content parent id does not exist",
          "Content parent id does not exist",
          "discussion"
        ));
      }
    }

    let commObj = {
      comm_content_id: content_id,
      comm_user_id: req.user.uid,
      comm_parent_id: parent_id,
      comm_comment: comment,
    };

    let result = await knex("ed_comments").insert(commObj).returning("*");
    let resultObj = result[0];
    if (result.length > 0) {
      let object = {
        id: resultObj.comm_id,
        parent_id: resultObj.comm_parent_id,
        comment: resultObj.comm_comment,
        created_at: resultObj.comm_created_at,
        updated_at: resultObj.comm_updated_at,
        ...currentUserFormate(req.user),
        ...(parent_id === null && { childComment: [] }),
      };
      return res.status(200).send({
        message: "Your comment has been saved.",
        data: object,
      });
    }
    return res.status(422).send(unExpectedError(
      "Your comment could not be saved, please try again later",
      "Your comment could not be saved, please try again later",
      "discussion"
    ))
  } catch (err) {
    console.log(err)
    return res.status(422).send(unExpectedError(
      "Something went wrong",
      "Something went wrong",
      "discussion"
    ))
  }
}

module.exports.updateComment = async (req, res) => {
  await check("comment").isLength({ min: 1, max: 10000 }).withMessage("Comment is required.").run(req);
  await check("content_id").isNumeric().withMessage("Content Id is required.").run(req);
  await check("comment_id").isLength().withMessage("Comment Id is required.").run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: "Chapter slug is required",
      data: errors.array(),
    });
  }

  try {

    const {
      content_id,
      comment
    } = req.body;

    const comment_id = req.params.comment_id

    let content = await knex("ed_contents").where("cn_id", content_id);
    if (content.length < 1) {
      return res.status(422).send(unExpectedError(
          "Content does not exist",
          "Content does not exist",
          "discussion"
        )
      );
    }

    let commentRes = await knex("ed_comments").where("comm_id", comment_id);
      if (commentRes.length < 1) {
        return res.status(422).send(unExpectedError(
          "Comment does not exist",
          "Comment does not exist",
          "discussion"
        )
      );
    }

    let commObj = {
      comm_comment: comment,
      comm_updated_at: new Date()
    };

    let result = await knex("ed_comments").update(commObj).where('comm_id', comment_id).returning("*");
    let resultObj = result[0];
    if (result.length > 0) {
      let object = {
        id: resultObj.comm_id,
        parent_id: resultObj.comm_parent_id,
        comment: resultObj.comm_comment,
        created_at: resultObj.comm_created_at,
        updated_at: resultObj.comm_updated_at,
        ...currentUserFormate(req.user),
        ...(resultObj.comm_parent_id === null && { childComment: [] }),
      };
      return res.status(200).send({
        message: "Your comment has been updated.",
        data: object,
      });
    }
    return res.status(422).send(unExpectedError(
      "Your comment could not be updated, please try again later",
      "Your comment could not be updated, please try again later",
      "discussion"
    ))
  } catch (err) {
    console.log(err)
    return res.status(422).send(unExpectedError(
      "Something went wrong",
      "Something went wrong",
      "discussion"
    ))
  }
}

module.exports.deleteCommentById = async (req, res) => {
  await check("comment_id")
    .isNumeric()
    .withMessage("Comment Id is required.")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: "Comment Id is required",
      data: errors.array(),
    });
  }

  try {
    const { comment_id } = req.params;
    let comment = await knex('ed_comments').where('comm_id', comment_id).first();
    
    if (!comment) {
      return res
        .status(422)
        .send(
          unExpectedError(
            "Comment does not exists",
            "Comment does not exists",
            "discussion"
          )
        );
    }

    await knex('ed_comments')
    .where('comm_id', comment_id)
    .update({
      comm_is_active: false,
      comm_is_deleted: true,
    })

    return res.status(200).send({
      message: "Comment has been delete",
      data: 'ok',
    });
  } catch(error) {
    return res
      .status(422)
      .send(
        unExpectedError(
          "Something went wrong, please try to fetch again",
          "Something went wrong, please try to fetch again",
          "semester"
        )
      );
  }
};
