var Chelsea = {
    generateUUID                 : function () {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d     = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    getPassword                  : function (length) {
        length       = length || 10;
        var password = '';
        var alphabet = [
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
            'z',
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
            'Z',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '0',
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
        ];
        while (password.length < length) {
            var index = Math.abs(Math.round(Math.random() * alphabet.length) - 1);
            password += alphabet[index];
        }
        return password;
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
        return 'rgba(' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ', ' + parseInt(Math.random() * 255) + ', ' + Math.random() + ')'
    }
};