import { PartialType } from '@nestjs/mapped-types';
import { CreateKnightDto } from './create-knight.dto';
import {Weapon} from "../schemas/weapon.schema";
import {Attribute} from "../schemas/attribute.schema";

export class UpdateKnightDto extends PartialType(CreateKnightDto) {
    name: string
    nickname: string
    birthday: Date
    weapons: Weapon[]
    attributes: Attribute;
    keyAttribute: string
    age: number
    attack: number
    exp: number
    is_hero: boolean
}
