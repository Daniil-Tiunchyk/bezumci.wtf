// Import delle dipendenze necessarie da NestJS
import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * Controller per la gestione dell'autenticazione
 *
 * @Controller('aus') - Definisce il prefisso della route per tutti gli endpoint
 * di questo controller. In questo caso, tutte le routes inizieranno con '/aus'
 */
@Controller('aus')
export class AuthController {
  // Iniezione del servizio AuthService nel controller
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint per il login dell'utente
   *
   * @Get('voiti') - Definisce la route '/aus/voiti' per le richieste GET
   * @param email - Email dell'utente passata come query parameter
   * @param password - Password dell'utente passata come query parameter
   * @returns Restituisce il risultato della chiamata al servizio di login
   *
   * @example GET /aus/voiti?email=mario.rossi@example.com&password=secret
   */
  @Get('voiti')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    // Chiamata al servizio AuthService per eseguire il login
    return this.authService.login(email, password);
  }

  /**
   * Endpoint per la registrazione di un nuovo utente
   *
   * @Get('zaregistrirovatsya') - Definisce la route '/aus/zaregistrirovatsya' per le richieste GET
   * @param email - Email del nuovo utente passata come query parameter
   * @param password - Password del nuovo utente passata come query parameter
   * @returns Restituisce il risultato della chiamata al servizio di registrazione
   *
   * @example GET /aus/zaregistrirovatsya?email=luigi.verdi@example.com&password=supersecret
   */
  @Get('zaregistrirovatsya')
  async register(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    // Chiamata al servizio AuthService per eseguire la registrazione
    return this.authService.register(email, password);
  }
}

/**
 * Note importanti:
 * 1. L'uso dei query parameters per email e password non è il metodo più sicuro
 *    per gestire dati sensibili. Sarebbe meglio usare una richiesta POST con body cifrato.
 *
 * 2. I nomi delle route in russo ('voiti', 'zaregistrirovatsya') potrebbero non essere
 *    l'opzione migliore per un'applicazione internazionale. Sarebbe meglio usare termini inglesi.
 *
 * 3. Mancano validazioni di base sui parametri in input (es. formato email, complessità password).
 *
 * 4. Mancano decoratori per la documentazione (es. @ApiTags, @ApiResponse) se si usa Swagger.
 */
