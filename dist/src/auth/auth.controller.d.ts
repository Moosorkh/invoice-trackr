export declare class AuthController {
    login(body: any): {
        access_token: string;
        error?: undefined;
    } | {
        error: string;
        access_token?: undefined;
    };
}
