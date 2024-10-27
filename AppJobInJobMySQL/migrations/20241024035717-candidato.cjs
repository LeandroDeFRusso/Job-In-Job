'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Candidato', {
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      cpf: {
        type: DataTypes.STRING(14),
        primaryKey: true,
        allowNull: false
      },
      dataNascimento: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      genero: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      telefone: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      senha: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    }, {
      tableName: 'Candidato',
      timestamps: false
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Candidato');
  }
};
