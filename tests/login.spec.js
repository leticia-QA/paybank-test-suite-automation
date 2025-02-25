import { test, expect } from '@playwright/test';
import { getCode2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPages';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis';


test('should not log in when the authentication code is invalid', async ({ page }) => {
  const loginPage = new LoginPage(page)
 
  const user = {
    cpf: '00000014141',
    password: '147258'
  };
  
  await loginPage.accessPage()
  await loginPage.informscpf(user.cpf)
  await loginPage.informsPassword(user.password)
  await loginPage.informs2FA('123456')

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('must access a user account', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const dashPage = new DashPage (page)


  const user = {
    cpf: '00000014141',
    password: '147258'
  };
  
  await cleanJobs()

  await loginPage.accessPage()
  await loginPage.informscpf(user.cpf)
  await loginPage.informsPassword(user.password)


  // checkpoint
  await page.getByRole('heading', {name:'Verificação em duas etapas'})
    .waitFor({timeout: 3000})


  const code = await getJob() 
 
  // const code = await getCode2FA(user.cpf); //get code db
  await loginPage.informs2FA(code) //get code redis

  expect(await dashPage.getBalance()).toHaveText('R$ 5.000,00')

});
