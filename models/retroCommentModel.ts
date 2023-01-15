import {Schema, model, models} from 'mongoose'

const retroCommentSchema = new Schema(
  {
    commenter: [{type: Schema.Types.ObjectId, ref: 'User'}],
    retroBoardId: [{type: Schema.Types.ObjectId, ref: 'RetroBoard'}],
    retroItemId: [{type: Schema.Types.ObjectId, ref: 'RetroItem'}],
    comment: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const RetroComment =
  models.RetroComment || model('retroComment', retroCommentSchema)

export default RetroComment
