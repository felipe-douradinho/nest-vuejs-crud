import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import ListKnightsQueriesDto from "./dto/list-knights-queries.dto";

@Controller('api/knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post()
  create(@Body() createKnightDto: CreateKnightDto) {
    return this.knightsService.create(createKnightDto);
  }

  @Get()
  async findAll(@Query(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
  })) queryParams: ListKnightsQueriesDto) {
    if (queryParams.is_hero === undefined) {
      queryParams.is_hero = false;
    }

    return this.knightsService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knightsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKnightDto: UpdateKnightDto) {
    return this.knightsService.update(id, updateKnightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knightsService.remove(id);
  }
}
