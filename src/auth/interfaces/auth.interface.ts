export interface AuthControllerInterface {
    login(req: any, res: any): Promise<any>;
    register(req: any, res: any): Promise<any>;
}