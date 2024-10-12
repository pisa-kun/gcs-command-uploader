# ステップ 1: プロジェクトのセットアップ
```
mkdir gcs-upload
cd gcs-upload
npm init -y
npm install @google-cloud/storage typescript ts-node @types/node
npx tsc --init
npm install dotenv
```

.envを作って
```
PROJECT_ID=your_project_id
KEY_FILENAME=path/to/your-service-account-file.json
BUCKET_NAME=your_bucket_name

```

# ステップ 2: アプリを実行する
### アップロード
> npx ts-node upload.ts path/to/your/image.jpg

### ダウンロード
> npx ts-node download.ts uploads/sample.jpeg sample.jpeg