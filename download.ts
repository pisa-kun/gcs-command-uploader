import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 環境変数を読み込む
dotenv.config();

const projectId = process.env.PROJECT_ID; // 環境変数からプロジェクトIDを取得
const keyFilename = process.env.KEY_FILENAME; // 環境変数からサービスアカウントキーのパスを取得
const bucketName = process.env.BUCKET_NAME; // 環境変数からバケット名を取得

const storage = new Storage({ projectId, keyFilename });

async function downloadFile(fileName: string, destination: string) {
    if (!projectId || !keyFilename || !bucketName) {
        console.error('環境変数が正しく設定されていません。');
        process.exit(1);
    }

    const options = {
        destination: destination,
    };

    // ファイルをダウンロード
    await storage.bucket(bucketName).file(fileName).download(options);

    console.log(`${fileName} downloaded to ${destination}`);
}

// コマンドライン引数からファイル名と保存先パスを取得
const fileName = process.argv[2];
const destination = process.argv[3];

if (!fileName || !destination) {
    console.error('Usage: ts-node download.ts <file-name> <destination-path>');
    process.exit(1);
}

downloadFile(fileName, destination).catch(console.error);
