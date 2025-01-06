import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { ICounterRepository } from './interfaces/counter.repository.interface';
import { Counter } from './schemas/counter.schema';

@CustomRepository(Counter)
export class CounterRepository implements ICounterRepository {
  constructor(
    @InjectModel(Counter.name)
    private readonly counterModel: Model<Counter>,
  ) {}

  async findAndUpdateSequence(name: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name },
      { $inc: { id: 1 } },
      { new: true, upsert: true },
    );

    return counter.id;
  }
}
