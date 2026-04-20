import { Test, TestingModule } from '@nestjs/testing';
import { AutentificacionController } from './autentificacion.controller';

describe('AutentificacionController', () => {
  let controller: AutentificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutentificacionController],
    }).compile();

    controller = module.get<AutentificacionController>(AutentificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
