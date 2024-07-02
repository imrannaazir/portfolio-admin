import { Schema, model, Types } from 'mongoose';
import { TSkill } from './skill.interface';

// skill schema
const skillSchema = new Schema<TSkill>(
  {
    label: {
      type: String,
      required: true,
    },
    image: {
      type: Types.ObjectId,
      ref: 'Image', // Reference to the Image model if you have one
    },
  },
  { timestamps: true },
);

// model
const Skill = model<TSkill>('Skill', skillSchema);
export default Skill;
