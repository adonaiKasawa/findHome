import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProprieteDto } from './dto/create-propriete.dto';
import { UpdateProprieteDto } from './dto/update-propriete.dto';
import { modelsNom, proprieteType } from './enum/enum';

@Injectable()
export class ProprieteService {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(data: Prisma.proprieteUncheckedCreateInput) {
    return await this.prisma.propriete.create({data});
  }

  async findAll() {
    return await this.prisma.propriete.findMany({
      include:{
        bayeurs:true,
        models:true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.propriete.findUnique({
      where:{id},
      include:{
        bayeurs:true,
        models:true
      }
    });
  }
  async findByUser(bayeursId: number){
    return await this.prisma.propriete.findMany({
      where:{
        bayeursId
      },
      include:{
        bayeurs:true,
        models:true
      }
    })
  }
  async update(id: number, data: Prisma.proprieteUpdateInput,bayeurs: number) {
    try {
      return await this.prisma.propriete.updateMany({
        where: {
                id,
                bayeursId: bayeurs
              },
              data
    })
    } catch (error) {
      throw new Error(error);
      
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} propriete`;
  }
  // ------ Models ------
  async createModels(data: Prisma.modelsUncheckedCreateInput, bayeursId: number ) {
    const propriete = await this.prisma.propriete.findUnique({
      where:{
        id: data.proprieteId
      }
    })
    if(propriete.bayeursId !== bayeursId) throw new UnauthorizedException()
    switch (propriete.type) {
      case proprieteType.AP:
        data.nom = modelsNom.A
        break;
      case proprieteType.HT:
        data.nom = modelsNom.C
        break;  
      case proprieteType.PA:
        data.nom = modelsNom.P
        break;
      default:
        break;
    }
    try {
      const models =  await this.prisma.models.create({data})
      await this.prisma.evolutionPrix.create({ data: {prix: data.prix, modelsId: models.id }})
      return models
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error)
    }
  }

  // ------ Piece ------
  async createPiece(data: Prisma.pieceUncheckedCreateInput, bayeursId: number){
    const models = await this.prisma.models.findUnique({ where: { id: data.modelsId }})
    if (!models) throw new NotFoundException()
    const propriete = await this.prisma.propriete.findUnique({where: {id: models.proprieteId} })
    if (!propriete) throw new NotFoundException()
    if (propriete.bayeursId !== bayeursId) throw new NotFoundException()
    try {
      return await this.prisma.piece.create({data})
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  transformDataForCreate({ files, proprieteCreateInput, user }: { files: any[]; proprieteCreateInput: Prisma.proprieteUncheckedCreateInput; user: Prisma.bayeursUncheckedCreateWithoutProprieteInput; }): Prisma.proprieteUncheckedCreateInput {
    files?.map((file, index) => {
      if (index <= 1) {
        if (file.mimetype === "video/mp4") {
          proprieteCreateInput.video = file.filename
        }else if (file.mimetype === "image/jpeg") {
          proprieteCreateInput.photo = file.filename
        }
      }
    })
    proprieteCreateInput.bayeursId = user.id
    return proprieteCreateInput
  }

  getFile(files: any) {
    let video : string
    let photo : string
    files.map((file: { mimetype: string; filename: string; }, index: number) => {

      if (index <= 1) {
        if (file.mimetype === "video/mp4") {
          video = file.filename
        }else if (file.mimetype === "image/jpeg") {
          photo = file.filename
        }
      }
    })
    return {video, photo}
  }
}
