# chelsea
 <br />
[![Join the chat at https://gitter.im/wolxXx/chelsea](https://badges.gitter.im/wolxXx/chelsea.svg)](https://gitter.im/wolxXx/chelsea?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
 <br />
smart and awesome tool collection for javascript. no frameworks needed. just plain vanilla javascript. <br />
let me know if something is missed. <br />
 <br />

## generateUUID()
generates a uuid  <br />
example:  eb5a5653-ff7b-40ed-84fe-c66b01fbe2b7 <br />
 <br />

## getPassword(length)
generates a random password with n = `length` characters <br />
example: 0qIBDo,0h0 <br />
 <br />

## replaceAll(find, replace, str)
replaces all occurrences in `str` of `find` with `replace` <br />
example: Chelsea.replaceAll("sucks", "is awesome", "linux sucks") -> `linux is awesome` <br />
 <br />

## trim(string)
clears all leading and tailing whitespaces, line breaks in `string`. <br /> 
Chelsea.trim("    &nbsp;&nbsp;&nbsp;&nbsp; my text \n       "); -> `my text` <br />
 <br />

## log(text, arguments)
checks if console.log is available and logs `text` and `arguments` <br />
 <br />

## getRandomColor()
generates a random color <br />
example: `#73A0AA` <br />
 <br />

## getRandomHalfTransparentColor()
generates a random transparent color <br />
example: `rgba(190, 192, 120, 0.6)` <br />
 <br />

## encodeBase64(input)
encodes a string to base64 format <br /> 
example: Chelsea.encodeBase64(JSON.toString({foo: 'bar', bar: 'foo'}) -> `W29iamVjdCBKU09OXQ==` <br />

    var data = JSON.toString({foo: 'bar', bar: 'foo'});
    var encoded = Chelsea.encodeBase64(data);
    var decoded = Chelsea.decodeBase64(encoded);
    var foo = encoded;
    Chelsea.log(data);
    Chelsea.log(encoded);
    Chelsea.log(decoded);
    Chelsea.log(data == decoded);
    
last log command will output `true`
 <br />

## decodeBase64(input)
decodes a base64 encoded string <br />
example: Chelsea.decodeBase64("W29iamVjdCBKU09OXQ==") -> `{foo: 'bar', bar: 'foo'}` <br />
 <br />


##@todo
 - need to create unit tests
 - more documentation
 - more features