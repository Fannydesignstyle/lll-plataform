const sha256 = require('js-sha256');

class HashService {
  static generateHashLLL(content, metadata) {
    try {
      const dataToHash = {
        content: typeof content === 'string' ? content : JSON.stringify(content),
        metadata,
        timestamp: Date.now()
      };

      const jsonString = JSON.stringify(dataToHash);
      const firstHash = sha256(jsonString);
      const saltedHash = firstHash + (process.env.HASH_SALT || 'lll_salt');
      const finalHash = sha256(saltedHash);

      return finalHash;
    } catch (error) {
      console.error('Error generating LLL hash:', error);
      throw new Error('Error generating LLL hash: ' + error.message);
    }
  }

  static validateHash(hash) {
    const hashRegex = /^[a-fA-F0-9]{64}$/;
    return hashRegex.test(hash);
  }
}

module.exports = HashService;
