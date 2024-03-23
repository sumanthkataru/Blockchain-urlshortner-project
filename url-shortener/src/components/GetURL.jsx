// GetURL.js
import { utils } from 'ethers';
import React, { useState } from 'react';

const GetURL = ({ contract }) => {
  const [shortHash, setShortHash] = useState('');
  const [resultURL, setResultURL] = useState('');
  function stringToBytes32(str) {
  const utf8Bytes = utils.toUtf8Bytes(str);
  
  // Pad the bytes to 32 bytes
  const paddedBytes = utils.concat([utf8Bytes, new Uint8Array(32)]).slice(0, 32);

  // Convert the bytes to hex string
  const hexString = utils.hexlify(paddedBytes);

  return hexString;
}

  const handleGetURL = async () => {
    try {
      const [result, expiration] = await contract.getURL(stringToBytes32(shortHash))
      setResultURL(result);
      // Handle success or update UI
    } catch (error) {
      console.error('Error getting URL:', error);
    }
  };

  return (
    <div>
      <h2>Get Original URL</h2>
      <input type="text" value={shortHash} onChange={(e) => setShortHash(e.target.value)} />
      <button onClick={handleGetURL}>Get Original URL</button>
      <p>Result URL: {resultURL}</p>
    </div>
  );
};

export default GetURL;
