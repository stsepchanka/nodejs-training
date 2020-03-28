const { Transform } = require('stream');
const os = require('os');

const { actions } = require('./constants');
const { CaesarCipher } = require('./caesar_cipher');

class CaesarCipherTransform extends Transform {
  constructor({ action, shift }) {
    super({});
    this.action = action;
    this.shift = +shift;
    this.caesarCipher = new CaesarCipher(shift);
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString('utf8');
    }

    if (this.action === actions[0]) {
      this.push(this.caesarCipher.encode(chunk));
    } else if (this.action === actions[1]) {
      this.push(this.caesarCipher.decode(chunk));
    } else {
      this.push(chunk);
    }
    callback();
  }

  _flush(callback) {
    this.push(os.EOL);
    callback();
  }
}

module.exports = {
  CaesarCipherTransform
};
