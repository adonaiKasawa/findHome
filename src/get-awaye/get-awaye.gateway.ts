import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GetAwayeService } from './get-awaye.service';
import { CreateGetAwayeDto } from './dto/create-get-awaye.dto';
import { UpdateGetAwayeDto } from './dto/update-get-awaye.dto';

@WebSocketGateway()
export class GetAwayeGateway {
  constructor(private readonly getAwayeService: GetAwayeService) {}

  @SubscribeMessage('createGetAwaye')
  create(@MessageBody() createGetAwayeDto: CreateGetAwayeDto) {
    return this.getAwayeService.create(createGetAwayeDto);
  }

  @SubscribeMessage('findAllGetAwaye')
  findAll() {
    return this.getAwayeService.findAll();
  }

  @SubscribeMessage('findOneGetAwaye')
  findOne(@MessageBody() id: number) {
    return this.getAwayeService.findOne(id);
  }

  @SubscribeMessage('updateGetAwaye')
  update(@MessageBody() updateGetAwayeDto: UpdateGetAwayeDto) {
    return this.getAwayeService.update(updateGetAwayeDto.id, updateGetAwayeDto);
  }

  @SubscribeMessage('removeGetAwaye')
  remove(@MessageBody() id: number) {
    return this.getAwayeService.remove(id);
  }
}
