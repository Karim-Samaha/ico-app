import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("IcoTokenModule", (m) => {
  // First deploy the MyToken contract
  const token = m.contract("MyToken");
  
  // Then deploy IcoToken with the token address
  const icoToken = m.contract("IcoToken", [token]);

  return { token, icoToken };
});
