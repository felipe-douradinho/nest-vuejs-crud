import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Weapon } from "./weapon.schema";
import { Attribute } from "./attribute.schema";

export type KnightDocument = HydratedDocument<Knight>;

@Schema()
export class Knight {
    @Prop({ required: true, })
    name: string;

    @Prop({ required: true, })
    nickname: string;

    @Prop({ required: true, })
    birthday: Date;

    @Prop([Weapon])
    weapons: Weapon[];

    @Prop({ type: Attribute, required: true, })
    attributes: Attribute;

    @Prop({ required: true, })
    keyAttribute: string;

    @Prop({ default: 0, })
    age: number;

    @Prop({ default: 0, })
    attack: number;

    @Prop({ default: 0, })
    exp: number;

    @Prop({ default: false, })
    is_hero: boolean;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
