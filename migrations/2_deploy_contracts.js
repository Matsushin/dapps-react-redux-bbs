const PostToken = artifacts.require("./PostToken.sol");

module.exports = function(deployer) {
  deployer.deploy(PostToken, "PostToken", "PT");
};
