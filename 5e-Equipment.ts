/**********************************************************************/
/* Description: Code to create and fetch items from 5e-Equipment.json */
/* Version: 0.X                                                       */
/* Authors: Robin Djursäter (robin.djursater@gmail.com)               */
/**********************************************************************/

declare function require(name:string);

function createEqdbobj(){
    let jsonString : any;
    let jsonObj : any;
    jsonString = JSON.stringify(require("./5e-SRD-Equipment.json"));
    jsonString = jsonString.replace(/2h_damage/gi, 'twoh_damage'); // original '2h_damage' messes up TS notation.
    jsonString = jsonString.replace(/weapon_category:/gi, 'weapon_category') // original 'weapon_category:' messes up TS notation.
    jsonObj = JSON.parse(jsonString);
    return jsonObj;
}

// returns a summarized list of chosen keys. Function need to be extended so that it can handle multiple levels of keys, it can only handle one level now.
function getStringKeysOfOneType(keyType : string, jsonString : any){
    let stringKeyList : string[];
    stringKeyList = [];
        for (let i in jsonString){
            stringKeyList.push(Object(jsonString[i])[keyType])
        }
    let unique_stringKeyList = stringKeyList.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_stringKeyList;
}


class Cost {
    quantity: number;
    unit: string;
    constructor(i, jsonString : any){
        this.quantity=jsonString[i].cost.quantity;
        this.unit=jsonString[i].cost.unit;
    }
}

class DamageType {
    url: string;
    name: string;
    constructor(i, jsonString : any){
        this.url=jsonString[i].damage.damage_type.url;
        this.name=jsonString[i].damage.damage_type.name;
    }
}

class Damage {
    dice_count: number;
    dice_value: number;
    damage_type: DamageType;
    constructor(i, jsonString : any){
        this.dice_count=jsonString[i].damage.dice_count;
        this.dice_value=jsonString[i].damage.dice_value;
        this.damage_type = new DamageType(i,jsonString);
    }
}

class Rangex { // "Range" can not be used since it messes up TS notation.
    normal: number;
    long: number;
    constructor(i, jsonString : any){
        this.normal=jsonString[i].range.normal;
        this.long=jsonString[i].range.long;
    }
}

class Property {
    url: string;
    name: string;
    constructor(i, jsonString : any){
        this.url=jsonString[i].properties.url;
        this.name=jsonString[i].properties.name;
    }
}

class ThrowRange {
    normal: number;
    long: number;
    constructor(i, jsonString : any){
        if('throw_range' in jsonString[i])
            {
            this.normal=jsonString[i].throw_range.normal
            this.long=jsonString[i].throw_range.long
            }
            {
            this.normal=null
            this.long=null
            }
    }
}

class twohDamage {
    dice_count: number;
    dice_value: number;
    damage_type: DamageType;
    constructor(i, jsonString : any){
            if('twoh_damange' in jsonString[i]){
                this.dice_count= jsonString[i].twoh_damage.dice_count;
                this.dice_value= jsonString[i].twoh_damage.dice_value;
                this.damage_type = new DamageType(i, jsonString);
            }
            {
                this.dice_count=null;
                this.dice_value=null;
                this.damage_type=null;
            }
        
    }
}

class ArmorClass {
    base: number;
    dex_bonus: boolean;
    max_bonus?: number;
    constructor(){
        this.base=null;
        this.dex_bonus=false;
        this.max_bonus=null;
    }
}

class Content {
    item_url: string;
    quantity: number;
    constructor(){
        this.item_url=null;
        this.quantity=null;
    }
}

class Speed {
    quantity: number;
    unit: string;
    constructor(){
        this.quantity=null;
        this.unit=null
    }
}


class Equipment {
    static eqdbObj = createEqdbobj(); // don't know if this is "professionally done" or not, calling a function this way.
    index: number;
    name: string;
    equipment_category: string;
    cost: Cost;
    weight: number;
    url: string;

    constructor(item : string){
        for (let i in Equipment.eqdbObj){
            if(Equipment.eqdbObj[i].name == item){
                this.index=Equipment.eqdbObj[i].index;
                this.name=Equipment.eqdbObj[i].name;
                this.equipment_category=Equipment.eqdbObj[i].equipment_category;
                this.cost = new Cost(i,Equipment.eqdbObj);
                this.weight=Equipment.eqdbObj[i].weight;
                this.url=Equipment.eqdbObj[i].url;
            }
        }
    }

    static getEquipmentCategories(){
        let equipmentCategoryList : string[];
        equipmentCategoryList = getStringKeysOfOneType('equipment_category', Equipment.eqdbObj);
        return equipmentCategoryList;
    }

    static getWeaponCategories(){
        let weaponCategoryList : string[];
        weaponCategoryList = getStringKeysOfOneType('weapon_category', Equipment.eqdbObj);
        return weaponCategoryList;
    }

    /*
    static getWeapons(){
        let weaponList : string[];
        weaponList = getStringKeysOfOneType('', Equipment.eqdbObj);
        return weaponList;
    }*/

    //getArmorTypes(){}
    //getArmors(){}

    //getToolTypes(){}
    //getTools(){}

    //getAdventuringGearCategories(){}
    //getAdventuringGears(){}

    //getMountsAndVechicles(){}
    //

}


class AdventuringGear extends Equipment{
    contents: Content;
    desc: string[];
    gear_category: string;

    constructor(item){
        super(item);
        this.desc=null;
        this.gear_category=null;
        this.contents = new Content;
    }
}

