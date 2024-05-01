import axios from 'axios';
import { Buffer } from 'buffer';
import bls from "@chainsafe/bls";

const pubkeyHex = '0xa3cc6919919abf050a3e64b6c5d826148ee3f766e6b67e7e8000645e51ebed1b9c6a20b9b7413a4eb835529cbe4f77a9';
const requestPayload = {
  type: 'PROOF_OF_VALIDATION',
  platform: 'dappnode',
  timestamp: '1711338489397',
};

const sendRequest = async () => {
  try {
    console.log("\n\nSending request...")
    const response = await axios.post(`http://localhost:9005/api/v1/eth2/ext/sign/${pubkeyHex}`, requestPayload);
    const hexSignature = response.data.signature.slice(2); // Remove the '0x' prefix
    const signature = Buffer.from(hexSignature, 'hex');

    const base64Payload = response.data.payload;
    const decodedPayloadBuffer = Buffer.from(base64Payload, 'base64');

    // verify the payload
    const requestPayloadString = JSON.stringify(requestPayload);
    if (decodedPayloadBuffer.toString() === requestPayloadString) {
      console.log('Received Payload matches the request body');
    } else {
      console.log('Received Payload does not match the request body');
    }

    // verify the signature
    const blsPubKey = bls.PublicKey.fromHex(pubkeyHex);
    const blsSig = bls.Signature.fromHex(hexSignature);

    const isValid = blsSig.verify(blsPubKey, decodedPayloadBuffer);
    console.log(`BLS Signature is ${isValid ? 'valid' : 'invalid'}`);

    // verify that signature is incorrect
    const invalidPayload = JSON.stringify(requestPayload, null, 2)
    const invalidPayloadBuffer = Buffer.from(invalidPayload);
    const isInvalid = blsSig.verify(blsPubKey, invalidPayloadBuffer);
    console.log(`BLS Signature from different payload is ${isInvalid ? 'valid' : 'invalid'}`);

  } catch (error) {
    console.error('Error:', error);
  }
};

sendRequest();
