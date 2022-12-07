# Privacy Challenge - MetaMask

## Team name

Invalid Identifiers

## Short description of your proposal

MetaMask uses [Infura](infura.io/) as a default RPC provider, when a user make a `read` request MetaMask asks for the IP address, but don't store it, Infura store only the wallet address.
When a user make a `write` request then it collects wallet address and IP informations.

## Technical details

If the user want or have to use Infura as an RPC provider, then a Proxy or TOR connection could be solution against IP logging, but not against wallet address logging.
We must mention that this solution is slower than usual.

Third-party RPC providers would solve both issue, because then we don't have to care about someone collect IP and wallet address details. For example [Moralis](https://moralis.io/) would be a solution because they don't store data about the IP address or wallet address.

While using third-party service you still have to trust in someone, if you don't want to trust in third-parys then you can deploy a self hosted Ethereum node. This is more expensive and time consuming but no need to trust anyone.

## Topology

https://miro.com/app/board/uXjVP8aapI4=/?share_link_id=336902055647
