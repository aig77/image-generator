//const { layerData, rarityData, attributeCount } = require("./config");
import {Character, layerData, rarityData, dnaBlock} from "./config";


export default class NFTFactory {
    characters: Character[] = [];

    createCharacter(_name: string, _dna: dnaBlock[]): void {
        const c: Character = {name: _name, dna: _dna};
        this.characters.push(c);
    }

    generateRandomDna(): dnaBlock[] {
        let dna: dnaBlock[] = [];
        for(let i = 0; i < layerData.length; ++i) {
            const chance: number = Math.random();
            const rar: number = weightedRandomChoice(Math.random());
            let input: dnaBlock;
            if(chance < layerData[i].chance) {
                const idx: number = Math.floor(Math.random() * layerData[i].count[rar]);
                input = {rarity:`${rarityData[rar].name}`, index: idx};
            } else
                input = {rarity:"", index:-1};
            dna.push(input);
        }
        //console.log(dna);
        return dna;
    }
    
    createRandomCharacter(name: string) {
        this.createCharacter(name, this.generateRandomDna());
    }

    forceGenerate() {
        let count = 0;
        for(let layer = 0; layer < layerData.length; ++layer) {
            for(let rar = 0; rar < rarityData.length; ++rar) {
                for(let attr = 0; attr < layerData[layer].count[rar]; ++attr) {
                    let dna = this.generateRandomDna();
                    dna[layer] = {rarity:rarityData[rar].name, index:attr};
                    this.createCharacter(`temp${count++}`, dna);
                }
            }
        }
        
    }
}

const weightedRandomChoice = (rand: number) => {
    for(let i = 0; i < rarityData.length; ++i) {
        if(rand < rarityData[i].dropRate)
            return i;
        rand -= rarityData[i].dropRate;
    }
    return rand;
}
