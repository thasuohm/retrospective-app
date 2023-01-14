import {Schema, model, models} from 'mongoose'

const teamSchema = new Schema({
  code: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  description: String,
})

const Team = models.Team || model('Team', teamSchema)

export default Team
