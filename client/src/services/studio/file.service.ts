import { instance } from '@/api/axios'
import Cookies from 'js-cookie' // Импортируем библиотеку для работы с куками
import { EnumTokens } from '@/types/auth.types' // Импортируем названия токенов
import type { IFileResponse, IProgressProcessingResponse } from '@/types/file.types'

class FileService {
    private _UPLOAD_FILE = '/upload-file'

    upload(file: FormData, folder?: string) {
        // 1. Извлекаем access-токен из куки
        const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)

        // 2. Добавляем объект конфигурации (третьим аргументом в post)
        return instance.post<IFileResponse[]>(this._UPLOAD_FILE, file, {
            params: { folder },
            headers: {
                // 3. Вручную прописываем заголовок авторизации
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    getProcessingStatus(fileName: string) {
        return instance.get<IProgressProcessingResponse>(`${this._UPLOAD_FILE}/status/${fileName}`)
    }
}

export const fileService = new FileService()