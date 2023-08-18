import type { AttributesEnum } from "../enums/AttributesEnum";

export default interface WeaponInterface {
    _id: string;
    name: string;
    mod: number;
    attr: AttributesEnum;
    equipped: boolean;
}