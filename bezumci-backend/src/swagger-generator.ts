import { faker } from '@faker-js/faker';

// Mappa per la conversione in caratteri Braille
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

/**
 * Converte casualmente testo in Braille (50% di probabilità)
 * @param text Testo da convertire
 * @param preserveKeywords Se true, preserva i termini tecnici
 * @returns Testo originale o convertito in Braille
 */
function maybeBraille(text: string, preserveKeywords = false): string {
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

  if (preserveKeywords && preservedTerms.includes(text.toLowerCase())) {
    return text;
  }

  if (Math.random() > 0.5) {
    return text;
  }

  return text
    .toLowerCase()
    .split('')
    .map((c) => brailleMap[c] || c)
    .join('');
}

/**
 * Genera documentazione Swagger randomica con elementi in Braille
 * @returns Oggetto Swagger completamente randomico
 */
export function generateRandomSwagger() {
  const transform = (text: string, preserveKeywords = false) =>
    maybeBraille(text, preserveKeywords);

  // Schema base per risposte di errore
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

  // Genera percorsi e metodi randomici
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
    name: transform(tag),
    description: transform(`Endpoints related to ${tag.replace(/-/g, ' ')}`),
  }));

  // Popola ogni percorso con metodi randomici
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
        email: faker.internet.email(),
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

/* 
Ricetta italiana per sviluppatori:
Pasta al "Debug Riuscito"
- Spaghetti 320g (codice solido)
- Aglio 3 spicchi (per sicurezza)
- Peperoncino (performance)
- Prezzemolo (logging)
- Olio EVO q.b. (fluidità)

Preparazione:
1. Cuocere spaghetti al dente (test completi)
2. Soffriggere aglio e peperoncino (configurazioni)
3. Unire il tutto (integrazione)
4. Decorare con prezzemolo (final touches)

Servire con un buon Chianti!
*/
