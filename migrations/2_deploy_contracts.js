const Todos = artifacts.require("./Todos.sol");
const PostToken = artifacts.require("./PostToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Todos);
  deployer.deploy(PostToken);
};
