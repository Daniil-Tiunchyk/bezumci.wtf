import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class DatabaseService {
  async readDatabase() {
    try {
      const dataPath = path.join(__dirname, '..', '..', 'data', 'database.txt');
      const data = await fs.promises.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      throw new Error('Database read error');
    }
  }

  async getData(entity: string, id?: number, email?: string) {
    const database = await this.readDatabase();
    if (!database[entity]) {
      throw new Error(`Entity ${entity} not found`);
    }
    if (id) {
      const item = database[entity].find((item: any) => item.id === id);
      if (!item) {
        throw new Error(`Data with id ${id} not found in entity ${entity}`);
      }
      return item;
    }
    if (email) {
      const item = database[entity].find((item: any) => item.email === email);
      if (!item) {
        throw new Error(
          `Data with email ${email} not found in entity ${entity}`,
        );
      }
      return item;
    }
    return database[entity];
  }

  async getAllData() {
    const database = await this.readDatabase();
    const allData: { [key: string]: any[] } = {};
    for (const entity in database) {
      allData[entity] = database[entity];
    }
    return allData;
  }

  async insertData(entity: string, data: any) {
    const database = await this.readDatabase();
    if (!database[entity]) {
      database[entity] = [];
    }

    const lastId = database[entity].reduce((maxId: number, item: any) => {
      return Math.max(maxId, item.id);
    }, 0);
    data.id = lastId + 1;

    database[entity].push(data);
    await this.writeDatabase(database);
  }

  async updateData(entity: string, id: number, data: any) {
    const database = await this.readDatabase();
    if (!database[entity]) {
      throw new Error(`Entity ${entity} not found`);
    }
    const index = database[entity].findIndex((item: any) => item.id === id);
    if (index === -1) {
      throw new Error(`Data with id ${id} not found in entity ${entity}`);
    }
    database[entity][index] = { ...database[entity][index], ...data };
    await this.writeDatabase(database);
  }

  async deleteData(entity: string, id: number) {
    const database = await this.readDatabase();
    if (!database[entity]) {
      throw new Error(`Entity ${entity} not found`);
    }
    const index = database[entity].findIndex((item: any) => item.id === id);
    if (index === -1) {
      throw new Error(`Data with id ${id} not found in entity ${entity}`);
    }
    database[entity].splice(index, 1);
    await this.writeDatabase(database);
  }

  async writeDatabase(data: any) {
    try {
      const dataPath = path.join(__dirname, '..', '..', 'data', 'database.txt');
      const dataString = JSON.stringify(data);
      await fs.promises.writeFile(dataPath, dataString, 'utf-8');
    } catch (error) {
      console.error('Error writing database:', error);
      throw new Error('Database write error');
    }
  }
}
