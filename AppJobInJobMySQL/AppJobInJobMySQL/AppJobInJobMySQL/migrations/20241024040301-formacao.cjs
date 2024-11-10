'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Formacao', {
      formacaoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      curriculoFk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Curriculo',
          key: 'curriculoId',         
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      universidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cursoGraduacao: {
        type: DataTypes.STRING(75),
        allowNull: false,
      },
      dataInicio: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      dataTermino: {
        type: DataTypes.STRING(10),
      },
    }, {
      tableName: 'Formacao',
      timestamps: false,
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Formacao');
  }
};