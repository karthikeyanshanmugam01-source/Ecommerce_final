const {Sequelize, DataTypes} =require('sequelize');
const { sequelize } = require("../config/db");
const bcrypt = require('bcrypt');
const bcryptSaltRounds = 10;

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.INTEGER,
    // For a complete application, you would define associations and foreign key constraints.
    // E.g., `references: { model: 'clients', key: 'client_id' }`
  },
  bu_id: {
    type: DataTypes.INTEGER,
    // E.g., `references: { model: 'business_units', key: 'bu_id' }`
  },
  user_type: {
    type: DataTypes.ENUM('admin', 'standard', 'guest'),
    defaultValue: 'standard',
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  last_login: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false, // The schema includes created_at and updated_at, so we manage them manually
  hooks: {
    // Before creating a user, hash the password.
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(bcryptSaltRounds);
      user.password_hash = await bcrypt.hash(user.password_hash, salt);
    },
    // Before updating a user, re-hash the password if it has changed.
    beforeUpdate: async (user) => {
      if (user.changed('password_hash')) {
        const salt = await bcrypt.genSalt(bcryptSaltRounds);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      }
    },
  }
});

// Method to compare a plain text password with the hashed password.
User.prototype.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash);
};

module.exports = { User, sequelize };
