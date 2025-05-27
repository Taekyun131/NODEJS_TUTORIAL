// 블로그의 영속성 계층 코드

// import { readFile, writeFile } from 'fs/promises';
// import { PostDto } from './blog.model';

// 의존성 주입 설정
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PostDto } from './blog.model';

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
  //   getAllPost(): Promise<PostDto[]>;
  //   createPost(postDto: PostDto);
  //   getPost(id: String): Promise<PostDto>;
  //   deletePost(id: String);
  //   updatePost(id: String, postDto: PostDto);
}

// BlogRepository를 구현한 클래스. 파일 읽고 쓰기

export class BlogFileRepository implements BlogRepository {
  //   FILE_NAME = './src/blog.data.json';
  //   // 파일을 읽어서 모든 게시글 불러오기
  //   async getAllPost(): Promise<PostDto[]> {
  //     const datas = await readFile(this.FILE_NAME, 'utf-8');
  //     const posts = JSON.parse(datas);
  //     return posts;
}
@Injectable()
// 몽고디비용 리포지토리
export class BlogMongoRepository implements BlogRepository {
  // Model<BlogDocument>타입인 blogModel 주입
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  // 모든 게시글 읽어오는 함수
  async getAllPost(): Promise<Blog[]> {
    return await this.blogModel.find().exec();
  }

  // 게시글 쓰기
  //   async createPost(postDto: PostDto) {
  //     const posts = await this.getAllPost();
  //     const id = posts.length + 1;
  //     const createPost = { ...postDto, id: id.toString(), createdDt: new Date() };
  //     posts.push(createPost);
  //     await writeFile(this.FILE_NAME, JSON.stringify(posts));
  //   }
  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      ceatedDt: new Date(),
      updatedDt: new Date(),
    };
    this.blogModel.create(createPost);
  }

  // 게시글 하나 가져오기
  //   async getPost(id: string): Promise<PostDto> {
  //     const posts = await this.getAllPost();
  //     const result = posts.find((post) => post.id === id);
  //     if (!result) {
  //       throw new Error('Post not found');
  //     }
  //     return result;
  //   }
  async getPost(id: string): Promise<PostDto> {
    const result = await this.blogModel.findById(id);
    if (!result) {
      throw new Error('Post not found');
    }
    return result;
  }

  // 게시글 하나 삭제
  //   async deletePost(id: string) {
  //     const posts = await this.getAllPost();
  //     const filteredPosts = posts.filter((post) => post.id !== id);
  //     await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
  //   }
  async deletePost(id: string) {
    await this.blogModel.findByIdAndDelete(id);
  }

  // 게시글 하나 수정하기
  //   async updatePost(id: string, postDto: PostDto) {
  //     const posts = await this.getAllPost();
  //     const index = posts.findIndex((post) => post.id === id);
  //     const updatePost = { ...postDto, id, updatedDt: new Date() };
  //     posts[index] = updatePost;
  //     await writeFile(this.FILE_NAME, JSON.stringify(posts));
  //   }
  async updatePost(id: string, postDto: PostDto) {
    const updatePost = { ...postDto, id, updatedDt: new Date() };
    await this.blogModel.findByIdAndUpdate(id, updatePost);
  }
}
