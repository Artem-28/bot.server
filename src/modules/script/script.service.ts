import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Module

// Controller

// Service

// Entity
import { Script } from '@/modules/script/script.entity';

// Guard

// Types
import { UpdateScriptDto } from '@/modules/script/dto/update-script-dto';
import { Options } from '@/base/interfaces/service.interface';
import { CreateScriptDto } from '@/modules/script/dto/create-script.dto';

// Helper
import QueryBuilderHelper from '@/base/helpers/query-builder-helper';

@Injectable()
export class ScriptService {
  constructor(
    @InjectRepository(Script)
    private readonly _scriptRepository: Repository<Script>,
  ) {}

  // Удаление скрипта по id
  public async removeScript(id: number, options?: Options): Promise<boolean> {
    const response = await this._scriptRepository
      .createQueryBuilder()
      .delete()
      .from(Script)
      .where({ id })
      .execute();

    const success = !!response.affected;

    if (!success && options && options.throwException) {
      throw new HttpException('scriptUpdate.update', 500);
    }
    return success;
  }

  // Создание скрипта
  public async createScript(
    dto: CreateScriptDto,
    options?: Options,
  ): Promise<Script> {
    const response = await this._scriptRepository.save(dto);
    if (!response && options && options.throwException) {
      throw new HttpException('script.create', 500);
    }
    return new Script(response);
  }

  // Обновление скрипта
  public async updateScript(
    id: number,
    dto: UpdateScriptDto,
    options?: Options,
  ): Promise<boolean> {
    delete dto.projectId;
    const response = await this._scriptRepository
      .createQueryBuilder()
      .update()
      .set(dto)
      .where({ id })
      .execute();

    const success = !!response.affected;

    if (!success && options.throwException) {
      throw new HttpException('scriptUpdate.update', 500);
    }
    return success;
  }

  // Получение одного скрипта
  public async getOneScript(options: Options): Promise<Script> {
    const { filter, relation, throwException } = options;
    const queryHelper = new QueryBuilderHelper(this._scriptRepository, {
      filter,
      relation,
    });
    const response = await queryHelper.builder.getOne();
    if (!response && throwException) {
      throw new HttpException('script.get', 500);
    }
    if (!response) return null;
    return response;
  }
}
