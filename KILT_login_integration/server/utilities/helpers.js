/*import {
    DidDocument,
    KiltKeyringPair,
    SignCallback,
    SignExtrinsicCallback,
  } from '@kiltprotocol/sdk-js'*/
  //export type KeyToolSignCallback = (didDocument: DidDocument) => SignCallback
  
  export const exit = (response, status, message) => {
    response.statusMessage = message
    return response.status(status).end()
  }
  
  export async function methodNotFound(request, response, method) {
    response.statusMessage = `method ${method} no found`
    response.status(400).end()
  }
  
  export async function assertionSigner({
    assertion,
    didDocument,
  }) {
    const { assertionMethod } = didDocument
    // if (!assertionMethod) throw new Error('no assertionMethod')
  
    return async ({ data }) => ({
      signature: assertion.sign(data),
      keyType: assertion.type,
      keyUri: `${didDocument.uri}${assertionMethod[0].id}`,
    })
  }
  
  export async function authenticationSigner({
    authenticationKey,
    didDocument,
  }){
    // if (!authenticationMethod) throw new Error('no authenticationMethod')
  
    return async ({ data }) => ({
      signature: authenticationKey.sign(data),
      keyType: authenticationKey.type,
    })
  }
  