const Sequelize = require('sequelize');
const { sequelize } = require('../db/sequelize');



class Restaurant extends Sequelize.Model {

  apiRepr() {
    return {
      id: this.id,
      name: this.name,
      cuisine: this.cuisine,
      borough: this.borough,
      address: {
      number: this.addressBuildingNumber,
      street: this.addressStreet,
      zip: this.addressZipcode,
      },
    mostRecentGrade: this.mostRecentGrade ? this.mostRecentGrade.apiRepr() : null
    }
  }

  static mostRecentGrade() {
    let mostRecent = null;
    (this.grades || []).forEach(grade => {
      if (!mostRecent || grade.inspectionDate > mostRecent.inspectionDate) {
        mostRecent = grade;
      }
    })
    return mostRecent;
  }

};
  
Restaurant.init({
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  borough: Sequelize.ENUM('Brooklyn', 'Bronx', 'Manhattan', 'Queens', 'Staten Island'),
  cuisine: Sequelize.TEXT,
  addressStreet: {
    type: Sequelize.TEXT,
    field: 'address_street'
  },
  addressBuildingNumber: {
    type: Sequelize.TEXT,
    field: 'address_building_number'
  },
  addressZipcode: {
    type: Sequelize.TEXT,
    field: 'address_zipcode'
  }
}, 
{
  sequelize,
  tableName: 'restaurants',
  underscored: true
  
});

Restaurant.associate = models => {
  Restaurant.hasMany(
    models.Grade, 
    {
      as: 'grades',
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE'
    })
};

module.exports =  Restaurant ;
