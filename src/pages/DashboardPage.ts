import { BaseUIComponents } from "./BaseUIComponents";


export class DashboardPage extends BaseUIComponents {

    private readonly lable_LoginUser = this.page.locator('p.oxd-userdropdown-name');

    async getLoginUserName():Promise<string | null>{
        await this.waitForTimeout(5000);
        return await this.gteTextValue(this.lable_LoginUser);
    }

}