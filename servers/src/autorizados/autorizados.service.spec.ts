import { Test, TestingModule } from '@nestjs/testing';
import { AutorizadosService } from './autorizados.service';

describe('AutorizadosService', () => {
  let service: AutorizadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutorizadosService],
    }).compile();

    service = module.get<AutorizadosService>(AutorizadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
