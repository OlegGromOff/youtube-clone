'use server'

import * as jose from 'jose'

interface ITokenInside {
    id: string
    iat: number
    exp: number
}

export async function jwtVerifyServer(accessToken: string) {
    try {
        // 1. ЖЕСТКАЯ ОЧИСТКА: Убираем "Bearer " и лишние пробелы, если они есть
        const cleanToken = accessToken.replace('Bearer ', '').trim()

        const secretString = process.env.JWT_SECRET

        if (!secretString) {
            console.error('КРИТИЧЕСКАЯ ОШИБКА: JWT_SECRET не найден в .env Next.js!')
            return null
        }


        const secret = new TextEncoder().encode(secretString)

        const { payload } = await jose.jwtVerify(cleanToken, secret)

        return payload as ITokenInside
    } catch (error) {
        if (error instanceof Error && error.message.includes('exp claim timestamp check failed')) {
            console.log('Токен истек')
            return null
        }

        console.log('Ошибка при верификации токена: ', error)
        return null
    }
}