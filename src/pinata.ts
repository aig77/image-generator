import {test_dir} from './config';
import {pinataKeys} from './pinataKeys';
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');
 
const pinata = pinataSDK(pinataKeys.apiKey, pinataKeys.apiSecret);

// pinata.testAuthentication().then((result) => {
//     // handle successful authentication here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

const src = path.join(__dirname, `../${test_dir}`);

export const uploadToPinata = async (fname: string) => {
    const file = fs.createReadStream(path.join(src, fname));
    try {
        return (await pinata.pinFileToIPFS(file)).IpfsHash;
    } catch(err) {
        console.log(err);
        return null;
    }
}

