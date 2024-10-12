import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 環境変数を読み込む
dotenv.config();

const projectId = process.env.PROJECT_ID; // 環境変数からプロジェクトIDを取得
const keyFilename = process.env.KEY_FILENAME; // 環境変数からサービスアカウントキーのパスを取得
const bucketName = process.env.BUCKET_NAME; // 環境変数からバケット名を取得

const storage = new Storage({ projectId, keyFilename });

async function uploadFile(filePath: string) {
    if (!projectId || !keyFilename || !bucketName) {
        console.error('環境変数が正しく設定されていません。');
        process.exit(1);
    }
    
    const fileName = path.basename(filePath);
    const destination = `uploads/${fileName}`; // アップロード先のパス

    await storage.bucket(bucketName).upload(filePath, {
        destination: destination,
        resumable: false,
    });

    console.log(`${fileName} uploaded to ${bucketName}/${destination}`);
}

// コマンドライン引数からファイルパスを取得
const filePath = process.argv[2];

if (!filePath) {
    console.error('Usage: ts-node upload.ts <path-to-image>');
    process.exit(1);
}

uploadFile(filePath).catch(console.error);
