import { BaseUIComponents } from './BaseUIComponents';

export class LoginPage extends BaseUIComponents {

    private readonly usernameInput = this.page.getByPlaceholder('Username');
    private readonly passwordInput = this.page.getByPlaceholder('Password');
    private readonly loginButton = this.page.getByRole('button').filter({hasText:'Login'});

    async login(username: string, password: string) {
        await this.enterText(this.usernameInput, username);
        await this.enterText(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

}