import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { PostDto } from './dto/post.dto';

@Controller('blog')
@UseGuards(RolesGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  async getAllPosts() {
    return this.blogService.getAllPosts();
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  async getPostById(@Param('id') id: string) {
    return this.blogService.getPostById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  async createPost(@Body() createPostDto: PostDto) {
    return this.blogService.createPost(createPostDto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updatePostById(
    @Param('id') id: string,
    @Body() updatePostDto: PostDto,
  ) {
    return this.blogService.updatePostById(id, updatePostDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deletePostById(@Param('id') id: string) {
    return this.blogService.deletePostById(id);
  }
}
