import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BayeursService } from './bayeurs.service';
import { CreateBayeurDto } from './dto/create-bayeur.dto';
import { UpdateBayeurDto } from './dto/update-bayeur.dto';

@Controller('bayeurs')
export class BayeursController {
  constructor(private readonly bayeursService: BayeursService) {}

  @Post()
  create(@Body() createBayeurDto: CreateBayeurDto) {
    return this.bayeursService.create(createBayeurDto);
  }

  @Get()
  findAll() {
    return this.bayeursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bayeursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBayeurDto: UpdateBayeurDto) {
    return this.bayeursService.update(+id, updateBayeurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bayeursService.remove(+id);
  }
}
