import {Schema, model, models} from 'mongoose'

const userSchema = new Schema(
  {
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    team: [{type: Schema.Types.ObjectId, ref: 'Team'}],
    role: {
      type: String,
      enum: ['member', 'leader', 'admin'],
      default: 'member',
    },
    status: {
      type: String,
      enum: ['active', 'banned'],
      default: 'active',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const User = models.User || model('User', userSchema)

export default User
