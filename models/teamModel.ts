import {Schema, model, models} from 'mongoose'

const teamSchema = new Schema(
  {
    code: {type: String, required: true, unique: true, maxLength: 20},
    name: {type: String, required: true, unique: true, maxLength: 100},
    description: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Team = models.Team || model('Team', teamSchema)

export default Team
