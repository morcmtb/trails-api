import { Injectable, Inject } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Trail } from './schema/trails.schema';
import { TrailDto, TrailCreateDto, TrailUpdateDto } from './dto/trails.dto';

@Injectable()
export class TrailsService {
  constructor(@Inject('DynamoDB') private readonly dynamodb: DataMapper) {}

  async createTrailsTable() {
    await this.dynamodb.createTable(Trail, {
      readCapacityUnits: 5,
      writeCapacityUnits: 5,
    });
  }

  async deleteTrailsTable() {
    await this.dynamodb.deleteTable(Trail);
  }

  async getTrails(): Promise<Trail[]> {
    try {
      const results: Trail[] = [];

      for await (const item of this.dynamodb.scan<Trail>(Trail)) {
        results.push(item);
      }

      return results;
    } catch (error) {
      console.log('Error Getting Trails: ', error);
    }
  }

  async getTrail(trailId: string): Promise<Trail> {
    const trail = Object.assign(new Trail(), {
      id: trailId,
    });

    try {
      const item: Trail = await this.dynamodb.get(trail);

      return item;
    } catch (error) {
      console.log('Error getTrail:', trail, error);
    }
  }
  async createTrail(createTrailDto: TrailCreateDto): Promise<Trail> {
    const createdTrail = new Trail();
    const {
      name,
      street,
      city,
      state,
      zip,
      longitude,
      latitude,
    } = createTrailDto;
    Object.assign(createdTrail, {
      name,
      street,
      city,
      state,
      zip,
      longitude,
      latitude,
    });

    try {
      await this.dynamodb.put(createdTrail);

      return createdTrail;
    } catch (error) {
      console.log('Error createTrail: ', error);
    }
  }

  async updateTrail(trail: TrailUpdateDto): Promise<Trail> {
    const TrailToFind = Object.assign(new Trail(), {
      id: trail.id,
    });
    const item: Trail = await this.dynamodb.get(TrailToFind);
    const updatedTrail: Trail = Object.assign(new Trail(), item, trail);

    try {
      await this.dynamodb.update(updatedTrail);

      return updatedTrail;
    } catch (error) {
      console.log('Error updateTrail: ', error);
    }
  }

  async deleteTrail(traild: string): Promise<any> {
    const TrailToDelete = Object.assign(new Trail(), {
      id: traild,
    });

    try {
      await this.dynamodb.delete(TrailToDelete);

      return TrailToDelete;
    } catch (error) {
      console.log('Error deleteTrail: ', error);
    }
  }
}
