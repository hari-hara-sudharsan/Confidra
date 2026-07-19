import { PrismaService } from '../database/prisma.service';

export abstract class BaseRepository<T, CreateDto, UpdateDto> {
  constructor(protected readonly prisma: PrismaService, protected readonly modelName: string) {}

  async findAll(): Promise<T[]> {
    return (this.prisma as any)[this.modelName].findMany();
  }

  async findById(id: string): Promise<T | null> {
    return (this.prisma as any)[this.modelName].findUnique({ where: { id } });
  }

  async create(data: CreateDto): Promise<T> {
    return (this.prisma as any)[this.modelName].create({ data });
  }

  async update(id: string, data: UpdateDto): Promise<T> {
    return (this.prisma as any)[this.modelName].update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    // Soft delete implementation
    return (this.prisma as any)[this.modelName].update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
