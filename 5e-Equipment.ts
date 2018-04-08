/**********************************************************************/
/* Description: Code to create and fetch items from 5e-Equipment.json */
/* Version: 0.X                                                       */
/* Authors: Robin Djursäter (robin.djursater@gmail.com)               */
/**********************************************************************/

declare function require(name:string);

class Cost {
    quantity: number;
    unit: string;
    constructor(){
        this.quantity=null;
        this.unit=null
    }
}

class DamageType {
    url: string;
    name: string;
    constructor(){
        this.url=null;
        this.name=null;
    }
}

class Damage {
    dice_count: number;
    dice_value: number;
    damage_type: DamageType;
    constructor(){
        this.dice_count=null;
        this.dice_value=null;
        this.damage_type = new DamageType;
    }
}

class Rangex {
    normal: number;
    long?: any;
    constructor(){
        this.normal=null;
        this.long=null;
    }
}

class Property {
    url: string;
    name: string;
    constructor(){
        this.url=null;
        this.name=null;
    }
}

class ThrowRange {
    normal: number;
    long: number;
    constructor(){
        this.normal=null;
        this.long=null;
    }
}

class twohDamage {
    dice_count: number;
    dice_value: number;
    damage_type: DamageType; //original variable type was blank, inserted "DamageType"
    constructor(){
        this.dice_value=null;
        this.dice_value=null;
        this.damage_type = new DamageType;
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
    static eqdbObj = JSON.parse(JSON.stringify(require("./5e-SRD-Equipment.json")).replace(/2h_damage/gi, 'twoh_damage')); //raplaced "2hDamage" to 'twoh_damage' due to naming restrictions when creating classes (leading number). Maybe move this to the beginning of code?
    index: number;
    name: string;
    equipment_category: string;
    weapon_category: string; // original line was "weapon_category::" , json element is written like "weapon_category:" (notice the trailing ":"). Typescipt uses : to define var types, hence the declaration gets messed up with "::" 
    weapon_range: string;
    category_range: string;
    cost: Cost;
    damage: Damage;
    range: Rangex; // if "Range" is used there is a colission against reserved TS.. function or whatever it is. 
    weight: number;
    properties: Property;
    url: string;
    throw_range: ThrowRange;
    twoh_damage: twohDamage;
    special: string[];
    armor_category: string;
    armor_class: ArmorClass;
    str_minimum?: number;
    stealth_disadvantage?: boolean;
    gear_category: string;
    desc: string[];
    contents: Content;
    tool_category: string;
    vehicle_category: string;
    speed: Speed;
    capacity: string;

    // The constructor fills with default values (null) so that I can create function and loop through the variables
    constructor(){
        this.index=null;
        this.name=null;
        this.equipment_category=null;
        this.weapon_category=null;
        this.weapon_range=null;
        this.category_range=null;
        this.cost = new Cost;
        this.damage = new Damage;
        this.range = new Rangex;
        this.weight=null;
        this.properties = new Property;
        this.url=null;
        this.throw_range = new ThrowRange;
        this.twoh_damage = new twohDamage;
        this.special=[null];
        this.armor_category=null;
        this.armor_class = new ArmorClass;
        this.str_minimum=null;
        this.stealth_disadvantage=false;
        this.gear_category=null;
        this.desc=[null];
        this.contents = new Content;
        this.tool_category=null;
        this.vehicle_category=null;
        this.speed = new Speed;
        this.capacity=null;
    }

    //returns a list with all equipment categories
    static getEquipmentTypeList(){
        let equipmentCategoryList : string[];
        equipmentCategoryList = [];
            for (let i in Equipment.eqdbObj){
                equipmentCategoryList.push(Equipment.eqdbObj[i].equipment_category);
            }
        let unique_equipmentCategoryList = equipmentCategoryList.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        return unique_equipmentCategoryList;
    }

    //returns a list of all equpiment under a specified equpiment type, e.g "Weapon"
    static getEquipmentList(typeOfEquipment : string){
        let equipmentList : string[];
        equipmentList = [];
            for (let i in Equipment.eqdbObj){
                if (Equipment.eqdbObj[i].equipment_category==typeOfEquipment){
                    equipmentList.push(Equipment.eqdbObj[i].name);
                }
            }
        return equipmentList;
    }

    //creates an equipment item of a chosen equipment from equipment db, like "Backpack" or "Shortsword"

    getEquipment(item : string){

        let thisAttribute : string[] = []; //have to create this array to collect attributes from this Class. Can't use Object.Keys- function for this. 
        thisAttribute = Object.getOwnPropertyNames(this);

        for (let i in Equipment.eqdbObj){
            if(Equipment.eqdbObj[i].name==item){
                for (let k in Equipment.eqdbObj[i]){
                    if(thisAttribute.includes(k)){
                        this[k]= Equipment.eqdbObj[i][k]
                    }
                }
            }
        }
    }
}



/* Get list of equipment categories */
//console.log(Equipment.getEquipmentTypeList())

/* Get a list of Weapons */
//console.log(Equipment.getEquipmentList('Weapon'));

/* Create an item, eg a longsword */
// let newitem = new Equipment;
// newitem.getEquipment('Longsword');
// console.log(newitem)

/* Some code to test functions */
//console.log('test')

/******************************************************************************************************************************************************************************************************************

TODO

A function to create a particular item in Equipment from equipment-db
- Correct loop so that the item in Eqdbobj is the one that gets looped, giving it's properties to the created object. Now it's looping through all the attributes of the created equipment, even those that doesn't
  even exist on the item that is supposed to be created, e.g. "Shortsword" doesn't have the attribute "twoh_damage", because it isn't specified in the JSONdb. 

Sub-classes to Equipment, like Weapon, Adventure_Gear and so on. Would that be preferable? 

Some properties are not set correctly, mainly due to naming complications in .json and reserved functions in TS, like range.
- Weaponcategory is written like "weapon_category:" in the .json file. Would be better to just change it to "weapon_category". Make it replace it together with 2hand_damage.

*****************************************************************************************************************************************************************************************************************/