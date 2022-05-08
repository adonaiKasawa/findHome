import { Injectable } from '@nestjs/common';
import { CreateGetAwayeDto } from './dto/create-get-awaye.dto';
import { UpdateGetAwayeDto } from './dto/update-get-awaye.dto';

@Injectable()
export class GetAwayeService {
  create(createGetAwayeDto: CreateGetAwayeDto) {
    return 'This action adds a new getAwaye';
  }

  findAll() {
    return `This action returns all getAwaye`;
  }

  findOne(id: number) {
    return `This action returns a #${id} getAwaye`;
  }

  update(id: number, updateGetAwayeDto: UpdateGetAwayeDto) {
    return `This action updates a #${id} getAwaye`;
  }

  remove(id: number) {
    return `This action removes a #${id} getAwaye`;
  }
}
