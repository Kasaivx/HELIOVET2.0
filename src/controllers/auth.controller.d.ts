import { AuthService } from "../src/auth/auth.service.js";
import { CLINICregisterDTO, loginDTO } from "../src/auth/regester.dto.js";
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    regsiterClinic(dto: CLINICregisterDTO): Promise<{
        message: string;
        userUN: string;
        clinicNID: string;
    }>;
    loginfn(dto: loginDTO): Promise<{
        token: string;
    }>;
}
