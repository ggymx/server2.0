// `use strict`;
// import {AES,RSA} from './KeyConfig';
// //nodeJs内置模块
// // const crypto=require('crypto');
// import  CryptoJS from 'crypto-js';
// // console.log('crypto------------',crypto);

// /**
//  * @util 加密、解密工具类
//  */
// class CryptoUtil {
//     /**
//      * 解密
//      * @param dataStr {string}
//      * @param key {string}
//      * @param iv {string}
//      * @return {string}
//      */
//     static Decrypt(dataStr:string, key?, iv?) {
//                   
//                     if (key && iv) {
//                         key = CryptoJS.enc.Utf8.parse(key);
//                         iv = CryptoJS.enc.Utf8.parse(key);
//                     }else{
//                        key =AES.AES_SK;
//                         iv =AES.AES_IV;
//                     }
//                     let srcs = CryptoJS.enc.Utf8.parse(dataStr);
//                     var encrypted = CryptoJS.AES.encrypt(srcs, key, {
//                         iv: iv,
//                         mode: CryptoJS.mode.CBC,
//                         padding: CryptoJS.pad.ZeroPadding
//                     });
//                     // console.log("-=-=-=-", encrypted.ciphertext)
//                     return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
//     }

//     /**
//      * 加密
//      * @param dataStr {string}
//      * @param key {string}
//      * @param iv {string}
//      * @return {string}
//      */
//     static Encrypt(dataStr:string, key?, iv?) {
//            if (key && iv) {
//                             key = CryptoJS.enc.Utf8.parse(key);
//                             iv = CryptoJS.enc.Utf8.parse(key);
//                         }else{
//                            key =AES.AES_SK;
//                             iv =AES.AES_IV;
//                         }
//                          let base64 = CryptoJS.enc.Base64.parse(dataStr);
//             let src = CryptoJS.enc.Base64.stringify(base64);
//             var decrypt = CryptoJS.AES.decrypt(src, key, {
//                 iv: iv,
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.ZeroPadding
//             });
//             var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
//             return decryptedStr.toString();
//     }
// }

// export default CryptoUtil;