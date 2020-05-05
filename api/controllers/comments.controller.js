const Tasks = require("../../database/models/tasks");
const Results = require("../../database/models/results");
const Comments = require("../../database/models/comments");
const { NotFoundError, WrongParametersError } = require("../../helpers/errors");

module.exports.createComment = async function (req, res, next) {
  try {
    //Название следует сменить
    let commentOwner = null;
    if (req.params.result_id) {
      commentOwner = await Results.findByPk(req.params.result_id);
    }
    if (req.params.task_id) {
      commentOwner = await Tasks.findByPk(req.params.task_id);
    }
    if (!commentOwner) {
      throw new WrongParametersError();
    }

    const createdComments = await Comments.create({
      description: req.body.description || "",
      task_id: req.params.task_id || null,
      result_id: req.params.result_id || null,
      owner_id: req.user.id,
    });

    return res.json({ comment: createdComments });
  } catch (e) {
    next(e);
  }
};

module.exports.getComments = async function (req, res, next) {
  try {
    console.log(req.params);

    if (!req.params.task_id) {
      throw new WrongParametersError();
    }

    const comments = await Comments.findAll({
      where: { task_id: req.params.task_id },
    });

    return res.json({ comments });
  } catch (e) {
    next(e);
  }
};

module.exports.getCommentById = async function (req, res, next) {
  try {
    const comment = await Comments.findByPk(req.params.comment_id);
    if (comment === null) {
      throw new NotFoundError({ message: "Comment is not found" });
    }
    return res.json({ comment });
  } catch (e) {
    next(e);
  }
};

module.exports.editComment = async function (req, res, next) {
  try {
    const comment = await Comments.findByPk(req.params.comment_id);

    if (comment === null) {
      throw new NotFoundError({ message: "comment is not found" });
    }
    await comment.update({
      description: req.body.description || "",
    });

    return res.json({ comment });
  } catch (e) {
    next(e);
  }
};

module.exports.deleteComment = async function (req, res, next) {
  try {
    const commentIsDeleted = await Comments.destroy({
      where: {
        id: req.params.comment_id,
      },
    });
    if (!commentIsDeleted) {
      throw new NotFoundError({ message: "Comment is not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (e) {
    next(e);
  }
};
