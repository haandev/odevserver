import { sequelize, DataTypes, Model } from "@/bootstrap/init-connection";
import { Category } from "./Category";

export class Status extends Model {
  id: number;
  title: string;
  color: string;
  Category: Category
}

Status.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "status",
    sequelize,
  }
);

Status.belongsTo(Category, { foreignKey: "categoryId" });
