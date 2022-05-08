import { Injectable } from '@nestjs/common';
import { CreateBayeurDto } from './dto/create-bayeur.dto';
import { UpdateBayeurDto } from './dto/update-bayeur.dto';

@Injectable()
export class BayeursService {
  
  create(createBayeurDto: CreateBayeurDto) {
    return 'This action adds a new bayeur';
  }

  findAll() {
    return `This action returns all bayeurs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bayeur`;
  }

  update(id: number, updateBayeurDto: UpdateBayeurDto) {
    return `This action updates a #${id} bayeur`;
  }

  remove(id: number) {
    return `This action removes a #${id} bayeur`;
  }
}
