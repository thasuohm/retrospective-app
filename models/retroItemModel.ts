import {Schema, model, models} from 'mongoose'

const retroItemSchema = new Schema(
  {
    sender: [{type: Schema.Types.ObjectId, ref: 'User'}],
    retroBoardId: [{type: Schema.Types.ObjectId, ref: 'RetroBoard'}],
    good: String,
    bad: String,
    try: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const RetroItem = models.RetroItem || model('retroItem', retroItemSchema)

export default RetroItem
