module.exports  = class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async loginWithUsernamePassword(username, password){
        await page.waitForSelector('#react-select-2-input');
        await page.click('#react-select-2-input');
        await page.type('#react-select-2-input', username);
        await page.keyboard.press('Enter');

        await page.click('#react-select-3-input');
        await page.type('#react-select-3-input', password);
        await page.keyboard.press('Enter');

        await page.click('#login-btn');
    }
}
