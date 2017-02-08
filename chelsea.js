var Chelsea = {
    generateUUID: function () {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d     = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    getBadAss                    : function (length) {
        length = length || 10;
        return this.PasswordGenerator.getBadAss(length);
    },
    generateSerialKey            : function () {
        return this.PasswordGenerator.generateSerialKey();
    },
    getNumericPassword           : function (length) {
        length = length || 10;
        return this.PasswordGenerator.getNumericPassword(length);
    },
    getSimpleLowercasePassword   : function (length) {
        length = length || 10;
        return this.PasswordGenerator.getSimpleLowercasePassword(length);
    },
    getSimpleUppercasePassword   : function (length) {
        length = length || 10;
        return this.PasswordGenerator.getSimpleUppercasePassword(length);
    },
    getHumanReadablePassword     : function (length) {
        length = length || 10;
        return this.PasswordGenerator.getHumanReadablePassword(length);
    },
    replaceAll                   : function (find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    },
    trim                         : function (string) {
        return string.replace(/^\s+|\s+$/g, '');
    },
    log                          : function (text, arguments) {
        arguments = arguments || [];
        if (typeof console !== "undefined" && console.log) {
            console.log(text, arguments);
        }

    },
    getRandomColor               : function () {
        var letters = '0123456789ABCDEF'.split('');
        var color   = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },
    getRandomHalfTransparentColor: function () {
        return 'rgba(' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ', ' + parseFloat(Math.random()).toPrecision(1) + ')'
    },
    encodeBase64                 : function (input) {
        return Chelsea.Base64.encode(input);
    },
    decodeBase64                 : function (input) {
        return Chelsea.Base64.decode(input);
    }
};

Chelsea.PasswordGenerator = {
    getHumanReadablePassword  : function (length) {
        length       = length || 10;
        var alphabet = this.lowerCaseAlphabet.concat(this.upperCaseAlphabet).concat(this.numericAlphabet);
        alphabet     = alphabet.filter(function (testValue) {
            return -1 === [
                    '0',
                    'o',
                    'O',
                    'L',
                    'l',
                    'I',
                    'i',
                    'j',
                    '1',
                    'm',
                    'n',
                    'h',
                    'w',
                    'v',
                    'G',
                    '6',
                    '5',
                    'S',
                    'B',
                    'b',
                    '8' //sad beep from bb-8
                ].indexOf(testValue);
        });
        return this.generatePassword(alphabet, length);
    },
    getNumericPassword        : function (length) {
        length = length || 10;
        return this.generatePassword(this.numericAlphabet, length);
    },
    getSimpleUppercasePassword: function (length) {
        length = length || 10;
        return this.generatePassword(this.numericAlphabet.concat(this.upperCaseAlphabet), length);
    },
    getSimpleLowercasePassword: function (length) {
        length = length || 10;
        return this.generatePassword(this.numericAlphabet.concat(this.lowerCaseAlphabet), length);
    },
    getBadAss                 : function (length) {
        length = length || 10;
        return this.generatePassword(null, length);
    },

    generateSerialKey: function () {
        var simpleUppercasPassword = this.getSimpleUppercasePassword(20);
        var serialKey              = '';
        for (var i = 0; i < simpleUppercasPassword.length; i++) {
            serialKey += simpleUppercasPassword[i];
            if (0 !== i && i % 4 === 1) {
                serialKey += '-';
            }
        }

        return serialKey;
    },

    generatePassword: function (alphabet, length) {
        length = length || 10;
        if (!alphabet) {
            alphabet = this.numericAlphabet.concat(this.upperCaseAlphabet).concat(this.lowerCaseAlphabet).concat(this.specialSignAlphabet);
        }
        var password = '';

        while (password.length < length) {
            var index = Math.abs(Math.round(Math.random() * alphabet.length) - 1);
            password += alphabet[index];
        }
        return password;
    },

    lowerCaseAlphabet  : [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ],
    upperCaseAlphabet  : [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ],
    numericAlphabet    : [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0'
    ],
    specialSignAlphabet: [
        ',',
        '.',
        '-',
        '_',
        '!',
        '"',
        '$',
        '%',
        '&',
        '(',
        ')',
        '[',
        ']'
    ]
};

Chelsea.Base64 = {

    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i      = 0;

        input = Chelsea.Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i      = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Chelsea.Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function (string) {
        string      = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function (utftext) {
        var string = "";
        var i      = 0;
        var c      = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};