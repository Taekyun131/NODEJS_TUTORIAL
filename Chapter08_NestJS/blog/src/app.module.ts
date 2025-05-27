import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from './blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import uri from './Info';

@Module({
  imports: [
    // 몽고디비 연결 설정
    MongooseModule.forRoot(uri + '/blog'),
    // 몽고디비 스키마 설정
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  // 프로바이더 설정
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
