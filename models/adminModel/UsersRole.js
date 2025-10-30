const mongoose = require('mongoose');

const usersRoleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles'
  }
},{ collection: 'UsersRole', timestamps: true });

const UsersRole = mongoose.model('UsersRole', usersRoleSchema);

module.exports = UsersRole;
