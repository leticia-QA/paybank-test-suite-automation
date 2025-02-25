import pgPromise from "pg-promise"

const pgp = pgPromise ()
const db = pgp ('postegresql://dba:dba@paybank-db:5432/UserDB')


export async function getCode2FA (cpf){
const query = `
    SELECT t.code
	FROM public."TwoFactorCode" t
	JOIN public. "User" u ON u.id = t."userId"
	WHERE u."cpf" = '${cpf}'
	ORDER BY t.id DESC
	LIMIT 1;`

const result = await db.oneOrNone(query)
return result.code 
}