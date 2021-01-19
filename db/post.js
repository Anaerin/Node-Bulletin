"use strict";
import Sequelize from "sequelize";

const Model = Sequelize.Model;
const DataTypes = Sequelize.DataTypes;

export class Post extends Model {
	static init(sequelize) {
		super.init({
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			title: DataTypes.STRING,
			text: DataTypes.TEXT,
			datePosted: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			lastEdit: DataTypes.DATE
		}, {sequelize, modelName: "Post"});
	}
	static relation(models) {
		this.belongsTo(models.User);
		this.hasMany(models.Edit);
		this.belongsTo(models.Thread);
	}
}