export interface dnaBlock {
    rarity: string;
    index: number;
}

export interface Character {
    name: string;
    dna: dnaBlock[];
}

interface layerBlock {
    name: string;
    chance: number;
    count: number[];
}

interface rarityBlock {
    name: string;
    dropRate: number;
}

export interface jsonAttr {
    "type": string;
    "rarity": string;
}

export interface erc721 {
    "name": string;
    "description": string;
    "image": string;
    "attributes": jsonAttr[];
}

export const rarityData: rarityBlock[] = [{
    name: "common", 
    dropRate: 0.7
},
{
    name: "rare",
    dropRate: 0.25,
},
{ 
    name: "legendary",
    dropRate: 0.05
}];

export const layerData: layerBlock[] = [{
    name: "background",
    chance: 1,
    count:[1,1,1]
},
{
    name: "fruit1",
    chance: 0.5,
    count: [1,1,1]
},
{
    name: "fruit2",
    chance: 0.5,
    count: [1,1,1]
},
{
    name: "fruit3",
    chance: 0.5,
    count: [1,1,1]
},
{
    name: "bowl", 
    chance: 1,
    count: [1,1,1]
}];

export const format = {
    width: 500,
    height: 300
};

export const test_dir: string = "test";