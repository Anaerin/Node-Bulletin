"use strict";
import Sequelize from "sequelize";

const Model = Sequelize.Model;
const DataTypes = Sequelize.DataTypes;

export class Thread extends Model {
	static init(sequelize) {
		super.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			title: DataTypes.STRING,
			datePosted: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			lastEdit: DataTypes.DATE,
			views: DataTypes.INTEGER
		}, {sequelize, modelName: "Thread"});
	}
	static relation(models) {
		this.belongsTo(models.User);
		this.hasMany(models.Post);
		this.belongsTo(models.UserLevel);
	}
}