import {Schema, model, models} from 'mongoose'

const retroEmojiSchema = new Schema(
  {
    commenter: [{type: Schema.Types.ObjectId, ref: 'User'}],
    retroBoardId: [{type: Schema.Types.ObjectId, ref: 'RetroBoard'}],
    retroItemId: [{type: Schema.Types.ObjectId, ref: 'RetroItem'}],
    emoji: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const RetroEmoji = models.RetroEmoji || model('retroEmoji', retroEmojiSchema)

export default RetroEmoji
