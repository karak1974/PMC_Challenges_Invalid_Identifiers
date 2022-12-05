import {
    naclBoxPairFromSecret,
    blake2AsU8a,
    keyFromPath,
  //  naclOpen,
    sr25519PairFromSeed,
    keyExtractPath,
    mnemonicToMiniSecret,
  //  cryptoWaitReady,
  } from '@polkadot/util-crypto'

import {
    Utils,
    Did,
  //  KiltKeyringPair,
  //  NewDidEncryptionKey,
  //  DidUri,
  //  DecryptCallback,
  //  KiltEncryptionKeypair,
  //  DidDocument,
  //  EncryptCallback,
    ConfigService,
    Blockchain,
  } from '@kiltprotocol/sdk-js'

import { authenticationSigner } from './helpers.js'

//export const DID_URI = process.env.VERIFIER_DID_URI
//export const MNEMONIC = process.env.VERIFIER_MNEMONIC

export async function getAccount() {
    const signingKeyPairType = 'sr25519'
    const keyring = new Utils.Keyring({
      ss58Format: 38,
      type: signingKeyPairType,
    })
    //console.log(process.env.VERIFIER_MNEMONIC)
    return keyring.addFromMnemonic(process.env.VERIFIER_MNEMONIC)
}

export async function getKeypairs() {
    const account = await getAccount()
    const authentication = {
      ...account.derive('//did//0'),
      type: 'sr25519',
    }
    const assertion = {
      ...account.derive('//did//assertion//0'),
      type: 'sr25519',
    }
    const keyAgreement = (function () {
      const secretKeyPair = sr25519PairFromSeed(mnemonicToMiniSecret(process.env.VERIFIER_MNEMONIC))
      const { path } = keyExtractPath('//did//keyAgreement//0')
      const { secretKey } = keyFromPath(secretKeyPair, path, 'sr25519')
      return {
        ...naclBoxPairFromSecret(blake2AsU8a(secretKey)),
        type: 'x25519',
      }
    })()
  
    return {
      authentication,
      assertion,
      keyAgreement,
    }
}

export async function getFullDid() {
    const api = ConfigService.get('api')
    const fullDid = await Did.resolve(process.env.VERIFIER_DID_URI)
  
    const { authentication, assertion } = await getKeypairs()
    console.log(fullDid.document.assertionMethod)
    if (fullDid.document.assertionMethod === undefined) {
      const extrinsic = api.tx.did.setAttestationKey(
        Did.publicKeyToChain(assertion)
      )
  
      const account = await getAccount()
  
      const tx = await Did.authorizeTx(
        fullDid.document.uri,
        extrinsic,
        await authenticationSigner({
          authenticationKey: authentication,
          didDocument: fullDid.document,
        }),
        account.address
      )
  
      await Blockchain.signAndSubmitTx(tx, account)
    }
  
    return fullDid
  }