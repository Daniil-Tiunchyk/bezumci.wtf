import { faker } from '@faker-js/faker';

// Упрощенная таблица преобразования ASCII в Брайль
const brailleMap: Record<string, string> = {
  a: '⠁',
  b: '⠃',
  c: '⠉',
  d: '⠙',
  e: '⠑',
  f: '⠋',
  g: '⠛',
  h: '⠓',
  i: '⠊',
  j: '⠚',
  k: '⠅',
  l: '⠇',
  m: '⠍',
  n: '⠝',
  o: '⠕',
  p: '⠏',
  q: '⠟',
  r: '⠗',
  s: '⠎',
  t: '⠞',
  u: '⠥',
  v: '⠧',
  w: '⠺',
  x: '⠭',
  y: '⠽',
  z: '⠵',
  ' ': ' ',
  '.': '⠲',
  ',': '⠂',
  '!': '⠖',
  '?': '⠦',
  ':': '⠒',
  ';': '⠆',
  '(': '⠐⠣',
  ')': '⠐⠜',
  '1': '⠁',
  '2': '⠃',
  '3': '⠉',
  '4': '⠙',
  '5': '⠑',
  '6': '⠋',
  '7': '⠛',
  '8': '⠓',
  '9': '⠊',
  '0': '⠚',
};

// Функция преобразования текста с индивидуальным шансом
function maybeBraille(text: string, preserveKeywords = false): string {
  // Ключевые термины, которые не должны преобразовываться
  const preservedTerms = [
    'object',
    'string',
    'number',
    'boolean',
    'array',
    'integer',
    'query',
    'path',
    'header',
    'cookie',
    'body',
    'formData',
    'http',
    'bearer',
    'basic',
    'apiKey',
    'oauth2',
    'openIdConnect',
  ];

  // Не преобразовываем технические термины
  if (preserveKeywords && preservedTerms.includes(text.toLowerCase())) {
    return text;
  }

  // 50% шанс оставить текст как есть
  if (Math.random() > 0.5) {
    return text;
  }

  // Преобразование в Брайль
  return text
    .toLowerCase()
    .split('')
    .map((c) => brailleMap[c] || c)
    .join('');
}

export function generateRandomSwagger() {
  // Функция-обертка для преобразования текста
  const transform = (text: string, preserveKeywords = false) =>
    maybeBraille(text, preserveKeywords);

  // Схема для ошибок API
  const errorResponseSchema = {
    type: transform('object', true),
    properties: {
      error: {
        type: transform('object', true),
        properties: {
          code: {
            type: transform('string', true),
            example: transform(
              `ERR_${faker.string.alphanumeric(3).toUpperCase()}`,
            ),
          },
          message: {
            type: transform('string', true),
            example: transform(faker.hacker.phrase()),
          },
          details: {
            type: transform('string', true),
            example: transform(faker.lorem.sentence()),
          },
          timestamp: {
            type: transform('string', true),
            format: 'date-time',
            example: faker.date.recent().toISOString(),
          },
        },
      },
    },
  };

  const paths = {};
  const methods = ['get', 'post', 'put', 'delete', 'patch'];
  const randomCount = Math.floor(Math.random() * 1000) + 100;
  const tags: Set<string> = new Set();

  // Генерация тегов
  for (let i = 0; i < randomCount; i++) {
    const randomTag = faker.helpers.arrayElement([
      faker.commerce.department(),
      faker.hacker.noun(),
      faker.word.noun(),
    ]);
    tags.add(randomTag.toLowerCase().replace(/\s+/g, '-'));
  }

  const tagsArray = Array.from(tags).map((tag) => ({
    name: transform(tag),
    description: transform(`Endpoints related to ${tag.replace(/-/g, ' ')}`),
  }));

  // Генерация endpoints
  tags.forEach((tag) => {
    const pathCountForTag = Math.floor(Math.random() * 3) + 1;

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

      const methodCount = Math.floor(Math.random() * methods.length) + 1;
      const selectedMethods = methods
        .sort(() => 0.5 - Math.random())
        .slice(0, methodCount);

      selectedMethods.forEach((method) => {
        const summary = `${faker.hacker.ingverb()} ${faker.hacker.noun()}`;
        const description = `Endpoint for ${tag.replace(/-/g, ' ')} operations: ${faker.company.catchPhrase()}`;

        paths[path][method] = {
          tags: [transform(tag)],
          summary: transform(summary),
          description: transform(description),
          parameters:
            method === 'get'
              ? [
                  {
                    name: transform('query', true),
                    in: transform('query', true),
                    description: transform(faker.lorem.sentence()),
                    required: false,
                    schema: { type: transform('string', true) },
                  },
                ]
              : undefined,
          requestBody:
            method !== 'get'
              ? {
                  description: transform(faker.lorem.sentence()),
                  required: true,
                  content: {
                    'application/json': {
                      schema: {
                        type: transform('object', true),
                        properties: {
                          [transform(faker.database.column())]: {
                            type: transform('string', true),
                            example: transform(faker.word.sample()),
                          },
                          [transform(faker.database.column())]: {
                            type: transform('number', true),
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
              description: transform('Successful response'),
              content: {
                'application/json': {
                  schema: {
                    type: transform('object', true),
                    properties: {
                      [transform(faker.database.column())]: {
                        type: transform('string', true),
                        example: transform(faker.word.words()),
                      },
                      [transform(faker.database.column())]: {
                        type: transform('number', true),
                        example: faker.number.int(),
                      },
                      [transform(faker.database.column())]: {
                        type: transform('boolean', true),
                        example: faker.datatype.boolean(),
                        description: transform(faker.lorem.sentence()),
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: transform('Bad Request - Invalid input parameters'),
              content: {
                'application/json': {
                  schema: errorResponseSchema,
                },
              },
            },
            401: {
              description: transform('Unauthorized - Authentication required'),
              content: {
                'application/json': {
                  schema: errorResponseSchema,
                },
              },
            },
            404: {
              description: transform('Not Found - Resource not found'),
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
                            type: transform('string', true),
                            example: transform(
                              faker.helpers.arrayElement([
                                'user',
                                'product',
                                'order',
                              ]),
                            ),
                          },
                          id: {
                            type: transform('string', true),
                            example: transform(faker.string.uuid()),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: transform('Internal Server Error'),
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
                            type: transform('string', true),
                            example: transform(faker.string.uuid()),
                          },
                          traceId: {
                            type: transform('string', true),
                            example: transform(faker.string.uuid()),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          security:
            method !== 'get'
              ? [{ [transform('bearerAuth', true)]: [] }]
              : undefined,
        };
      });
    }
  });

  return {
    openapi: '3.0.0',
    info: {
      title: transform(`${faker.company.name()} API`),
      version: transform(
        `${faker.number.int({ min: 1, max: 10 })}.${faker.number.int({ min: 0, max: 9 })}.${faker.number.int({ min: 0, max: 9 })}`,
      ),
      description: transform(faker.company.catchPhraseDescriptor()),
      contact: {
        name: transform(faker.person.fullName()),
        email: faker.internet.email(), // Email оставляем в обычном формате
      },
    },
    components: {
      securitySchemes: {
        [transform('bearerAuth', true)]: {
          type: transform('http', true),
          scheme: transform('bearer', true),
          bearerFormat: transform('JWT'),
        },
      },
      schemas: {
        [transform('ErrorResponse', true)]: errorResponseSchema,
      },
    },
    tags: tagsArray,
    paths,
  };
}
