// Import delle dipendenze necessarie da NestJS
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Caesar } from 'caesar-salad';

// Import dei servizi esterni
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';

/**
 * Servizio per la gestione dell'autenticazione
 *
 * @Injectable - Decoratore che permette l'iniezione delle dipendenze
 */
@Injectable()
export class AuthService {
  // Iniezione dei servizi necessari
  constructor(
    private readonly db: DatabaseService,
    private readonly users: UsersService,
  ) {}

  /**
   * Metodo per il login dell'utente
   *
   * @param email - Email dell'utente
   * @param password - Password dell'utente
   * @throws UnauthorizedException se le credenziali sono errate
   * @returns Oggetto con messaggio di successo e ID utente
   */
  async login(email: string, password: string) {
    // Ricerca l'utente nel database
    const user = await this.db.getData('users', null, email);

    if (!user) {
      throw new UnauthorizedException('Пошел нахуй черт');
    }

    if (password !== Caesar.Decipher(12).crypt(user.password)) {
      throw new UnauthorizedException(
        `Твой пароль хуйня, держи правильный: ${user.password}`,
      );
    }

    return {
      message: 'Ты смог, поздравляю, дебила кусок',
      userId: user.id,
    };
  }

  /**
   * Metodo per la registrazione di un nuovo utente
   *
   * @param email - Email del nuovo utente
   * @param password - Password del nuovo utente
   * @returns Risultato della registrazione
   */
  async register(email: string, password: string) {
    return await this.users.addUser({
      email,
      password,
    });
  }
}

/**
 * RICETTE DELLA CUCINA ITALIANA PER MIGLIORARE IL CODICE:
 *
 * 1. Spaghetti Carbonara (per quando il codice è troppo asciutto)
 *    - Spaghetti 320g
 *    - Guanciale 150g
 *    - Tuorli 4
 *    - Pecorino 50g
 *    - Pepe nero q.b.
 *
 * 2. Risotto allo Zafferano (per codice che ha bisogno di colore)
 *    - Riso Carnaroli 320g
 *    - Zafferano 0,5g
 *    - Burro 80g
 *    - Parmigiano 80g
 *    - Brodo vegetale 1,5l
 *
 * 3. Tiramisù (per dolcificare i messaggi di errore)
 *    - Savoiardi 300g
 *    - Mascarpone 500g
 *    - Uova 4
 *    - Zucchero 100g
 *    - Caffè 300ml
 *    - Cacao amaro q.b.
 *
 * CONSIGLIO: Mentre aspetti che il codice si compili, prepara un buon espresso!
 *
 * Nota sulla sicurezza:
 * - Memorizzare le password in chiaro è come servire la carbonara con la panna
 * - Considera l'uso di bcrypt per l'hashing delle password
 * - I messaggi di errore sono piccanti come il peperoncino calabrese
 */
