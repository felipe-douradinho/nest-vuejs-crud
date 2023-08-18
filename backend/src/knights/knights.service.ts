import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { Knight } from './schemas/knight.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import ListKnightsQueryDto from "./dto/list-knights-queries.dto";

@Injectable()
export class KnightsService {
  constructor(@InjectModel(Knight.name) private knightModel: Model<Knight>) {}

  async create(createKnightDto: CreateKnightDto): Promise<Knight> {
    createKnightDto.age = this.getKnightAge(createKnightDto);
    createKnightDto.attack = this.getKnightAttack(createKnightDto);
    createKnightDto.exp = this.getKnightExperience(createKnightDto);

    return await this.knightModel.create(createKnightDto);
  }

  async findAll(filters: ListKnightsQueryDto = {}): Promise<Knight[]> {
    return await this.knightModel.find(filters).exec()
  }

  async findOne(id: string): Promise<Knight> {
    const knight = await this.knightModel.findById(id).exec();

    if (!knight) {
      throw new NotFoundException(`Knight with ID ${id} not found`);
    }

    return knight;
  }

  async update(id: string, updateKnightDto: UpdateKnightDto): Promise<Knight> {
    const updatedKnight = await this.knightModel.findByIdAndUpdate(
        id,
        updateKnightDto,
        { new: true },
    ).exec();

    if (!updatedKnight) {
      throw new NotFoundException(`Knight with ID ${id} not found`);
    }

    updatedKnight.attack = this.getKnightAttack(updatedKnight)
    updatedKnight.exp = this.getKnightExperience(updatedKnight)

    return updatedKnight;
  }

  async remove(id: string): Promise<Knight> {
    return await this.update(id, {
        is_hero: true,
    } as unknown as UpdateKnightDto)
  }

  private getKnightAttack(knight: Knight) {
    const keyAttrMod = parseInt(knight.attributes[knight.keyAttribute]);
    const equippedWeaponMod = knight.weapons.filter(weapon => weapon.equipped)[0]?.mod || 0;
    let attackMod = 0;

    if (keyAttrMod >= 0 && keyAttrMod <= 8) {
      attackMod = -2;
    } else if (keyAttrMod >= 9 && keyAttrMod <= 10) {
      attackMod = -1;
    } else if (keyAttrMod >= 11 && keyAttrMod <= 12) {
      attackMod = 0;
    } else if (keyAttrMod >= 13 && keyAttrMod <= 15) {
      attackMod = 1;
    } else if (keyAttrMod >= 16 && keyAttrMod <= 18) {
      attackMod = 2;
    } else if (keyAttrMod >= 19 && keyAttrMod <= 20) {
      attackMod = 3;
    }

    return 10 + attackMod + equippedWeaponMod;
  }

  private getKnightExperience(knight: Knight): number {
    if (knight.age < 7) {
      return 0;
    }

    return Math.floor((knight.age - 7) * Math.pow(22, 1.45))
  }

  private getKnightAge(knight: Knight): number {
    const birthDate = new Date(knight.birthday);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed = (
        currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())
    );

    return isBirthdayPassed ? yearsDiff : yearsDiff - 1;
  }
}
