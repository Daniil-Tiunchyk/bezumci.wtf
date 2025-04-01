import { faker } from '@faker-js/faker';

export function generateRandomSwagger() {
  const paths = {};
  const methods = ['get', 'post', 'put', 'delete', 'patch'];
  const randomCount = Math.floor(Math.random() * 1000) + 100;
  const tags: Set<string> = new Set();

  for (let i = 0; i < randomCount; i++) {
    const randomTag = faker.helpers.arrayElement([
      faker.commerce.department(),
      faker.hacker.noun(),
      faker.word.noun(),
    ]);
    tags.add(randomTag.toLowerCase().replace(/\s+/g, '-'));
  }

  const tagsArray = Array.from(tags).map((tag) => ({
    name: tag,
    description: `Endpoints related to ${tag.replace(/-/g, ' ')}`,
  }));

  const errorResponseSchema = {
    type: 'object',
    properties: {
      error: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: faker.string.alphanumeric(6).toUpperCase(),
          },
          message: { type: 'string', example: faker.hacker.phrase() },
          details: { type: 'string', example: faker.lorem.sentence() },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: faker.date.recent().toISOString(),
          },
        },
      },
    },
  };

  tags.forEach((tag) => {
    const pathCountForTag = Math.floor(Math.random() * 3) + 1; // 1-3 endpoints per tag

    for (let i = 0; i < pathCountForTag; i++) {
      const endpointName = faker.helpers
        .arrayElement([
          faker.hacker.verb(),
          faker.commerce.productAdjective(),
          faker.word.verb(),
        ])
        .toLowerCase()
        .replace(/\s+/g, '-');

      const path = `/api/${tag}/${endpointName}`;
      paths[path] = {};

      // Добавление методов
      const methodCount = Math.floor(Math.random() * methods.length) + 1;
      const selectedMethods = methods
        .sort(() => 0.5 - Math.random())
        .slice(0, methodCount);

      selectedMethods.forEach((method) => {
        paths[path][method] = {
          tags: [tag],
          summary: `${faker.hacker.ingverb()} ${faker.hacker.noun()}`,
          description: `Endpoint for ${tag.replace(/-/g, ' ')} operations: ${faker.company.catchPhrase()}`,
          parameters:
            method === 'get'
              ? [
                  {
                    name: 'query',
                    in: 'query',
                    description: faker.lorem.sentence(),
                    required: false,
                    schema: { type: 'string' },
                  },
                ]
              : undefined,
          requestBody:
            method !== 'get'
              ? {
                  description: faker.lorem.sentence(),
                  required: true,
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          [faker.database.column()]: {
                            type: 'string',
                            example: faker.word.sample(),
                          },
                          [faker.database.column()]: {
                            type: 'number',
                            example: faker.number.int(),
                          },
                        },
                      },
                    },
                  },
                }
              : undefined,
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      [faker.database.column()]: {
                        type: 'string',
                        example: faker.word.words(),
                      },
                      [faker.database.column()]: {
                        type: 'number',
                        example: faker.number.int(),
                      },
                      [faker.database.column()]: {
                        type: 'boolean',
                        example: faker.datatype.boolean(),
                        description: faker.lorem.sentence(),
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad Request - Invalid input parameters',
              content: {
                'application/json': {
                  schema: errorResponseSchema,
                },
              },
            },
            401: {
              description: 'Unauthorized - Authentication required',
              content: {
                'application/json': {
                  schema: errorResponseSchema,
                },
              },
            },
            404: {
              description: 'Not Found - Resource not found',
              content: {
                'application/json': {
                  schema: {
                    ...errorResponseSchema,
                    properties: {
                      error: {
                        ...errorResponseSchema.properties.error,
                        properties: {
                          ...errorResponseSchema.properties.error.properties,
                          resource: {
                            type: 'string',
                            example: faker.helpers.arrayElement([
                              'user',
                              'product',
                              'order',
                            ]),
                          },
                          id: { type: 'string', example: faker.string.uuid() },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal Server Error',
              content: {
                'application/json': {
                  schema: {
                    ...errorResponseSchema,
                    properties: {
                      error: {
                        ...errorResponseSchema.properties.error,
                        properties: {
                          ...errorResponseSchema.properties.error.properties,
                          requestId: {
                            type: 'string',
                            example: faker.string.uuid(),
                          },
                          traceId: {
                            type: 'string',
                            example: faker.string.uuid(),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          security: method !== 'get' ? [{ bearerAuth: [] }] : undefined,
        };
      });
    }
  });

  return {
    openapi: '3.0.0',
    info: {
      title: `${faker.company.name()} API`,
      version: `${faker.number.int({ min: 1, max: 10 })}.${faker.number.int({ min: 0, max: 9 })}.${faker.number.int({ min: 0, max: 9 })}`,
      description: faker.company.catchPhraseDescriptor(),
      contact: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: errorResponseSchema,
      },
    },
    tags: tagsArray,
    paths,
  };
}
