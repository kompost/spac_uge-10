import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';


describe('MessageController', () => {
    let controller: MessageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MessageController],
        }).useMocker((token) => {
            const testingMssages = [
                {id:'test1', message:'hello 1'},
                {id:'test2', message:'hello 2'},
                {id:'test3', message:'hello 3'},
                
            ]

            if (token === MessageService) {
                return { 
                    getAll: jest.fn().mockReturnValue(testingMssages),
                    // getById: jest.fn(()=>[]).mockReturnValue(id =>  testingMssages.filter(message => message.id === id))
                }
            }
        }).compile();

        controller = module.get<MessageController>(MessageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('shuld get all', () => {
        const all = controller.getAll()
        expect(all).toHaveLength(3)
    })

    it('shuld get by id', ()=>{
        const msg1 = controller.getById('test1')

        expect(msg1).toHaveProperty('id', 'test1')
    })

});
