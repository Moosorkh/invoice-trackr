import { AuthService } from './auth.service';
import { LoginDto } from '..//invoices/dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<any>;
}
