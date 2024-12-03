const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  let marketplace, owner, addr1, addr2;

  beforeEach(async function () {
    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
    [owner, addr1, addr2] = await ethers.getSigners();
    marketplace = await Marketplace.deploy(); // Deployment
  });

  it("should mint an NFT successfully", async function () {
    await expect(marketplace.connect(addr1).mintNFT())
      .to.emit(marketplace, "NFTMinted")
      .withArgs(addr1.address, 0);

    const ownerOfNFT = await marketplace.ownerOf(0);
    expect(ownerOfNFT).to.equal(addr1.address);
  });
});
