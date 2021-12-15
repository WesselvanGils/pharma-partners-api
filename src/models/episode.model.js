const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const EpisodeSchema = new Schema({
    publicationDate: {
        type: Date,
        required: [true, 'A episode needs to have a prepartion.'],
    },
    description: {
        type: String,
        required: [true, 'A receipt needs to have a dosage.'],
    },
    priorty: {
        type: Boolean,
        required: [true, 'A receipt needs to have a publicationDate.'],
    },
    ICPC: {
        type: Number,
        required: [true, 'A receipt needs to have a daysToTake.'],
    },
    startDate: {
        type: Date,
        required: [true, 'A episode needs to have a prepartion.']
    },
    journal: {
        type: Schema.Types.ObjectId,
        ref: "journals",
        autopopulate: true,
      },
})


// mongoose plugin to always populate fields
EpisodeSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('episodes', EpisodeSchema)