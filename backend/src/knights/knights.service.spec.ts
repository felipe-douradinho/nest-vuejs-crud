import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KnightsService } from './knights.service';
import { Knight } from './schemas/knight.schema';
import { CreateKnightDto } from './dto/create-knight.dto';
import ListKnightsQueryDto from "./dto/list-knights-queries.dto";
import {NotFoundException} from "@nestjs/common";
import {UpdateKnightDto} from "./dto/update-knight.dto";

describe('KnightsService', () => {
  let service: KnightsService;
  let knightModel: Model<Knight>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsService,
        {
          provide: getModelToken('Knight'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<KnightsService>(KnightsService);
    knightModel = module.get<Model<Knight>>(getModelToken('Knight'));
  });

  describe('create', () => {
    it('should create a knight', async () => {
      const createKnightDto: CreateKnightDto = {
        name: 'Name',
        nickname: 'Nick',
        birthday: new Date(),
        weapons: [],
        attributes: {
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        keyAttribute: '',
        age: 35,
        attack: 1,
        exp: 2,
        is_hero: false,
      };
      const createdKnight: Knight = { ...createKnightDto };

      // Mock the behavior of the model's 'create' method
      (knightModel.create as jest.Mock).mockReturnValue(createdKnight);

      const result = await service.create(createKnightDto);

      expect(result).toEqual(createdKnight);
      expect(knightModel.create).toHaveBeenCalledWith(createKnightDto);
    });
  });

  describe('findAll', () => {
    it('should find all knights', async () => {
      const expectedResult: Knight[] = [{
        name: 'Name',
        nickname: 'Nick',
        birthday: new Date(),
        weapons: [],
        attributes: {
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        keyAttribute: '',
        age: 35,
        attack: 1,
        exp: 2,
        is_hero: false,
      }];
      (knightModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(expectedResult) });

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(knightModel.find).toHaveBeenCalledWith({});
    });

    it('should find knights with filters', async () => {
      const queryParams: ListKnightsQueryDto = { /* provide necessary properties */ };
      const expectedResult: Knight[] = [{
        name: 'Name',
        nickname: 'Nick',
        birthday: new Date(),
        weapons: [],
        attributes: {
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        keyAttribute: '',
        age: 35,
        attack: 1,
        exp: 2,
        is_hero: false,
      }];
      (knightModel.find as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(expectedResult) });

      const result = await service.findAll(queryParams);

      expect(result).toEqual(expectedResult);
      expect(knightModel.find).toHaveBeenCalledWith(queryParams);
    });
  });

  describe('findOne', () => {
    it('should find a knight by ID', async () => {
      const knightId = 'some-id';
      const foundKnight: Knight = {
        name: 'Name',
        nickname: 'Nick',
        birthday: new Date(),
        weapons: [],
        attributes: {
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        keyAttribute: '',
        age: 35,
        attack: 1,
        exp: 2,
        is_hero: false,
      };

      (knightModel.findById as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(foundKnight) });

      const result = await service.findOne(knightId);

      expect(result).toEqual(foundKnight);
      expect(knightModel.findById).toHaveBeenCalledWith(knightId);
    });

    it('should throw NotFoundException for non-existing knight', async () => {
      const knightId = 'non-existing-id';
      (knightModel.findById as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(service.findOne(knightId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a knight by ID', async () => {
      const knightId = 'some-id';
      const updateKnightDto: UpdateKnightDto = {
        name: 'Name',
        nickname: 'Nick',
        birthday: new Date(),
        weapons: [],
        attributes: {
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        keyAttribute: '',
        age: 35,
        attack: 1,
        exp: 2,
        is_hero: false,
      };

      const updatedKnight: Knight = { ...updateKnightDto };
      (knightModel.findByIdAndUpdate as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(updatedKnight) });

      const result = await service.update(knightId, updateKnightDto);

      expect(result).toEqual(updatedKnight);
      expect(knightModel.findByIdAndUpdate).toHaveBeenCalledWith(knightId, updateKnightDto, { new: true });
    });

    it('should throw NotFoundException for non-existing knight', async () => {
      const knightId = 'non-existing-id';
      const updateKnightDto: UpdateKnightDto = {
        name: 'Name',
        nickname: 'Nick',
        birthday: new Date(),
        weapons: [],
        attributes: {
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        keyAttribute: '',
        age: 35,
        attack: 1,
        exp: 2,
        is_hero: false,
      };
      (knightModel.findByIdAndUpdate as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(service.update(knightId, updateKnightDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a knight by ID', async () => {
      const knightId = 'some-id';
      const updateKnightDto: UpdateKnightDto = {
        name: 'Name',
        nickname: 'Nick',
        birthday: new Date(),
        weapons: [],
        attributes: {
          strength: 1,
          dexterity: 1,
          constitution: 1,
          intelligence: 1,
          wisdom: 1,
          charisma: 1,
        },
        keyAttribute: '',
        age: 35,
        attack: 1,
        exp: 2,
        is_hero: false,
      };

      const updatedKnight: Knight = { ...updateKnightDto };
      (knightModel.findByIdAndUpdate as jest.Mock).mockReturnValue({ exec: jest.fn().mockResolvedValue(updatedKnight) });

      const result = await service.update(knightId, updateKnightDto);

      expect(result).toEqual(updatedKnight);
    });
  });

});
