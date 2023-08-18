import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttributeDocument = HydratedDocument<Attribute>;

@Schema()
export class Attribute {
    @Prop({ required: true, })
    strength: number;

    @Prop({ required: true, })
    dexterity: number;

    @Prop({ required: true, })
    constitution: number;

    @Prop({ required: true, })
    intelligence: number;

    @Prop({ required: true, })
    wisdom: number;

    @Prop({ required: true, })
    charisma: number;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);