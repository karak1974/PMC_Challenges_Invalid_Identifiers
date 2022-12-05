import {getFullDid, getKeypairs } from './verifier.js'
import {
    createCredential,
    getDomainLinkagePresentation,
  } from './wellKnownDidConfiguration.js'
  import {
    connect,
  } from '@kiltprotocol/sdk-js'
import { assertionSigner } from './helpers.js'


export async function setDomainLinkage (){
    await connect(process.env.WSS_ADDRESS)
    const { assertion } = await getKeypairs()
  
    const fullDid = await getFullDid()
  
    const domainLinkageCredential = await createCredential(
      await assertionSigner({ assertion, didDocument: fullDid.document }),
      process.env.ORIGIN,
      process.env.VERIFIER_DID_URI
    )
  
    return getDomainLinkagePresentation(domainLinkageCredential)
}

//export {setDomainLinkage}
  