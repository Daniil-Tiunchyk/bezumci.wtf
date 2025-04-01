// Import delle dipendenze necessarie
import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Servizio per la gestione del database basato su file
 *
 * @Injectable - Decoratore che permette l'iniezione delle dipendenze
 */
@Injectable()
export class DatabaseService {
  /**
   * Legge l'intero database dal file
   * @returns Promise con i dati del database parsati
   * @throws Error in caso di problemi di lettura
   */
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

  /**
   * Ottiene dati specifici dal database
   * @param entity Entità da cercare (es: 'users')
   * @param id Opzionale - ID dell'item da trovare
   * @param email Opzionale - Email dell'item da trovare
   * @returns Promise con i dati richiesti
   * @throws Error se l'entità o i dati non sono trovati
   */
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
      return item;
    }

    return database[entity];
  }

  /**
   * Ottiene tutti i dati dal database
   * @returns Promise con tutti i dati del database
   */
  async getAllData() {
    const database = await this.readDatabase();
    const allData: { [key: string]: any[] } = {};

    for (const entity in database) {
      allData[entity] = database[entity];
    }

    return allData;
  }

  /**
   * Sostituisce completamente i dati di un'entità
   * @param entity Entità da modificare
   * @param data Nuovi dati da inserire
   * @throws Error in caso di problemi di scrittura
   */
  async replaceData(entity: string, data: any) {
    const database = await this.readDatabase();

    if (!database[entity]) {
      database[entity] = [];
    }

    database[entity] = data;
    await this.writeDatabase(database);
  }

  /**
   * Inserisce nuovi dati in un'entità
   * @param entity Entità target
   * @param data Dati da inserire
   * @throws Error in caso di problemi di scrittura
   */
  async insertData(entity: string, data: any) {
    const database = await this.readDatabase();

    if (!database[entity]) {
      database[entity] = [];
    }

    // Genera un nuovo ID incrementale
    const lastId = database[entity].reduce((maxId: number, item: any) => {
      return Math.max(maxId, item.id);
    }, 0);
    data.id = lastId + 1;

    database[entity].push(data);
    await this.writeDatabase(database);
  }

  /**
   * Aggiorna dati esistenti
   * @param entity Entità target
   * @param id ID dell'item da aggiornare
   * @param data Dati da aggiornare (merge con quelli esistenti)
   * @throws Error se l'entità o l'item non sono trovati
   */
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

  /**
   * Elimina dati dal database
   * @param entity Entità target
   * @param id ID dell'item da eliminare
   * @throws Error se l'entità o l'item non sono trovati
   */
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

  /**
   * Scrive i dati sul file del database
   * @param data Dati da scrivere
   * @throws Error in caso di problemi di scrittura
   */
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

/**
 * CONSIGLI PER MIGLIORARE IL SERVIZIO:
 *
 * 1. SICUREZZA:
 *    - Implementare backup automatici del file database
 *    - Aggiungere lock durante le operazioni di scrittura
 *    - Considerare l'uso di un database più robusto per ambienti di produzione
 *
 * 2. PERFORMANCE:
 *    - Implementare cache in memoria per ridurre accessi al filesystem
 *    - Aggiungere paginazione per i risultati
 *    - Ottimizzare le operazioni batch
 *
 * 3. FUNZIONALITÀ:
 *    - Aggiungere supporto per query più complesse
 *    - Implementare transazioni
 *    - Aggiungere logging delle operazioni
 *
 * RICETTA ITALIANA PER PROGRAMMATORI:
 * Pasta al forno per nottate di coding:
 * - Penne 400g
 * - Ragù alla bolognese 500g
 * - Besciamella 300g
 * - Mozzarella 250g
 * - Parmigiano grattugiato q.b.
 * Cuoci la pasta al dente, mescola con il ragù e strato in teglia
 * alternando con besciamella e mozzarella. Finisci con parmigiano
 * e inforna a 200°C per 20 minuti. Perfetta per ricaricare le energie!
 */