class Ammunition extends Equipment{
    constructor(item){
        super(item)
    }
}

class Armor extends Equipment{
    armor_category: string;
    armor_class: ArmorClass;
    str_minimum?: number;
    stealth_disadvantage?: boolean;

    constructor(item){
        super(item);
        this.armor_category=null;
        this.armor_class = new ArmorClass;
        this.str_minimum=null;
        this.stealth_disadvantage=false;
    }
}

class Weapon extends Equipment{
    weapon_category: string; 
    weapon_range: string;
    category_range: string;
    damage: Damage;
    range: Rangex;
    throw_range: ThrowRange;
    twoh_damage: twohDamage;
    special: string[];
    properties: Property;

    constructor(item){
        super(item);
        for (let i in Equipment.eqdbObj){
            if(Equipment.eqdbObj[i].name == item){
                this.weapon_category=Equipment.eqdbObj[i].weapon_category;
                this.weapon_range=Equipment.eqdbObj[i].weapon_range;
                this.category_range=Equipment.eqdbObj[i].category_range;
                this.damage = new Damage(i , Equipment.eqdbObj);
                this.range = new Rangex(i, Equipment.eqdbObj);
                this.properties = new Property(i, Equipment.eqdbObj);
                this.throw_range = new ThrowRange(i, Equipment.eqdbObj);
                this.twoh_damage = new twohDamage(i, Equipment.eqdbObj);
                this.special=Equipment.eqdbObj[i].special;
            }
        }
    }
}

class Tool extends Equipment{
    tool_category: string;

    constructor(item){
        super(item);
        this.tool_category=null;
    }
}

class MountsAndVehicles extends Equipment{
    capacity: string;
    desc: string[];
    speed: Speed;
    
    vehicle_category: string;

    constructor(item){
        super(item);
        this.capacity=null;
        this.desc=[null];
        this.vehicle_category=null;
        this.speed = new Speed; //Speed is not set on every Mount or Vehicle
    }
}


/******* SANDBOX TO TEST CODE *********/

/* Create an item, eg a longsword */
let weaponnr1 = new Weapon('Longsword');
console.log(weaponnr1)

/* Get list of equipment categories*/
let a : any;
a = Equipment.getEquipmentCategories();
console.log(a)

/* Get list of weapon categories*/
// let b : any;
// b = Equipment.getWeaponCategories();
// console.log(b)








//--------------------------------------------------------------------//


/* Fetches all the "stats" from a specific object in a jsonstring */
/* function getJsonStats(object : string , eqjsonstring){
    let thisAttribute : string[] = []; //have to create this array to collect attributes from this Class (Equpiment). Can't use Object.Keys- function for this. 
    thisAttribute = Object.getOwnPropertyNames(this);
    console.log(thisAttribute)

    for (let i in eqjsonstring){
        if(eqjsonstring[i].name==object){
            console.log(object)
            for (let k in eqjsonstring[i]){
                // @ts-ignore
                if(thisAttribute.includes(k)){
                    this[k]= eqjsonstring[i][k]
                }
            }
        }
    }
} */

// returns a list with all equipment categories
/* function getJsonTypeList(){
    let equipmentCategoryList : string[];
    equipmentCategoryList = [];
        for (let i in Equipment.eqdbObj){
            equipmentCategoryList.push(Equipment.eqdbObj[i].equipment_category);
        }
    let unique_equipmentCategoryList = equipmentCategoryList.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_equipmentCategoryList;
} */

//returns a list of all equpiment under a specified equpiment type, e.g "Weapon"
/* function getEquipmentList(typeOfEquipment : string){
    let equipmentList : string[];
    equipmentList = [];
        for (let i in Equipment.eqdbObj){
            if (Equipment.eqdbObj[i].equipment_category==typeOfEquipment){
                equipmentList.push(Equipment.eqdbObj[i].name);
            }
        }
    return equipmentList;
} */

//creates an equipment item of a chosen equipment from equipment db, like "Backpack" or "Shortsword"
/* getJsonStats(object : string , eqjsonstring){
    let thisAttribute : string[] = []; //have to create this array to collect attributes from this Class (Equpiment). Can't use Object.Keys- function for this. 
    thisAttribute = Object.getOwnPropertyNames(this);
    console.log(thisAttribute)

    for (let i in eqjsonstring){
        if(eqjsonstring[i].name==object){
            for (let k in eqjsonstring[i]){
                // @ts-ignore
                if(thisAttribute.includes(k)){
                    this[k]= eqjsonstring[i][k]
                }
            }
        }
    }
} */

//-------------------------------------------------------------------//


/******************************************************************************************************************************************************************************************************************

TODO

Some properties are not set correctly, mainly due to naming complications in .json and reserved functions in TS, like range.
- Weaponcategory is written like "weapon_category:" in the .json file. Would be better to just change it to "weapon_category". Make it replace it together with 2hand_damage.

Fix eqdbObj
- attribute "Weapon_category:" contains a ":" in the original file. Replace it with only "Weapon_category" without the ":"
- maybe also remove the url attribute on all places?

Fix constructors
- Some attributes, like Cost, doesn't fetch stats from the EqdbObj yet. Make it happen.
- Properties on weapons should be of type 'list' not 'string'
- Special on weapons should be of type 'list' not 'string'
- I don't understand... why is the element special allowed to not exist in an object, like dagger, and be set to undefined while a Lance or Longbow fails on twoh_damage or Range when these doesn't exist on their objects?


*****************************************************************************************************************************************************************************************************************/