import { PrismaClientExceptionFilter } from './entity.not.found.exception.filter';

describe('EntityNotFoundExceptionFilter', () => {
  it('should be defined', () => {
    expect(new PrismaClientExceptionFilter()).toBeDefined();
  });
});
