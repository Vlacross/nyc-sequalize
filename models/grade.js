const Sequelize = require('sequelize');
const { sequelize } = require('../db/sequelize');

class Grade extends Sequelize.Model {



  apiRepr() {
    return {
      id: this.id,
      grade: this.grade,
      inspectionDate: this.inspectionDate,
      score: this.score
    }
  }
  
}

Grade.init({
      grade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      inspectionDate: {
        type: Sequelize.DATE,
        field: 'inspection_date',
        allowNull: false
      },
      score: Sequelize.INTEGER
    },
    {
      sequelize,
      tableName: 'grades',
      underscored: true
    }
  );

Grade.associate = models => {
  Grade.belongsTo(
    models.Restaurant,
    {foreignKey: { allowNull: false }, onDelete: 'CASCADE'}
  )
}

module.exports = { Grade };
