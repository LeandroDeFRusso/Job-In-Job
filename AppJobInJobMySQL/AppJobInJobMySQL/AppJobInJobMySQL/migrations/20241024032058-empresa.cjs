'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Empresa', {
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING(18),
        primaryKey: true,
      },
      cidade: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(80),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
      },
      senha:{
        type: DataTypes.STRING(20)
      }
    }, {
      tableName: 'Empresa',
      timestamps: false,
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Empresa');
  }
};
