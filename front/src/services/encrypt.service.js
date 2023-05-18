import CryptoJS from 'crypto-js';

const generateRandomString = () => {
    const randomWordArray = CryptoJS.lib.WordArray.random(16);
    return CryptoJS.enc.Base64.stringify(randomWordArray);
}
export const encryptNote = (text) => {
    const key = generateRandomString();
    const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
    console.log({ encryptedText, key });
    return { encryptedText, key };
}

export const decryptNote = ({encryptedText}, key) => {
    try {
        return  CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);

    } catch (error) {
        return null
    }
}

