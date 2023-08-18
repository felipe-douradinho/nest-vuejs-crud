import { Test, TestingModule } from '@nestjs/testing';
import { KnightsController } from './knights.controller';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from "./dto/create-knight.dto";
import { Knight } from "./schemas/knight.schema";
import { getModelToken } from "@nestjs/mongoose";
import ListKnightsQueriesDto from "./dto/list-knights-queries.dto";

describe('KnightsController', () => {
  let controller: KnightsController;
  let knightsService: KnightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnightsController],
      providers: [
        KnightsService,
        {
          provide: getModelToken('Knight'), // Adjust this token based on your setup
          useValue: {}, // You can provide a mock or a real mongoose model here
        },
      ],
    }).compile();

    controller = module.get<KnightsController>(KnightsController);
    knightsService = module.get<KnightsService>(KnightsService);
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
      const expectedResult = { _id: 'some-id', ...createKnightDto };

      jest.spyOn(knightsService, 'create').mockResolvedValue(
          expectedResult
      );

      const result : Knight = await controller.create(createKnightDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should find all knights', async () => {
      const queryParams: ListKnightsQueriesDto = {
        is_hero: false,
      };
      const expectedResult = [
        {
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
        }
      ];

      jest.spyOn(knightsService, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(queryParams);

      expect(result).toEqual(expectedResult);
    });
  });

  // Other tests...

});
