import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }
  @Post()
  create(@Body() body: any) {
    return this.appService.create(body);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.appService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }
}
