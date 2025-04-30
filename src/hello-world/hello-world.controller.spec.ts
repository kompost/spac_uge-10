import { Test, TestingModule } from '@nestjs/testing';
import { HelloWorldController } from './hello-world.controller';
import { HelloWorldService } from './hello-world.service';

describe('HelloWorldController', () => {
    let controller: HelloWorldController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HelloWorldService],
            controllers: [HelloWorldController],
        }).compile();

        controller = await module.get<HelloWorldController>(HelloWorldController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it("test", () => {
        const actual = controller.getHello("test");
        expect(actual).toBe("Hello World!test")
    })
});
