import { PostDto } from './blog.model'; // 게시글의 타입 정보 임포트
// import { BlogFileRepository, BlogRepository } from './blog.repository';

import { Injectable } from '@nestjs/common';
// import { BlogFileRepository } from './blog.repository';
import { BlogMongoRepository } from './blog.repository';
@Injectable()
export class BlogService {
  //   //   posts: any[] = []; // 게시글 배열 선언
  //   blogRepository: BlogRepository;

  //   constructor() {
  //     // 객체 생성
  //     this.blogRepository = new BlogFileRepository();
  //   }

  // 생성자를 통한 의존성 주입
  constructor(private blogRepository: BlogMongoRepository) {}

  // 모든 게시글 가져오기
  async getAllPosts() {
    // return this.posts;
    return await this.blogRepository.getAllPost();
  }

  // 게시글 작성
  createPost(postDto: PostDto) {
    // const id = this.posts.length + 1;
    // this.posts.push({ ...postDto, id: id.toString(), createdDt: new Date() });
    this.blogRepository.createPost(postDto);
  }

  // 게시글 한 개 가져오기
  async getPost(id): Promise<PostDto> {
    // const post = this.posts.find((post) => {
    //   return post.id === id;
    // });
    // console.log(post);
    // return post;
    return await this.blogRepository.getPost(id);
  }

  // 게시글 삭제
  async deletePost(id) {
    // const filteredPosts = this.posts.filter((post) => post.id !== id);
    // this.posts = [...filteredPosts];
    this.blogRepository.deletePost(id);
  }

  // 게시글 업데이트
  async updatePost(id, postDto: PostDto) {
    // let updateIndex = this.posts.findIndex((post) => post.id === id);
    // const updatePost = { ...postDto, id, updatedDt: new Date() };
    // this.posts[updateIndex] = updatePost;
    // return updatePost;
    this.blogRepository.updatePost(id, postDto);
  }
}
