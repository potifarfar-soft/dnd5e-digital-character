
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

class Property {
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

class twohDamage {
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
    static eqdbObj = JSON.parse(JSON.stringify(require("./5e-SRD-Equipment.json")).replace(/2h_damage/gi, 'twoh_damage')); //raplaced "2hDamage" to 'twoh_damage' due to naming restrictions when creating classes (leading number)
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

    getEquipment(item : string){

        let thisAttribute : string[] = []; //have to create this array to collect attributes from this Class. Can't use Object.Keys- function for this. 
        thisAttribute = Object.getOwnPropertyNames(this);

        for (let i in Equipment.eqdbObj){
            if(Equipment.eqdbObj[i].name==item){
                for (let k in Equipment.eqdbObj[i]){
                    for (let z in thisAttribute){
                        let q = thisAttribute[z];
                        if (k == thisAttribute[z]){ //should be possible to make this more efficienct by adding a switch and a break like in the z for loop, but it works like it is
                            this[q] = Equipment.eqdbObj[i][k];
                            break;
                        }
                    }
                }
            }
        }
    return new Equipment()
    }
}

/* Some code to test functions */


/* Get a list of Weapons */
//console.log(Equipment.getEquipmentList('Weapon'));

/* Create an item, eg a longsword */
//let newitem = new Equipment;
//newitem.getEquipment('Longsword');
//console.log(newitem)





/* 

TODO

A function to create a particular item in Equipment from equipment-db
- Correct loop so that the item in Eqdbobj is the one that gets looped, giving it's properties to the created object. Now it's looping through all the attributes of the created equipment, even those that doesn't
  even exist on the item that is supposed to be created, e.g. "Shortsword" doesn't have the attribute "twoh_damage", because it isn't specified in the JSONdb. 

Sub-classes to Equipment, like Weapon, Adventure_Gear and so on. Would that be preferable? 



*/

/*

getEquipmentTemp(item : string){

        let thisAttribute = []; //have to create this array to collect attributes from this Class. Can't use Object.Keys- function for this. 
        thisAttribute = Object.getOwnPropertyNames(this);

        for (let i in Equipment.eqdbObj){
            if(Equipment.eqdbObj[i].name==item){
                let n=0;
                let index : string[] = [];

                for (let k in Equipment.eqdbObj[i]){
                    
                    //console.log(Object.keys(Equipment.eqdbObj[i])[n]);
                    //console.log(Equipment.eqdbObj[i][k]);

                    for (let z in thisAttribute){
                        //console.log(Object.keys(Equipment.eqdbObj[i])[k])
                        console.log(thisAttribute[z]);
                        console.log(k);
                        //console.log(z);
                        //console.log(this[z])
                        console.log(Equipment.eqdbObj[i][k])
                        console.log()

                        if (Object.keys(Equipment.eqdbObj[i])[n] == thisAttribute[z]){
                            //console.log(z);
                            //console.log(this[z])
                            this[z] = Equipment.eqdbObj[i][n];
                            break;
                        }

                        if (k == z){
                            //console.log(z);
                            //console.log(this[z])
                            this[z] = Equipment.eqdbObj[i][k];
                            break;
                        }
                    }
                //n=n+1;
                }
            }
        }
    return new Equipment()
    }

*/