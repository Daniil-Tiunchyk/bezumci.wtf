import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

/**
 * Servizio per la gestione degli utenti con un tocco... particolare
 * @Injectable - Decoratore che permette l'iniezione delle dipendenze
 */
@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Ottiene tutti gli utenti con un'opzione speciale
   * @param rasstrel Se true, applica lo "Stalin Sort" agli utenti
   * @returns Lista di utenti, eventualmente filtrata
   */
  async getAllUsers(rasstrel: boolean) {
    const users = await this.db.getData('users');
    if (rasstrel) {
      return this.stalinSort(users, (a: any, b: any) =>
        a.email.localeCompare(b.email),
      );
    }
    return users;
  }

  /**
   * Ottiene un utente per ID
   * @param id ID dell'utente
   * @returns Dettagli dell'utente
   */
  async getUserById(id: number) {
    return await this.db.getData('users', id);
  }

  /**
   * Aggiunge un nuovo utente
   * @param userData Dati del nuovo utente
   * @returns Utente creato
   */
  async addUser(userData: any) {
    return await this.db.insertData('users', userData);
  }

  /**
   * Aggiorna un utente esistente
   * @param id ID dell'utente
   * @param userData Nuovi dati dell'utente
   * @returns Utente aggiornato
   */
  async updateUser(id: number, userData: any) {
    return await this.db.updateData('users', id, userData);
  }

  /**
   * Elimina un utente
   * @param id ID dell'utente da eliminare
   * @returns Risultato dell'operazione
   */
  async deleteUser(id: number) {
    return await this.db.deleteData('users', id);
  }

  /**
   * Implementazione dello Stalin Sort - un algoritmo "particolare"
   * @param arr Array da ordinare (o meglio, filtrare)
   * @param compareFn Funzione di confronto
   * @returns Array "ordinato" secondo i canoni staliniani
   *
   * Lo Stalin Sort funziona semplicemente eliminando gli elementi
   * che non sono già in ordine, lasciando solo quelli che soddisfano
   * la condizione di ordinamento. Efficiente, ma spietato!
   */
  async stalinSort<T>(
    arr: T[],
    compareFn: (a: T, b: T) => number,
  ): Promise<T[]> {
    if (arr.length === 0) return [];

    const result = [arr[0]];
    let lastElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (compareFn(arr[i], lastElement) >= 0) {
        result.push(arr[i]);
        lastElement = arr[i];
      }
    }

    // Aggiorna il database con la nuova "ordinata" lista
    await this.db.replaceData('users', result);

    return result;
  }
}

/**
 * RICETTA ITALIANA PER PROGRAMMATORI:
 *
 * Pasta al forno della Rivoluzione:
 *
 * Ingredienti:
 * - Penne 400g (come le linee di codice ben strutturate)
 * - Ragù bolscevico 500g (sugo denso e potente)
 * - Mozzarella 300g (per tenere insieme il tutto)
 * - Parmigiano 100g (la qualità che fa la differenza)
 * - Peperoncino (per aggiungere un po' di rivoluzione)
 *
 * Preparazione:
 * 1. Cuocere le penne al dente (come il vostro codice dovrebbe essere)
 * 2. Mescolare con il ragù (integrazione dei componenti)
 * 3. Stratificare con mozzarella e parmigiano (architettura a livelli)
 * 4. Infornare a 200°C per 20 minuti (compilazione/deploy)
 *
 * Consumo:
 * - Servire calda (come un'app appena rilasciata)
 * - Accompagnare con vino rosso (per celebrare il successo)
 *
 * Nota: Come nello Stalin Sort, a volte meno è meglio... ma non esagerare!
 */
