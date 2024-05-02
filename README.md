# BLS Signature Verification

This project is a TypeScript implementation for verifying BLS signatures using the [@chainsafe/bls](https://www.npmjs.com/package/@chainsafe/bls) library. 
It sends a POST request to the Web3Signer `http://localhost:9005/api/v1/eth2/ext/sign/${pubkeyHex}` endpoint with a specific payload 
and verifies the signature received in the response.

See https://github.com/Consensys/web3signer/pull/982 for more information.

## Prerequisites

- Node.js (v12 or later)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/usmansaleem/node_bls_verify.git
```
2. Navigate to the project directory: 
```bash
cd node_bls_verify
```
3. Install the dependencies:
```bash
npm install
```
4. Start the application:
```bash
npm start
```
This will send a POST request to the specified endpoint with the payload 
```json
{
  "type" : "PROOF_OF_VALIDATION",
  "platform" : "dappnode",
  "timestamp" : "1711338489397"
}
```
and the public key `0xa3cc6919919abf050a3e64b6c5d826148ee3f766e6b67e7e8000645e51ebed1b9c6a20b9b7413a4eb835529cbe4f77a9`.

The application will then:

Verify the BLS signature received in the response using the ` @chainsafe/bls` library.
Check if the decoded payload from the response matches the original request payload.
The results will be logged to the console.

## Configuration

You can modify the following variables in the `index.ts` file to change the request payload and public key:

`pubkeyHex`: The public key in hexadecimal format.
`requestPayload`: The payload object to be sent in the POST request.

## License

This project is licensed under the Apache-2.0 License.
