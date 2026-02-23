import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseEther, parseUnits } from "viem";

import { network } from "hardhat";

async function deployContracts(viem: any, owner: any) {
  // Deploy MyToken
  const token = await viem.deployContract("MyToken");
  
  // Deploy IcoToken with token address
  const icoToken = await viem.deployContract("IcoToken", [token.address]);

  // Mint tokens to IcoToken contract for sale
  const mintAmount = parseUnits("1000000", 18); // 1M tokens
  await token.write.mint([icoToken.address, mintAmount], {
    account: owner.account,
  });

  return { token, icoToken };
}

describe("IcoToken", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();
  const [owner, buyer, other] = await viem.getWalletClients();

  describe("Constructor", function () {
    it("Should set the owner correctly", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const contractOwner = await icoToken.read.owner();
      assert.equal(contractOwner.toLowerCase(), owner.account.address.toLowerCase());
    });

    it("Should set the token address correctly", async function () {
      const { token, icoToken } = await deployContracts(viem, owner);
      const [, , , , , tokenAddress] = await icoToken.read.getTokenDeails();
      assert.equal(tokenAddress.toLowerCase(), token.address.toLowerCase());
    });
  });

  describe("updateToken", function () {
    it("Should execute without reverting", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      await icoToken.write.updateToken();
      // If we reach here, the function executed successfully
      assert.ok(true);
    });
  });

  describe("updateTokenSalePrice", function () {
    it("Should update token sale price when called by owner", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const newPrice = parseEther("0.001");
      await icoToken.write.updateTokenSalePrice([newPrice], {
        account: owner.account,
      });

      const price = await icoToken.read.tokenSalePrice();
      assert.equal(price, newPrice);
    });

    it("Should revert when called by non-owner", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const newPrice = parseEther("0.001");
      
      await assert.rejects(
        icoToken.write.updateTokenSalePrice([newPrice], {
          account: buyer.account,
        }),
        /Only Owner can do this action/
      );
    });

    it("Should allow updating price multiple times", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const price1 = parseEther("0.001");
      const price2 = parseEther("0.002");
      
      await icoToken.write.updateTokenSalePrice([price1], {
        account: owner.account,
      });
      assert.equal(await icoToken.read.tokenSalePrice(), price1);

      await icoToken.write.updateTokenSalePrice([price2], {
        account: owner.account,
      });
      assert.equal(await icoToken.read.tokenSalePrice(), price2);
    });
  });

  describe("buyToken", function () {
   

    it("Should revert when payment amount is incorrect", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      // Set token sale price
      const price = parseEther("0.001");
      await icoToken.write.updateTokenSalePrice([price], {
        account: owner.account,
      });

      const tokenAmount = 100n;
      const incorrectPayment = tokenAmount * price - 1n; // Less than required

      await assert.rejects(
        icoToken.write.buyToken([tokenAmount], {
          account: buyer.account,
          value: incorrectPayment,
        }),
        /No Enough balance to purchase token/
      );
    });

    it("Should revert when payment is more than required", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      // Set token sale price
      const price = parseEther("0.001");
      await icoToken.write.updateTokenSalePrice([price], {
        account: owner.account,
      });

      const tokenAmount = 100n;
      const excessPayment = tokenAmount * price + parseEther("0.1");

      await assert.rejects(
        icoToken.write.buyToken([tokenAmount], {
          account: buyer.account,
          value: excessPayment,
        }),
        /No Enough balance to purchase token/
      );
    });

  });

  describe("getTokenDeails", function () {
    it("Should return correct token details", async function () {
      const { token, icoToken } = await deployContracts(viem, owner);
      const price = parseEther("0.001");
      await icoToken.write.updateTokenSalePrice([price], {
        account: owner.account,
      });

      const [name, symbol, balance, supply, tokenPrice, tokenAddress] =
        await icoToken.read.getTokenDeails();

      assert.equal(name, "MyToken");
      assert.equal(symbol, "MTK");
      assert.ok(balance > 0n);
      assert.ok(supply > 0n);
      assert.equal(tokenPrice, price);
      assert.equal(tokenAddress.toLowerCase(), token.address.toLowerCase());
    });

    it("Should return updated price after price change", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const price1 = parseEther("0.001");
      const price2 = parseEther("0.002");

      await icoToken.write.updateTokenSalePrice([price1], {
        account: owner.account,
      });
      const [, , , , tokenPrice1] = await icoToken.read.getTokenDeails();
      assert.equal(tokenPrice1, price1);

      await icoToken.write.updateTokenSalePrice([price2], {
        account: owner.account,
      });
      const [, , , , tokenPrice2] = await icoToken.read.getTokenDeails();
      assert.equal(tokenPrice2, price2);
    });
  });

  describe("transferToken", function () {
    it("Should transfer ether to owner when called with sufficient funds", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const transferAmount = parseEther("0.1");
      const payment = transferAmount + parseEther("0.01"); // More than transfer amount

      const initialOwnerBalance = await publicClient.getBalance({
        address: owner.account.address,
      });

      await icoToken.write.transferToken([transferAmount], {
        account: buyer.account,
        value: payment,
      });

      const finalOwnerBalance = await publicClient.getBalance({
        address: owner.account.address,
      });

      // Owner should receive the transfer amount
      assert.ok(finalOwnerBalance > initialOwnerBalance);
    });

    it("Should revert when msg.value is not greater than amount", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const transferAmount = parseEther("0.1");
      const payment = transferAmount; // Equal, not greater

      await assert.rejects(
        icoToken.write.transferToken([transferAmount], {
          account: buyer.account,
          value: payment,
        }),
        /insufficient fund to transfer/
      );
    });

    it("Should revert when msg.value is less than amount", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const transferAmount = parseEther("0.1");
      const payment = parseEther("0.05"); // Less than transfer amount

      await assert.rejects(
        icoToken.write.transferToken([transferAmount], {
          account: buyer.account,
          value: payment,
        }),
        /insufficient fund to transfer/
      );
    });
  });

  describe("transferEther", function () {
    it("Should transfer ether to specified address when called with sufficient funds", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const transferAmount = parseEther("0.1");
      const payment = transferAmount + parseEther("0.01"); // More than transfer amount

      const initialRecipientBalance = await publicClient.getBalance({
        address: other.account.address,
      });

      await icoToken.write.transferEther([other.account.address, transferAmount], {
        account: buyer.account,
        value: payment,
      });

      const finalRecipientBalance = await publicClient.getBalance({
        address: other.account.address,
      });

      // Recipient should receive the transfer amount
      assert.ok(finalRecipientBalance > initialRecipientBalance);
    });

    it("Should revert when msg.value is not greater than amount", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const transferAmount = parseEther("0.1");
      const payment = transferAmount; // Equal, not greater

      await assert.rejects(
        icoToken.write.transferEther([other.account.address, transferAmount], {
          account: buyer.account,
          value: payment,
        }),
        /insufficient fund to transfer/
      );
    });

    it("Should allow transferring to any address", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      const transferAmount = parseEther("0.05");
      const payment = transferAmount + parseEther("0.01");

      // Should not revert
      await icoToken.write.transferEther([other.account.address, transferAmount], {
        account: buyer.account,
        value: payment,
      });

      assert.ok(true);
    });
  });

  describe("withdrowAllToken", function () {
    it("Should withdraw all tokens to owner when called by owner", async function () {
      const { token, icoToken } = await deployContracts(viem, owner);
      const initialOwnerBalance = await token.read.balanceOf([owner.account.address]);
      const contractBalance = await token.read.balanceOf([icoToken.address]);

      await icoToken.write.withdrowAllToken({
        account: owner.account,
      });

      const finalOwnerBalance = await token.read.balanceOf([owner.account.address]);
      const finalContractBalance = await token.read.balanceOf([icoToken.address]);

      assert.equal(finalOwnerBalance - initialOwnerBalance, contractBalance);
      assert.equal(finalContractBalance, 0n);
    });

    it("Should revert when called by non-owner", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      await assert.rejects(
        icoToken.write.withdrowAllToken({
          account: buyer.account,
        }),
        /Only Owner can do this action/
      );
    });

    it("Should revert when contract has no tokens", async function () {
      const { icoToken } = await deployContracts(viem, owner);
      // Withdraw all tokens first
      await icoToken.write.withdrowAllToken({
        account: owner.account,
      });

      // Try to withdraw again
      await assert.rejects(
        icoToken.write.withdrowAllToken({
          account: owner.account,
        }),
        /No token to withdrow/
      );
    });

  });
});
