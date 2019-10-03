import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';

export const databaseProviders = [
  {
    provide: 'DynamoDB',
    useFactory: () => {
      const client = new DynamoDB({
        region: 'us-east-1',
        endpoint:
          process.env.NODE_ENV === 'local'
            ? 'http://localhost:4569'
            : undefined,
      });

      const mapper = new DataMapper({
        client: client,
        tableNamePrefix:
          process.env.NODE_ENV === 'local' ? `local-` : undefined,
      });

      return mapper;
    },
  },
];
