// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeBasedURLShortener {
    struct URLStruct {
        address owner;
        string url;
        uint256 expirationTime;
    }

    mapping(bytes32 => URLStruct) private lookupTable;
    uint256 public storageFee;
    address payable public owner;

    event URLShortened(
        bytes32 indexed shortHash,
        string url,
        address owner,
        uint256 expirationTime
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _storageFee) {
        owner = payable(msg.sender);
        storageFee = _storageFee;
    }

    function setStorageFee(uint256 _storageFee) external onlyOwner {
        storageFee = _storageFee;
    }

    function shortenURL(
        string memory _url,
        uint256 _expirationTime
    ) external payable {
       

        bytes32 shortHash = getShortSlug(_url);
        require(
            lookupTable[shortHash].expirationTime == 0,
            "Short URL already exists"
        );

        lookupTable[shortHash] = URLStruct(
            msg.sender,
            _url,
            block.timestamp + _expirationTime
        );
        emit URLShortened(
            shortHash,
            _url,
            msg.sender,
            block.timestamp + _expirationTime
        );
    }

    function getURL(
        bytes32 _shortHash
    ) external view returns (string memory, uint256) {
        URLStruct storage result = lookupTable[_shortHash];
       
        return (result.url, result.expirationTime);
    }

    function withdrawFees() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function kill() external onlyOwner {
        // Transfer the remaining balance to the contract owner
        selfdestruct(owner);
    }

    // private function to generate short hash
    function getShortSlug(string memory _str) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_str));
    }
}
