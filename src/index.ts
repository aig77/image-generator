
import { format, test_dir } from './config';
import NFTFactory from './NFTFactory';
import {draw} from './draw';
import {generateMetaData} from './generateMetaData';
const fs = require('fs');
//const path = require('path');
const { createCanvas } = require("canvas");
const uploadToPinata = require("./pinata");

const n = 3;
const factory = new NFTFactory();
const src = `./${test_dir}`;

if(!fs.existsSync(src))
    fs.mkdirSync(src);

const main = async () => {
    // factory.forceGenerate();
    // for(let i = 0; i < factory.characters.length; ++i) {
    //     const imgName = `${i}.png`;
    //     draw(factory.characters[i], canvas, imgName);
    // }

    console.log("creating and uploading images...");

    for(let i = 0; i < n; ++i) {
        const canvas = createCanvas(format.width, format.height);
        const name = `${i}`;
        const imgName = `${i}.png`;
        const jsonName = `${i}.json`;
        factory.createRandomCharacter(name);
        //factory.createCharacter(name, dna);
        draw(factory.characters[i], canvas, imgName);
        //const imgCid = "";
        const imgCid = await uploadToPinata(imgName);
        generateMetaData(factory.characters[i], jsonName, imgCid);
        const jsonCid = await uploadToPinata(jsonName);
        console.log(i);
    }
    
    console.log("process completed. press ^C to exit");
}

main();



