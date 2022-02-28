import { sequelize, DataTypes, Model } from "@ooic/core";
import { User } from "./User";

export class Category extends Model {
  id: number;
  title: string;
  userId: number;
}

Category.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    tableName: "category",
    sequelize,
  }
);

Category.belongsTo(User, { foreignKey: "userId" });
