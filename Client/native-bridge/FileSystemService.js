import { dialog } from 'electron';
import fs from 'fs';

/**
 * @typedef {Object} ReadFileResult
 * @property {boolean} success - İşlemin başarılı olup olmadığını belirtir.
 * @property {string} [message] - Hata mesajı veya açıklama (isteğe bağlı).
 * @property {import('fs').ReadStream} [stream] - Okunan dosyanın akışı (isteğe bağlı).
 */

export class FileSystemService {
    /**
     * @description: Reads a file with its content and returns
     * @returns {ReadFileResult}
     */
    static ReadFile = async () => {
        const result = await dialog.showOpenDialog({
            properties: ['openFile']
        });

        if (result.canceled || result.filePaths.length === 0) {
            return { success: false, message: 'Dosya seçilmedi', };
        }

        const filePath = result.filePaths[0];
        const stream = fs.createReadStream(filePath);

        return { success: true, stream: stream };
    }
}