import fs from 'fs'
import path from 'path'

async function fetchDailyEvent(): Promise<{ event: string, timestamp: string }> {
  try {
    const events = [
      '何もなかった日',
      '東京湾に隕石落下',
      '近所の公園で虹を見た',
      'コンビニの新商品を試した',
      '突然の雨に遭遇'
    ]
    return {
      event: events[Math.floor(Math.random() * events.length)],
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('イベント取得中にエラーが発生しました:', error)
    throw error
  }
}　

async function generateDailyContent() {
  try {
    const { event, timestamp } = await fetchDailyEvent()
    const date = new Date(timestamp)
    const fileName = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.md`
    
    const contentDir = path.join(process.cwd(), 'content')
    if (!fs.existsSync(contentDir)) {
      await fs.promises.mkdir(contentDir, { recursive: true })
    }
    
    const content = `### ${date.toLocaleDateString('ja-JP')}の出来事\n\n${event}\n\n_更新時刻: ${timestamp}_`
    
    await fs.promises.writeFile(path.join(contentDir, fileName), content)
    console.log(`Generated content for ${fileName}`)
  } catch (error) {
    console.error('コンテンツ生成中にエラーが発生しました:', error)
    throw error
  }
}

generateDailyContent().catch(error => {
  console.error('アプリケーションエラー:', error)
  process.exit(1)
})