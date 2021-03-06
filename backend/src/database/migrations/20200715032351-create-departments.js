'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departments', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
        acronym: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
		boss: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false
		}
	});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('departments');
  }
};
