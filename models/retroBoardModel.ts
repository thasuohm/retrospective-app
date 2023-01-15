import {Schema, model, models} from 'mongoose'

const retroBoardSchema = new Schema(
  {
    creator: [{type: Schema.Types.ObjectId, ref: 'User'}],
    title: {type: String, required: true, maxLength: 150},
    team: [{type: Schema.Types.ObjectId, ref: 'Team'}],
    password: {type: String, maxLength: 10},
    end_date: Date,
    opening: Boolean,
    anonymous: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const RetroBoard = models.RetroBoard || model('retroBoard', retroBoardSchema)

export default RetroBoard
