import * as fs from 'fs';
import * as path from 'path';
import { generatedFilePath } from '../src/const/generatedFilePath';
import { DailyNoteService } from '../src/services/DailyNoteService';

/**
 * 指定されたディレクトリに日記ファイルを生成する関数
 *
 * - 日付に基づいて `daily-notes/年/月/日.md` 形式でファイルを保存する
 * - ディレクトリが存在しない場合は作成し、日記の内容を書き込む
 */
async function generateDailyNote() {
  try {
    const dailyNoteService = DailyNoteService.create();
    const result = dailyNoteService.generateDailyNote();

    const date = new Date(dailyNoteService.getTimestamp());

    const directoryPath = path.join(
      process.cwd(),
      generatedFilePath,
      String(date.getFullYear()),
      String(date.getMonth() + 1).padStart(2, '0'),
    );

    if (!fs.existsSync(directoryPath)) {
      await fs.promises.mkdir(directoryPath, { recursive: true });
    }

    const fileName = `${String(date.getDate()).padStart(2, '0')}.md`;

    await fs.promises.writeFile(path.join(directoryPath, fileName), result);
    console.log(`Generated daily note: ${fileName} in ${directoryPath}`);
  } catch (error) {
    console.error('エラーが発生しました:', error);
    throw error;
  }
}

generateDailyNote().catch((error) => {
  console.error('アプリケーションエラー:', error);
  process.exit(1);
});
