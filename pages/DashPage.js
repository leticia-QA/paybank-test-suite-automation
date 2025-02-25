export class DashPage {
    constructor (page) {
        this.page = page
    }

    async getBalance() {
        return this.page.locator('#account-balance')
    }
}