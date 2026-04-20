import { Test, TestingModule } from '@nestjs/testing';
import { AutentificacionService } from './autentificacion.service';

describe('AutentificacionService', () => {
  let service: AutentificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutentificacionService],
    }).compile();

    service = module.get<AutentificacionService>(AutentificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
