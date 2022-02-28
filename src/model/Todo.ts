import { sequelize, DataTypes, Model } from "@ooic/core";
import { Category } from "./Category";
import { Status } from "./Status";
import { User } from "./User";

export class Todo extends Model {
  id: number;
  title: string;
  userId:number;
  categoryId:number;
  statusId:number;
}

Todo.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "todo",
    sequelize,
  }
);

Todo.belongsTo(User, { foreignKey: "userId" });
Todo.belongsTo(Category, { foreignKey: "categoryId" });
Todo.belongsTo(Status, { foreignKey: "statusId" });
