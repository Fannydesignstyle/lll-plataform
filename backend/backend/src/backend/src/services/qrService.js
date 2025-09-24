const QRCode = require('qrcode');
const HashService = require('./hashService');

class QRService {
  static async generateQRLLL(hash, institutionId, documentType = 'general') {
    if (!HashService.validateHash(hash)) {
      throw new Error('Invalid hash format');
    }

    const qrData = {
      v: '1.0',
      hash: hash,
      inst: institutionId,
      type: documentType,
      ts: Date.now(),
      url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify/${hash}`,
      platform: 'LLL'
    };

    const qrText = JSON.stringify(qrData);
    
    const qrCode = await QRCode.toDataURL(qrText, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });

    return {
      qrCode,
      qrText,
      hash,
      institutionId,
      documentType,
      timestamp: qrData.ts,
      verificationUrl: qrData.url
    };
  }
}

module.exports = QRService;
