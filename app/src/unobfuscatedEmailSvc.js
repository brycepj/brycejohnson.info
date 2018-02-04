import CryptoJS from "crypto-js";

const encryptedEmailArray = `U2FsdGVkX1+ikFUXQixbQHsU98lnm74YliCL+aP4in2igxn0FaSwhvkCOjyxdquiStrRAXuGOnTJHg8OAGGF+m9BUfZllCKfw1YhorKp1+v4UKs4acxF3sQNPInSTLXxVPnF/vz+ikA/vbLunU47ay/xabxgt51DbHjGJ3hy8igy3kDiM+RQbnNEylCcJYLpEbbLXWwrtxo5+aimbYcEF8ugR6+xveCmspt4rZkTsY6qNNSgxtyc63Wac73foerTX2KQyP1K2U6ateaeJhtWf5FGvF0wDl81bl2rSX0SYQrCvsuLRmZmcxElMxv7qHQ/oXMSkt1sYiSbtY0pkAdeUcmyPcRdNBSc/LjE/sJAqB4iArU9TNDWKibQgyeRUvdt3fzwwfW3f1x+YoNxp23hZVMJTYYcE0jyIKFuNUE3m8LnIRd7mOBCP2PTCtRbdXua7vHqEmndytKHYvyM0tCS/z2ZXWCutF3DlG9N51jQfcOjriygEVwrXGKP1iRWc5/zTJI3oQzxJDwBiSmVagtJ5NP4Dp6ujKQnZMFsc+jhDhXxrACD624sKWUH2eRF6vKsOiWeBj1ZvQjgKSiMPoZkr3AmhXfeRDshAa2rPwtio+zPQle/E0PcpcTHZ1VYJjq+r5+xxfceJqLOp7u4Mg6VTLOSEpAMvr1Oq3oelvDIDxuS+mxC+WgaeWLf6ERm/8cs`;

function unobfuscateEmailAddress() {
  return unobfuscateString(
    decryptAesString(encryptedEmailArray),
    getObfuscators()
  )
    .reverse()
    .join("")
    .split("")
    .reverse()
    .join("");
}

function revealEmailAddress(node, emailAddress) {
  node.classList.remove("blur-text");
  node.textContent = emailAddress;
}

function getObfuscators() {
  return ["Z", "-", "$", "&", "^", "#", "Q", "L", "A", "B", "9", "6"];
}

function unobfuscateString(arr, obfuscator) {
  return arr.map(str => stripChars(str, obfuscator));
}

function stripChars(str, obfuscators) {
  return obfuscators.reduce((memo, obfuscator) => {
    return stripChar(memo, obfuscator);
  }, str);
}

function stripChar(str, char) {
  return str.split(char).join("");
}

function decryptAesString(str) {
  const secretKey = "knave sanity lobe pied";

  const decryptedBytes = CryptoJS.AES.decrypt(str, secretKey);
  return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
}

export default unobfuscateEmailAddress;
