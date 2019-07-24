const Sequelize = require('sequelize');
const { sequelize } = require('../db/sequelize');

// const restaurant = (sequelize) => {

const Restaurant = sequelize.define('Restaurant', {
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
}, {
  tableName: 'restaurants',
  underscored: true,
  getterMethods: {
    mostRecentGrade: function() {
      let mostRecent = null;
      (this.grades || []).forEach(grade => {
        if (!mostRecent || grade.inspectionDate > mostRecent.inspectionDate) {
          mostRecent = grade;
        }
      })
      return mostRecent;
    }
  }
}
// , {

  // *V* below method is pre-version 4 style : now class and instance methods are defined outside of options *V*
  // classMethods: {
  //   associate: function(models) {
  //     Restaurant.hasMany(
  //       models.Grade,
  //       {
  //         as: 'grades',
  //         foreignKey: { allowNull: false },
  //         onDelete: 'CASCADE'
  //       }
  //     );
  //   }
  // },

  // instanceMethods: {
  //   apiRepr: function() {
  //     return {
  //       id: this.id,
  //       name: this.name,
  //       cuisine: this.cuisine,
  //       borough: this.borough,
  //       address: {
  //         number: this.addressBuildingNumber,
  //         street: this.addressStreet,
  //         zip: this.addressZipcode
  //       },
  //       mostRecentGrade: this.mostRecentGrade ? this.mostRecentGrade.apiRepr() : null
  //     }
  //   }
//   }
// }

);

Restaurant.prototype.apiRepr = () => {
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


  Restaurant.associate = models => {
    Restaurant.hasMany(
      models.Grade, 
      {
        as: 'grades',
        foreignKey: { allowNull: false },
        onDelete: 'CASCADE'
      })
  };

  // Restaurant.apiRepr = () => {
  //   return {
  //     id: this.id,
  //         name: this.name,
  //         cuisine: this.cuisine,
  //         borough: this.borough,
  //         address: {
  //         number: this.addressBuildingNumber,
  //         street: this.addressStreet,
  //         zip: this.addressZipcode,
  //     },
  //   mostRecentGrade: this.mostRecentGrade ? this.mostRecentGrade.apiRepr() : null
  //   }
  // }

// return Restaurant
// }

module.exports =  Restaurant ;
