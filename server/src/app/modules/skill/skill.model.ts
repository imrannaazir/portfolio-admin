import { DataTypes, Model } from "sequelize";
import { TSkillAttributes } from "./skill.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";

class Skill extends Model<TSkillAttributes> implements TSkillAttributes {
  public id!: string;
  public label!: string;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}
Skill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    label: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Skill" }
);


export default Skill