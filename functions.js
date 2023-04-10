const numInWords = function numberToWords(num) {
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    if (num < 0 || num > 999) {
        return 'Invalid number';
    }

    if (num < 10) {
        return ones[num];
    }

    if (num < 20) {
        return teens[num - 11];
    }

    if (num < 100) {
        const tensDigit = Math.floor(num / 10);
        const onesDigit = num % 10;
        const result = tens[tensDigit];
        return onesDigit ? result + '-' + ones[onesDigit] : result;
    }

    const hundredsDigit = Math.floor(num / 100);
    const tensValue = num % 100;
    const result = ones[hundredsDigit] + ' hundred';
    return tensValue ? result + ' ' + numberToWords(tensValue) : result;
}

module.exports = numInWords
