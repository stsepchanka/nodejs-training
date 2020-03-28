const { lengthABC, startCode } = require('./constants');

class CaesarCipher {
  constructor(shift) {
    this.shift = shift;
  }

  encode(text) {
    return this.cipher(text, this.shift);
  }

  decode(text) {
    return this.cipher(text, -this.shift);
  }

  cipher(text, shift) {
    return [...text]
      .map(letter => {
        const charCode = letter.charCodeAt(0);
        const foundCase = ['uppercase', 'lowercase'].find(
          someCase =>
            charCode >= startCode[someCase] &&
            charCode < startCode[someCase] + lengthABC
        );
        if (foundCase) {
          return String.fromCharCode(
            ((charCode - startCode[foundCase] - shift + lengthABC) %
              lengthABC) +
              startCode[foundCase]
          );
        }

        return letter;
      })
      .join('');
  }
}

module.exports = {
  CaesarCipher
};
