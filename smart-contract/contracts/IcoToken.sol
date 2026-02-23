// //SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

abstract contract ERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) public virtual returns (bool);
    function balanceOf(address account) public view virtual returns (uint);
    function allowance(
        address owner,
        address spender
    ) public view virtual returns (uint256);
    function approve(
        address spender,
        uint256 amount
    ) public virtual returns (bool);
    function transferFrom(
        address _from,
        address _to,
        uint256 amount
    ) public virtual returns (bool);
    function symbol() public view virtual returns (string memory);
    function totalSupply() public view virtual returns (uint256);
    function name() public view virtual returns (string memory);
    function decimals() public view virtual returns (uint8);
    function burnFrom(address account, uint256 value) public virtual;
    function burn(address account, uint256 amount) public virtual;
}

contract IcoToken {
    address public owner;
    address tokenAddress;
    uint256 public tokenSalePrice; // Price in wei per token wei (1:1 ratio when set to 1 wei)
    uint256 public soldTokens; // Tracks tokens sold in token wei units
    constructor(address _token) {
        owner = msg.sender;
        tokenAddress = _token;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner can do this action");
        _;
    }

    function updateTokenSalePrice(uint256 _tokeSalePrice) public onlyOwner {
        tokenSalePrice = _tokeSalePrice;
    }


    function buyToken() external payable returns (bool) {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 tokensToBuy = msg.value / tokenSalePrice;

        require(tokensToBuy > 0, "ETH too small");

        uint256 tokenAmount = tokensToBuy;

        ERC20 token = ERC20(tokenAddress);

        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "Not enough tokens in contract"
        );

        token.transfer(msg.sender, tokenAmount);

        soldTokens += tokensToBuy;

        return true;
    }

    function getTokenDeails()
        public
        view
        returns (
            string memory name,
            string memory symbol,
            uint256 balance,
            uint256 supply,
            uint256 tokenPrice,
            address tokenAdress,
            uint256 tokensSold
        )
    {
        ERC20 token = ERC20(tokenAddress);
        return (
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress,
            soldTokens
        );
    }

    function transferToken(
        address _to,
        uint256 _amount
    ) external returns (bool) {
        ERC20 token = ERC20(tokenAddress);
        require(
            token.balanceOf(msg.sender) >= _amount,
            "insufficient fund to transfer"
        );
        (bool status) = token.transferFrom(msg.sender, _to, _amount);
        require(status, "Falied to transfer tokens");
        return status;
    }

    function transferEther(
        address _to,
        uint256 _amount
    ) public payable returns (bool) {
        require(msg.value >= _amount, "Insufficient ETH sent");

        // send ETH to recipient
        (bool status, ) = payable(_to).call{value: _amount}("");
        require(status, "Failed to transfer ETH");

        // refund excess ETH if any
        uint256 refund = msg.value - _amount;
        if (refund > 0) {
            (bool refunded, ) = payable(msg.sender).call{value: refund}("");
            require(refunded, "Failed to refund excess ETH");
        }

        return true;
    }

    function withdrowToken(uint256 _tokenAmount) external returns (bool) {
        require(_tokenAmount > 0, "Token amount must be greater than 0");
        require(tokenSalePrice > 0, "Token sale price not set");

        ERC20 token = ERC20(tokenAddress);
        
        // Calculate tokens to return (already in token wei, no conversion needed)
        uint256 tokensToReturn = _tokenAmount;
        require(tokensToReturn > 0, "Token amount too small");

        // Calculate ETH refund based on token sale price
        uint256 ethRefund = tokensToReturn * tokenSalePrice;
        
        
        // Check contract has enough ETH
        require(address(this).balance >= ethRefund, "Insufficient ETH in contract");

        // Transfer tokens from user to contract
        require(
            token.balanceOf(msg.sender) >= _tokenAmount,
            "Insufficient token balance"
        );
        require(
            token.allowance(msg.sender, address(this)) >= _tokenAmount,
            "Insufficient token allowance. Please approve first"
        );
        
        (bool tokenStatus) = token.transferFrom(msg.sender, address(this), _tokenAmount);
        require(tokenStatus, "Failed to transfer tokens");

        // Update sold tokens count
        require(soldTokens >= tokensToReturn, "Cannot return more tokens than sold");
        soldTokens -= tokensToReturn;

        // Transfer ETH back to user
        (bool ethStatus, ) = payable(msg.sender).call{value: ethRefund}("");
        require(ethStatus, "Failed to transfer ETH");

        return true;
    }

    function donateToken(uint256 _tokenAmount) external returns (bool) {
        require(_tokenAmount > 0, "Token amount must be greater than 0");

        ERC20 token = ERC20(tokenAddress);
        
        // Calculate tokens to donate (already in token wei, no conversion needed)
        uint256 tokensToDonate = _tokenAmount;
        require(tokensToDonate > 0, "Token amount too small");

        // Check user has enough tokens
        require(
            token.balanceOf(msg.sender) >= _tokenAmount,
            "Insufficient token balance"
        );
        
        // Check user has approved the contract
        require(
            token.allowance(msg.sender, address(this)) >= _tokenAmount,
            "Insufficient token allowance. Please approve first"
        );
        
        // Transfer tokens from user to contract
        (bool tokenStatus) = token.transferFrom(msg.sender, address(this), _tokenAmount);
        require(tokenStatus, "Failed to transfer tokens");

        // Update sold tokens count to reflect tokens returned to contract
        require(soldTokens >= tokensToDonate, "Cannot donate more tokens than sold");
        soldTokens -= tokensToDonate;

        return true;
    }

    function burnTokens(uint256 _amount) external onlyOwner returns (bool) {
        require(_amount > 0, "Amount must be greater than 0");
        
        ERC20 token = ERC20(tokenAddress);
        
        uint256 avalibleTokens = token.totalSupply() - soldTokens;

        require(
            avalibleTokens >= _amount,
            "Cannot burn more than available supply (total supply - sold tokens)"
        );
        
        // Burn tokens from contract's balance
        token.burn(address(this), _amount);
        
        return true;
    }
}
