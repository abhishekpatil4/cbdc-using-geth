//SPDX-Licence-Identifier: MIT

pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract CBDC is ERC20("CBDC Token", "CBDC"), Ownable{
    
    function mint2000() public onlyOwner{
        _mint(msg.sender, 2000 * 10**18);
    }
}