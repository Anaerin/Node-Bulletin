"use strict";
import Sequelize from "sequelize";

const Model = Sequelize.Model;
const DataTypes = Sequelize.DataTypes;

export class User extends Model {
	static init(sequelize) {
		super.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			userName: DataTypes.STRING,
			passwordHash: DataTypes.STRING
		}, {sequelize, modelName: "User"});
	}
	static relation(models) {
		this.belongsTo(models.UserLevel);
		this.hasMany(models.Post);
	}
}

export class UserLevel extends Model {
	static init(sequelize) {
		super.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			levelName: DataTypes.STRING,

		}, {sequelize, modelName: "UserLevel"});
	}
}