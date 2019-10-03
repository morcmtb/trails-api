import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { TrailsService } from './trails.service';
import { TrailDto, TrailCreateDto, TrailUpdateDto } from './dto/trails.dto';
import { Trail } from './schema/trails.schema';

@Controller('trails')
export class TrailsController {
  constructor(private trailsService: TrailsService) {}

  @Post('createTable')
  async createTable() {
    try {
      await this.trailsService.createTrailsTable();
    } catch (error) {
      console.error(error);
    }
  }

  @Delete('deleteTable')
  async deleteTable() {
    try {
      await this.trailsService.deleteTrailsTable();
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll() {
    const plants = await this.trailsService.getTrails();
    return plants;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const plant = await this.trailsService.getTrail(id);
    return plant;
  }

  @Post()
  async create(@Body() trailDto: TrailCreateDto) {
    const plant = await this.trailsService.createTrail(trailDto);
    return plant;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() trailDto: TrailUpdateDto) {
    const plant = await this.trailsService.updateTrail(trailDto);
    return plant;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const plants = await this.trailsService.deleteTrail(id);
    return plants;
  }
}
