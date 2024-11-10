'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Experiencia', {
      experienciaId: {
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
      nomeEmpresa: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cargo: {
        type: DataTypes.STRING(75),
        allowNull: false,
      },
      dataEntrada: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      dataSaida: {
        type: DataTypes.STRING(10),
      },
    }, {
      tableName: 'Experiencia',
      timestamps: false,
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Experiencia');
  }
};