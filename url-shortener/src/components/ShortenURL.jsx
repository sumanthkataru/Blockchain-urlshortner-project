// ShortenURL.jsx

import React, { useState } from 'react';
import { ethers } from 'ethers';
import './ShortenURL.css'; // Import the CSS file for styling

const ShortenURL = ({ contract, accounts, storageFee }) => {
  const [urlToShorten, setUrlToShorten] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const handleShortenURL = async () => {
    try {
      await contract.shortenURL(urlToShorten, expirationTime);
      console.log("entered");
      contract.on('URLShortened', async (shorthash, url, x, y) => {
      console.log(shorthash);
       console.log(url);
        const p = await contract.getURL(shorthash);
        const shorturl = "www.Sumanth-" + shorthash.toString().slice(0, 10);
        setShortUrl(shorturl);
        setOriginalUrl(url.toString());
      });
      // Handle success or update UI
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div className="shorten-url-container">
      <h2>Shorten URL</h2>
      <div className="input-container">
        <input
          type="text"
          value={urlToShorten}
          onChange={(e) => setUrlToShorten(e.target.value)}
          placeholder="Enter URL to shorten"
        />
      </div>
      <div className="input-container">
        <input
          type="number"
          value={expirationTime}
          onChange={(e) => setExpirationTime(e.target.value)}
          placeholder="Enter expiration time"
        />
      </div>
      <button className="shorten-url-button" onClick={handleShortenURL}>
        Shorten URL
      </button>
      <div className="url-results">
        <p>
          Short URL: <a href={originalUrl}>{shortUrl}</a>
        </p>
      </div>
    </div>
  );
};

export default ShortenURL;
