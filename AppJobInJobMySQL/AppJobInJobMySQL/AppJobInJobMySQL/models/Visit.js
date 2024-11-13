import { DataTypes } from 'sequelize';
import { sequelize } from '../dbconfig.js';

const Visit = sequelize.define('Visit', {
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'Visit',
  timestamps: false,
});

const incrementAndGetCount = async () => {
  try {
    const visit = await Visit.findByPk(1);

    if (!visit) {
      await Visit.create({ id: 1, count: 0 });
    }

    visit.count += 1;
    await visit.save();

    return visit.count;
  } catch (error) {
    console.error('Erro ao atualizar o contador de visitas:', error);
    throw error;
  }
};

export default { incrementAndGetCount };
