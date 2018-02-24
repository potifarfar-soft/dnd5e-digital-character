
declare function require(name:string);
//let eqdb: string = JSON.stringify(require("./5e-SRD-Equipment.json"));
//let eqdbObj = JSON.parse(eqdb);

class Cost {
    quantity: number;
    unit: string;
    constructor(){
        this.quantity=-1;
        this.unit='undef'
    }
}

class DamageType {
    url: string;
    name: string;
    constructor(){
        this.url='undef';
        this.name='undef';
    }
}

class Damage {
    dice_count: number;
    dice_value: number;
    damage_type: DamageType;
    constructor(){
        this.dice_count=-1;
        this.dice_value=-1;
        this.damage_type = new DamageType;
    }
}

class Rangex {
    normal: number;
    long?: any;
    constructor(){
        this.normal=-1;
        this.long=-1;
    }
}

class Property { //changed from property to propertyx
    url: string;
    name: string;
    constructor(){
        this.url='undef';
        this.name='undef';
    }
}

class ThrowRange {
    normal: number;
    long: number;
    constructor(){
        this.normal=-1;
        this.long=-1;
    }
}

class twohDamage { //original line "2hDamage" but had to change it due to naming restrictions, leading number
    dice_count: number;
    dice_value: number;
    damage_type: DamageType; //original variable type was blank, inserted "DamageType"
    constructor(){
        this.dice_value=-1;
        this.dice_value=-1;
        this.damage_type = new DamageType;
    }
}

class ArmorClass {
    base: number;
    dex_bonus: boolean;
    max_bonus?: number;
    constructor(){
        this.base=-1;
        this.dex_bonus=false;
        this.max_bonus=-1;
    }
}

class Content {
    item_url: string;
    quantity: number;
    constructor(){
        this.item_url='undef';
        this.quantity=-1;
    }
}

class Speed {
    quantity: number;
    unit: string;
    constructor(){
        this.quantity=-1;
        this.unit='undef'
    }
}

class Equipment {
    static eqdbObj = JSON.parse(JSON.stringify(require("./5e-SRD-Equipment.json")));
    index: number;
    name: string;
    equipment_category: string;
    weapon_category: string; // original line was "weapon_category::" , json element is written like "weapon_category:" (notice trailing ":"). Typescript uses : to define var type, hence :: which ts doesn't allow.
    weapon_range: string;
    category_range: string;
    cost: Cost;
    damage: Damage;
    range: Rangex; // i don't remember why i changed it to Rangex instad of Range. There was some kind of colission with another.. function, variable or something.
    weight: number;
    properties: Property; //changed property to propertyx
    url: string;
    throw_range: ThrowRange;
    twoh_damage: twohDamage; //original line was "2h_damage: 2hDamage;", but had to change it due to naming restrictions, leading number
    special: string[];
    armor_category: string;
    armor_class: ArmorClass;
    str_minimum?: number;
    stealth_disadvantage?: boolean;
    gear_category: string;
    desc: string[];
    contents: Content; //changed from Content to Contentx
    tool_category: string;
    vehicle_category: string;
    speed: Speed;
    capacity: string;

    // The constructor fills with default values so that I can create function and loop through the variables
    constructor(){
        this.index=-1;
        this.name='undef';
        this.equipment_category='undef';
        this.weapon_category='undef';
        this.weapon_range='undef';
        this.category_range='undef';
        this.cost = new Cost;
        this.damage = new Damage;
        this.range = new Rangex;
        this.weight=-1;
        this.properties = new Property;
        this.url='undef';
        this.throw_range = new ThrowRange;
        this.twoh_damage = new twohDamage;
        this.special=['undef'];
        this.armor_category='undef';
        this.armor_class = new ArmorClass;
        this.str_minimum=-1;
        this.stealth_disadvantage=false;
        this.gear_category='undef';
        this.desc=['undef'];
        this.contents = new Content;
        this.tool_category='undef';
        this.vehicle_category='undef';
        this.speed = new Speed;
        this.capacity='undef';
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
    getEquipment(item){
        for (let i in Equipment.eqdbObj){
            if(Equipment.eqdbObj[i].name==item){
                this.index=Equipment.eqdbObj[i].index;
                this.name=Equipment.eqdbObj[i].name;
                this.equipment_category=Equipment.eqdbObj[i].equipment_category;
                this.weapon_category=Equipment.eqdbObj[i].weapon_category;
                this.weapon_range=Equipment.eqdbObj[i].weapon_range;
                this.category_range=Equipment.eqdbObj[i].category_range;
                this.cost.quantity = Equipment.eqdbObj[i].cost.quantity;
                this.cost.unit = Equipment.eqdbObj[i].cost.unit;
                this.damage.damage_type = Equipment.eqdbObj[i].damage.damage_type;
                this.damage.dice_count = Equipment.eqdbObj[i].damage.dice_count;
                this.damage.dice_value = Equipment.eqdbObj[i].damage.dice_value;
                this.range.long = Equipment.eqdbObj[i].range.long;
                this.range.normal = Equipment.eqdbObj[i].range.normal;
                this.weight=Equipment.eqdbObj[i].weight;
                this.properties = new Property;
                this.properties.name = Equipment.eqdbObj[i].properties.name;
                this.properties.url = Equipment.eqdbObj[i].properties.url;
                this.url=Equipment.eqdbObj[i].url;
                this.throw_range = new ThrowRange;
                this.throw_range.long = Equipment.eqdbObj[i].throw_range.long;
                this.throw_range.normal = Equipment.eqdbObj[i].throw_range.normal;
                this.twoh_damage = new twohDamage;
                //this.twoh_damage.damage_type = Equipment.eqdbObj[i].['2h_Damage'].damage_type;
                //this.twoh_damage.dice_count = Equipment.eqdbObj[i].['2h_damage'].dice_count;
                //this.twoh_damage.dice_count = Equipment.eqdbObj[i].twoh_damage.dice_count;
                //this.twoh_damage.dice_value = Equipment.eqdbObj[i].twoh_damage.dice_value;
                this.special=[Equipment.eqdbObj[i].special];
                this.armor_category=Equipment.eqdbObj[i].armor_category;
                this.armor_class = new ArmorClass;
                this.armor_class.base = Equipment.eqdbObj[i].armor_class.base;
                this.armor_class.dex_bonus = Equipment.eqdbObj[i].armor_class.dex_bonus;
                this.armor_class.max_bonus = Equipment.eqdbObj[i].armor.class.max_bonus;
                this.str_minimum=-1;
                this.stealth_disadvantage=Equipment.eqdbObj[i].stealth_disadvantage;
                this.gear_category=Equipment.eqdbObj[i].gear_category;
                this.desc=[Equipment.eqdbObj[i].name];
                this.contents = new Content;
                this.tool_category=Equipment.eqdbObj[i].tool_category;
                this.vehicle_category=Equipment.eqdbObj[i].vehicle_category;
                this.speed = new Speed;
                this.capacity=Equipment.eqdbObj[i].capacity;
            }
        }
        return new Equipment()
    }
}

/* 

TODO

A function to create a particular item in Equipment from equipment-db
encountered problems: In the .json-db there are keys that starts with a number, e.g '2h_damage'. I havn't found a way to handle them in typescript. Right now I'm trying to rename the keys, but without any success... 

Sub-classes to Equipment, like Weapon, Adventure_Gear and so on. Would that be preferable? 

*/

