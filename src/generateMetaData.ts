import { layerData, test_dir, Character, jsonAttr, erc721 } from "./config";
const fs = require('fs');
const path = require('path');

export const generateMetaData = (character: Character, fname: string, cid: string): void => {
    let attributes: jsonAttr[] = [];
    for(let i = 0; i < character.dna.length; ++i) {
            attributes.push(character.dna[i]
                ? {"type":layerData[i].name, "rarity": character.dna[i].rarity}
                : {"type":layerData[i].name, "rarity":"NaN"}
            );
    }

    const result: erc721 = {
            "name": character.name,
            "description": "Sick! A randomly generated bowl of fruit!",
            "image": cid,
            "attributes": attributes
    };

    const res_string = JSON.stringify(result);
    fs.writeFile(path.join(__dirname, `../${test_dir}/${fname}`), res_string, 
        (err: any) => {
            if(err) console.log(err);
    });
}