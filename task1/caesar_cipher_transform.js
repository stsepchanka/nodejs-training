const { Transform } = require('stream');

const { actions } = require('./constants');

class CaesarCipherTransform extends Transform {
  constructor({ action, shift }) {
    super({});
    this.action = action;
    this.shift = +shift;
  }

  _transform(chunk, encoding, callback) {
    if (this.action === actions[0]) {
      this.push(caesarCipher(chunk, this.shift));
    } else if (this.action === actions[1]) {
      this.push(caesarCipher(chunk, -this.shift));
    } else {
      this.push(chunk);
    }

    callback();
  }
}

const caesarCipher = (text, shift) => {
  const length = 26;
  const startCode = {
    uppercase: 'A'.charCodeAt(0),
    lowercase: 'a'.charCodeAt(0)
  };

  if (Buffer.isBuffer(text)) {
    text = text.toString('utf8');
  }

  return [...text]
    .map(letter => {
      const charCode = letter.charCodeAt(0);
      const foundCase = ['uppercase', 'lowercase'].find(
        someCase =>
          charCode >= startCode[someCase] &&
          charCode < startCode[someCase] + length
      );
      if (foundCase) {
        return String.fromCharCode(
          ((charCode - startCode[foundCase] - shift + length) % length) +
            startCode[foundCase]
        );
      }

      return letter;
    })
    .join('');
};

module.exports = CaesarCipherTransform;
