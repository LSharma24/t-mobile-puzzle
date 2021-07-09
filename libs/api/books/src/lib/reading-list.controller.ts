import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';

@Controller()
export class ReadingListController {
  constructor(private readonly readingList: ReadingListService) {}

  @Get('/reading-list/')
  async getReadingList() {
    return await this.readingList.getList();
  }

  @Post('/reading-list/')
  async addToReadingList(@Body() item: Book) {
    return await this.readingList.addBook(item);
  }

  @Delete('/reading-list/:id')
  async removeFromReadingList(@Param() params) {
    return await this.readingList.removeBook(params.id);
  }

  @Put('/reading-list/:id/finished')
  async markBookAsFinished(@Param() params: { id: string }, @Body() payload: { finishedDate: string }): Promise<void> {
    return await this.readingList.markBookFinished(params.id, payload.finishedDate);
  }
}
