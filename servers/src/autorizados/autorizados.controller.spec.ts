import { Test, TestingModule } from '@nestjs/testing';
import { AutorizadosController } from './autorizados.controller';
import { AutorizadosService } from './autorizados.service';

describe('AutorizadosController', () => {
  let controller: AutorizadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutorizadosController],
      providers: [AutorizadosService],
    }).compile();

    controller = module.get<AutorizadosController>(AutorizadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
