pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract PostToken is ERC721Token {

  struct Post {
    string title;
    string content;
    address mintedBy;
    uint64 mintedAt;
  }

  Post[] posts;

  event Mint(address owner, uint256 tokenId);

  function PostToken(string _name, string _symbol) public ERC721Token(_name, _symbol) {}

  function mint(string _title, string _content) external returns (uint256) {
  	require(msg.sender != address(0));
    Post memory post = Post({
      title: _title,
      content: _content,
      mintedBy: msg.sender,
      mintedAt: uint64(now)
    });
    uint256 tokenId = posts.push(post) - 1;
    super._mint(msg.sender, tokenId);

    Mint(msg.sender, tokenId);
    return tokenId;
  }

  function getPost(uint64 _tokenId) external view returns (string title, string content, address mintedBy, uint64 mintedAt) {
  	Post memory post = posts[_tokenId];

    title = post.title;
    content = post.content;
    mintedBy = post.mintedBy;
    mintedAt = post.mintedAt;
  }

  function getAllPosts() external view returns (uint256[]) {
    return allTokens;
  }
}