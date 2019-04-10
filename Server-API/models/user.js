'use strict';
var bcrypt = require( 'bcrypt' );



module.exports = function( sequelize, DataTypes ) {
	var User = sequelize.define( 'User', {
		id: {
			primaryKey: true,
			allowNull: false,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		role: {
			type: DataTypes.ENUM(
				'api-client',
				'web-client'
			),
			defaultValue: 'api-client'
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		secret: {
			type: DataTypes.STRING,
			allowNull: false,
			set: function( value ) {
				var salt = bcrypt.genSaltSync( 10 );
				var hash = bcrypt.hashSync( value, salt );
				this.setDataValue( 'secret', hash );
			}
		},
		activation_token: DataTypes.STRING
	}, {
		indexes: [ {
			unique: true,
			fields: [ 'email' ]
		} ],
		getterMethods: {
		},
		classMethods: {
		},
		instanceMethods: {

		}
	} );
	return User;
};
