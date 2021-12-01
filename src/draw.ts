import {test_dir, dnaBlock, Character} from './config';
const fs = require('fs');
const path = require('path');
const { loadImage } = require('canvas');


const getImageDir = (attribute: dnaBlock, layer: number): string => {
    let res = "";
    // check for non-empty attribute obj
    if(attribute.rarity !== "" || attribute.index >= 0) {
        const currentDir = path.join(__dirname, `../attributes/layer${layer}/`);
        let images: string[] = fs.readdirSync(currentDir);
        images = images.filter(fname => fname.startsWith(attribute.rarity));         
        res = path.join(currentDir, images[attribute.index]);
    }
    return res;
}

export const draw = (character: Character, canvas: any, fname: string) => {
    const ctx = canvas.getContext("2d");   
    for(let i = 0; i < character.dna.length; ++i) {
        const dir: string = getImageDir(character.dna[i], i);
        if(dir !== "") {
            loadImage(dir).then((image: any) => {
                ctx.drawImage(image, 0, 0);
                //const buffer = canvas.toBuffer("image/png");
                fs.writeFileSync(`./${test_dir}/${fname}`, canvas.toBuffer("image/png"));
            }); 
        }
    }
}



