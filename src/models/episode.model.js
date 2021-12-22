const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getModel = require("./model_cache");

const EpisodeSchema = new Schema({
  publicationDate: {
    type: Date,
    required: [true, "A episode needs to have a publicationDate."],
  },
  description: {
    type: String,
    required: [true, "A episode needs to have a description."],
  },
  priority: {
    type: Boolean,
    required: [true, "A episode needs to have a priority."],
  },
  ICPC: {
    type: String,
    required: [true, "A episode needs to have a ICPC."],
  },
  startDate: {
    type: Date,
    required: [true, "A episode needs to have a startDate."],
  },

  journals: [
    {
      type: Schema.Types.ObjectId,
      ref: "journals",
      autopopulate: true,
    },
  ],
});

// mongoose plugin to always populate fields
EpisodeSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel("episodes", EpisodeSchema);
