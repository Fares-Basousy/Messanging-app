import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  create(messageDto: MessageDto) {
    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all messages`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
