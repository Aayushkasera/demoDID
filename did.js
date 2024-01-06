import { EthrDID } from "ethr-did";
import { ethers } from "ethers";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import HttpProvider from "ethjs-provider-http";
// import Web3 from 'web3';
// var web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/qqvQITyLZ5Hrf55GEYWOQrXyZS3otPHn');

// console.log(await web3.currentProvider);
const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.infura.io/v3/7e3389f940b041b98afa52df057e8c66",
);
// console.log(await provider.listAccounts());
// const signerAdminWallet1 = new ethers.Wallet(
//   "31a4c43bb8d774b92d10b07e46642375040f79c25a0064ab1354a2da9c90c664"
// );
// console.log(signerAdminWallet1,"signerAdminWallet1");
const p1 = await provider.getNetwork();
const chainId = p1.chainId;
// console.log(chainId);
// const keypair = EthrDID.createKeyPair()
// console.log(keypair);
const ethrDid = new EthrDID({
  identifier: "0x378367eb35a793817aD92ae055394E4A6CF1A0FF",
  privateKey:
    "31a4c43bb8d774b92d10b07e46642375040f79c25a0064ab1354a2da9c90c664",
  provider: provider,
  chainNameOrId: chainId,
});
// const ethrDid = new EthrDID({...keypair})
// this creates a DID like:
// console.log("ethrDid:", ethrDid);

const providerConfig = 
{
networks: [
  {
    rpcUrl:
    provider.connection.url,
  }
],
}
// const providerConfig = new Resolver(getResolver({ rpcUrl:provider, name: "sepolia" }));
// console.log(providerConfig, "config");
const ethrDidResolver = getResolver(providerConfig);
// console.log(await ethrDidResolver.ethr(), ">>>>>>>>>");
const didResolver = new Resolver(ethrDidResolver);
console.log(await didResolver.registry.ethr(), "didResolver");

const didDocument = await didResolver.resolve(
  "did:ethr:0x13881:0x378367eb35a793817aD92ae055394E4A6CF1A0FF"
);
console.log(didDocument, "did document");

// const helloJWT = await ethrDid.signJWT({hello: 'world'})
// console.log(helloJWT,"jwt");

// const verification = await ethrDid.signJWT({claims: {name: 'Joe Lubin'}})
// console.log(verification);

// const {payload, issuer} = ethrDid.verifyJWT(helloJWT)
// console.log(`${payload}`)

// // Issuer contains the DID of the signing identity
// console.log(issuer)
