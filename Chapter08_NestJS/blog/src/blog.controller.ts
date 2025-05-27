import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service'; // 블로그 서비스 임포트

@Controller('blog') // 클래스에 붙이는 Controller 데코레이터
export class BlogController {
  //   blogService: BlogService;

  //   constructor() {
  //     this.blogService = new BlogService(); // 생성자에서 블로그 서비스 생성
  //   }

  // BlogService 주입
  constructor(private blogService: BlogService) {}

  @Get() // Get 요청 처리
  getAllPosts() {
    console.log('모든 게시글 가져오기');
    return this.blogService.getAllPosts();
  }

  @Post() // Post 요청 처리
  createPost(@Body() postDto) {
    // HTTP 요청의 body 내용을 post에 할당
    console.log('게시글 작성');
    // console.log(post);
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id') // Get 방식에 URL 매개변수에 id가 있는 요청 처리
  async getPost(@Param('id') id: string) {
    console.log(`[id: ${id}]게시글 하나 가져오기`);
    const post = await this.blogService.getPost(id);
    console.log(post);
    return post;
  }

  @Delete('/:id') // Delete 방식에 URL 매개변수로 id가 있는 요청 처리
  deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.blogService.deletePost(id);
  }

  @Put('/:id') // Put 방식에 URL 매객변수로 전달된 id가 있는 요청 처리
  updatePost(@Param('id') id: string, @Body() postDto) {
    console.log(`[${id}] 게시글 업데이트`);
    // console.log(post);
    return this.blogService.updatePost(id, postDto);
  }
}
