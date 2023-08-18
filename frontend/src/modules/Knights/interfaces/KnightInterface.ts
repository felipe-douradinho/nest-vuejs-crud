import type WeaponInterface from "./WeaponInterface";
import type AttributeInterface from "./AttributeInterface";

export default interface KnightInterface {
    _id: string;
    name: string;
    nickname: string;
    birthday: string;
    weapons: WeaponInterface[];
    attributes: AttributeInterface;
    keyAttribute: string;
    age: number;
    attack: number;
    exp: number;
    is_hero: boolean;
}
