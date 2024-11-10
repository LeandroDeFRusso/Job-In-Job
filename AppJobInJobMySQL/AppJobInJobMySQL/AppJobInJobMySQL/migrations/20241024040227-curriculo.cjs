'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Curriculo', {
      curriculoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      candidatoFk: {
        type: DataTypes.STRING(14),
        allowNull: false,
        references: {
          model: 'Candidato',
          key: 'cpf',         
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      idioma: {
        type: DataTypes.STRING(50),
      },
    }, {
      tableName: 'Curriculo',
      timestamps: false,
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Curriculo');
  }
};
