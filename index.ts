import axios from 'axios';
import { Buffer } from 'buffer';
import { bls12_381 as bls } from '@noble/curves/bls12-381'

const pubkeyHex = '0xa3cc6919919abf050a3e64b6c5d826148ee3f766e6b67e7e8000645e51ebed1b9c6a20b9b7413a4eb835529cbe4f77a9';
const requestPayload = {
  type: 'PROOF_OF_VALIDATION',
  platform: 'dappnode',
  timestamp: '1711338489397',
};

const sendRequest = async () => {
  try {
    const response = await axios.post(`http://localhost:9005/api/v1/eth2/ext/sign/${pubkeyHex}`, requestPayload);
    const hexSignature = response.data.signature.slice(2); // Remove the '0x' prefix
    const signature = Buffer.from(hexSignature, 'hex');

    const base64Payload = response.data.payload;
    const decodedPayload = Buffer.from(base64Payload, 'base64').toString();
    const hexPayload = Buffer.from(decodedPayload).toString('hex');

    const isValid = bls.verify(signature, hexPayload, pubkeyHex.slice(2));
    console.log(`Signature is ${isValid ? 'valid' : 'invalid'}`);

    const requestPayloadString = JSON.stringify(requestPayload);
    if (decodedPayload === requestPayloadString) {
      console.log('Payload matches the request body');
    } else {
      console.log('Payload does not match the request body');
    }

  } catch (error) {
    console.error('Error:', error);
  }
};

sendRequest();
