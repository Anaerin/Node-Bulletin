import Sequelize from "sequelize";

const Model = Sequelize.Model;
const DataTypes = Sequelize.DataTypes;
export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "forum.sqlite",
	logging: false
});

let models = {};
sequelize.authenticate();

import { User, UserLevel } from "./user.js";
models.User = User;
models.UserLevel = UserLevel;


import Post from "./post.js";
models.Post = Post;

for (let model in models) {
	models[model].init(sequelize);
}

for (let model in models) {
	if (models[model].relation) models[model].relation(sequelize.models);
}

sequelize.sync({
	alter: false
});