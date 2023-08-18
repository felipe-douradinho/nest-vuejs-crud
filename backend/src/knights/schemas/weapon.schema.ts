import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WeaponDocument = HydratedDocument<Weapon>;

@Schema()
export class Weapon {
    @Prop({ required: true, })
    name: string;

    @Prop({ required: true, })
    mod: number;

    @Prop({ required: true, })
    attr: string;

    @Prop({ required: true, })
    equipped: boolean;
}

export const WeaponSchema = SchemaFactory.createForClass(Weapon);