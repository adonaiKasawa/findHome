import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { ProprieteService } from './propriete.service';
import { CreateProprieteDto } from './dto/create-propriete.dto';
import { UpdateProprieteDto } from './dto/update-propriete.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { User } from 'src/auth/user/user.decorators';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer'
import Path = require('path');
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateModelsDto, CreatePieceDto } from './dto/create-models.dto';

const storage = {
  storage : diskStorage({
      destination: 'src/uploads/propriete',
      filename: (req, file, cb) =>{
          const filename: string = 'findHome-' + randomUUID();
          const extension: string = Path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`)
      }
  })
}

@ApiTags("propriete")
@Controller('propriete')
export class ProprieteController {
  constructor(private readonly proprieteService: ProprieteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files',2, storage))
  create(
    @User() user: Prisma.bayeursUncheckedCreateWithoutProprieteInput,
    @Body() proprieteCreateInput: CreateProprieteDto,
    @UploadedFiles() files:any
  ): any {
    // console.log("files", files);
    // console.log("proprieteCreateInput", proprieteCreateInput);
    
    const transformDataForCreate = this.proprieteService.transformDataForCreate({files,proprieteCreateInput,user})
    return this.proprieteService.create(transformDataForCreate);
  }

  @Get()
  async findAll() {
    return await this.proprieteService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/findByUser')
  async findByUser(
    @User() user: Prisma.bayeursUncheckedCreateWithoutProprieteInput
  ){
    return await this.proprieteService.findByUser(user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proprieteService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProprieteDto: UpdateProprieteDto,
    @User() user: Prisma.bayeursUncheckedCreateWithoutProprieteInput ) {
    return this.proprieteService.update(+id, updateProprieteDto,user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proprieteService.remove(+id);
  }

  // ------- Models -----
    // create
  @UseGuards(JwtAuthGuard)
  @Post("create/models")
  @UseInterceptors(FilesInterceptor("files",2,storage))
  createModels(
    @Body() modelsCreateInput: CreateModelsDto,
    @User() user: Prisma.bayeursUncheckedCreateWithoutProprieteInput,
    @UploadedFiles() files:any
  ){
    modelsCreateInput.nombrePiece = +modelsCreateInput.nombrePiece
    modelsCreateInput.prix = +modelsCreateInput.prix
    modelsCreateInput.proprieteId = +modelsCreateInput.proprieteId
    const getFile = this.proprieteService.getFile(files)
    modelsCreateInput.video = getFile.video
    modelsCreateInput.photo = getFile.photo
    return this.proprieteService.createModels(modelsCreateInput,user.id)

  }
    // read
    // update
    // delete

  // ------ Piece -----
  @UseGuards(JwtAuthGuard)
  @Post("create/piece")
  @UseInterceptors(FileInterceptor("files",storage))
  createPiece(
    @Body() createPieceDto: CreatePieceDto,
    @User() user: Prisma.bayeursUncheckedCreateWithoutProprieteInput,
    @UploadedFile() file:any
  ){
    createPieceDto.photo = file.filename
    createPieceDto.modelsId = +createPieceDto.modelsId
    return this.proprieteService.createPiece(createPieceDto,user.id)
  }

}


