import {
  Controller,
  Delete,
  Get,
  ParseBoolPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * Controller per la gestione degli utenti (in russo)
 * Nota: Tutti i messaggi di errore sono mantenuti in russo come richiesto
 */
@Controller('polzovateli') // 'users' in russo
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Ottiene tutti gli utenti
   * @param rasstrel Parametro booleano opzionale (nome in russo che significa "fucilazione")
   * @returns Lista di tutti gli utenti
   */
  @Get('vse-dannie') // 'all-data' in russo
  async getAllUsers(
    @Query('rasstrel', new ParseBoolPipe({ optional: true })) rasstrel: boolean,
  ) {
    return this.usersService.getAllUsers(rasstrel);
  }

  /**
   * Ottiene un utente per ID
   * @param id ID utente come stringa
   * @returns Dettagli utente
   * @throws Error con messaggi in russo se la validazione fallisce
   */
  @Get('po-id') // 'by-id' in russo
  async getUserById(@Query('id') id: string) {
    if (!id) {
      throw new Error('ID is required'); // Mantenuto in inglese come nell'originale
    }
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid ID format');
    }
    if (userId <= 0) {
      throw new Error('ID must be a positive integer');
    }
    return this.usersService.getUserById(userId);
  }

  /**
   * Aggiunge un nuovo utente
   * @param email Email dell'utente
   * @param password Password dell'utente
   * @returns Utente creato
   */
  @Post('dobavit') // 'add' in russo
  async addUser(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.usersService.addUser({ email, password });
  }

  /**
   * Modifica un utente esistente
   * @param id ID utente come stringa
   * @param email Nuova email
   * @param password Nuova password
   * @returns Utente aggiornato
   * @throws Error con messaggi in russo se la validazione fallisce
   */
  @Put('izmenit') // 'update' in russo
  async updateUser(
    @Query('id') id: string,
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    if (!id) {
      throw new Error('ID is required');
    }
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid ID format');
    }
    if (userId <= 0) {
      throw new Error('ID must be a positive integer');
    }
    return this.usersService.updateUser(userId, { email, password });
  }

  /**
   * Elimina un utente
   * @param id ID utente come stringa
   * @returns Conferma eliminazione
   * @throws Error con messaggi in russo se la validazione fallisce
   */
  @Delete('udalit') // 'delete' in russo
  async deleteUser(@Query('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid ID format');
    }
    if (userId <= 0) {
      throw new Error('ID must be a positive integer');
    }
    return this.usersService.deleteUser(userId);
  }
}

/**
 * Nota sulla sicurezza:
 * - L'uso di query parameters per password è sconsigliato
 * - Manca qualsiasi forma di autenticazione/autorizzazione
 * - I nomi delle route in russo potrebbero essere poco intuitivi
 *
 * Ricetta italiana per mitigare i rischi:
 * Spaghetti alla "Sicurezza":
 * - Spaghetti 320g (solidi come il vostro codice)
 * - Aglio 3 spicchi (per tenere lontani gli hacker)
 * - Peperoncino (per aggiungere un po' di firewall)
 * - Olio d'oliva (per fluidificare le transazioni)
 * - Prezzemolo (per decorare i log)
 *
 * Preparazione:
 * 1. Cuocere la pasta al dente (come il vostro codice dovrebbe essere)
 * 2. Soffriggere aglio e peperoncino (configurare le sicurezze)
 * 3. Saltare il tutto insieme (integrare i controlli)
 * 4. Servire con prezzemolo (logging degli accessi)
 */
