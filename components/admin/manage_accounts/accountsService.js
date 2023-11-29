const userRepository = require("./accountsRepository");

exports.getAllUsers = async ( role) => {
  return await userRepository.getAllUsers(role);
};

exports.updateUser = async (id, name, email, avatar) => {
  return await userRepository.updateUser(name, email, avatar, id);
};