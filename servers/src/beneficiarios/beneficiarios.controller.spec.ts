import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiariosController } from './beneficiarios.controller';
import { BeneficiariosService } from './beneficiarios.service';

describe('BeneficiariosController', () => {
  let controller: BeneficiariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeneficiariosController],
      providers: [BeneficiariosService],
    }).compile();

    controller = module.get<BeneficiariosController>(BeneficiariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
