textInputElement = document.getElementById('alphabet-shift-textarea');
encodedMessage = document.getElementById('alphabet-shift-encoded-message')

const shiftAlphabetBy = (shift, message) => {

    const buildLowerAndUpperCaseLookupTableWith = (shift) => {

        const alphabetRange = [...Array(26).keys()]
        const init_and_shift = alphabetRange
            .map(i => ({init: i, shifted: i + shift}))
            .map(i_s => {
                if (i_s.shifted <= 25) return i_s
                else return {...i_s, shifted : (i_s.shifted - 26)}
            })

        const aCharCode = "a".charCodeAt(0)
        const ACharCode = "A".charCodeAt(0)
        const lowercaseLookupTable = {}
        const uppercaseLookupTable = {}

        for (let i_s of init_and_shift){
            let lowercaseKey   = String.fromCharCode(aCharCode + i_s.init)
            let lowercaseValue = String.fromCharCode(aCharCode + i_s.shifted)
            lowercaseLookupTable[lowercaseKey] = lowercaseValue

            let uppercaseKey   = String.fromCharCode(ACharCode + i_s.init)
            let uppercaseValue = String.fromCharCode(ACharCode + i_s.shifted)
            uppercaseLookupTable[uppercaseKey] = uppercaseValue
        }

        return {
            lowercase: {
                charCodeRange: {
                    from: "a".charCodeAt(0),
                    to: "z".charCodeAt(0)
                },
                lookupTable: lowercaseLookupTable
            },
            uppercase: {
                charCodeRange: {
                    from: "A".charCodeAt(0),
                    to: "Z".charCodeAt(0)
                },
                lookupTable: uppercaseLookupTable
            }
        }
    }

    const isLowercase = (char, lowercaseLookup) => {
        const code = char.charCodeAt(0)
        const range = lowercaseLookup.charCodeRange
        return code >= range.from
            &&
            code <= range.to
    }

    const isUppercase = (char, upperCaseLookup) => {
        const code = char.charCodeAt(0)
        const range = upperCaseLookup.charCodeRange
        return code >= range.from
            &&
            code <= range.to
    }

    const lookup = (char, lookupTable) => lookupTable[char]

    let shiftedMessage = ""
    const lowercaseAndUppercaseLookup = buildLowerAndUpperCaseLookupTableWith(shift)

    for (let char of message) {
        if (isLowercase(char, lowercaseAndUppercaseLookup.lowercase)) {
           shiftedMessage += lookup(char, lowercaseAndUppercaseLookup.lowercase.lookupTable)
        }

        else if (isUppercase(char, lowercaseAndUppercaseLookup.uppercase)) {
            shiftedMessage += lookup(char, lowercaseAndUppercaseLookup.uppercase.lookupTable)
        }

        else { // any other character
            shiftedMessage += char
        }
    }
    return shiftedMessage
}

textInputElement.addEventListener('ionInput', event => {
    let rawMessage = event.target.textContent
    if (rawMessage.length <= 1) {
        encodedMessage.innerText = 'Please type something into the message box above.';
        return;
    }

    this.encodedMessage.innerText = shiftAlphabetBy(25, rawMessage)
});
