const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const references = [
  { name: 'Mystik Sauna', url: 'https://mystiksauna.re', filename: 'mystiksauna-re.webp' },
  { name: 'Sogitec Énergie', url: 'https://sogitec-energie.fr', filename: 'sogitec-energie-fr.webp' },
  { name: 'EMPC', url: 'https://empc.re', filename: 'empc-re.webp' },
  { name: 'Sabaguina', url: 'https://sabaguina.com', filename: 'sabaguina-com.webp' },
  { name: 'La Boussole du Manager', url: 'https://laboussoledumanager.re', filename: 'laboussoledumanager-re.webp' },
  { name: 'Bernard Contrain', url: 'https://bernardcontrain.com', filename: 'bernardcontrain-com.webp' },
  { name: 'Pascal Destercke', url: 'https://pascal-destercke.com', filename: 'pascal-destercke-com.webp' },
  { name: 'Velocit AI', url: 'https://velocit-ai.fr', filename: 'velocit-ai-fr.webp' },
  { name: 'CBD Run', url: 'https://cbd-run.com', filename: 'cbd-run-com.webp' },
  { name: 'Monsterphone', url: 'https://monster-phone.re', filename: 'monster-phone-re.webp' },
  { name: 'Parapente Réunion', url: 'https://parapente-reunion.fr', filename: 'parapente-reunion-fr.webp' },
  { name: "Click'n Van", url: 'https://clicknvan.com', filename: 'clicknvan-com.webp' },
  { name: 'Zen Eat Yoga', url: 'https://zeneatyoga.com', filename: 'zeneatyoga-com.webp' },
  { name: 'Investis DOM', url: 'https://investis-dom.com', filename: 'investis-dom-com.webp' },
  { name: 'CMX Factory', url: 'https://cmxfactory.com', filename: 'cmxfactory-com.webp' },
]

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'references')
const WIDTH = 1280
const HEIGHT = 800

async function generateScreenshots() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  for (const ref of references) {
    const outputPath = path.join(OUTPUT_DIR, ref.filename)

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${ref.name} (already exists)`)
      continue
    }

    try {
      console.log(`📸 Capturing ${ref.name} (${ref.url})...`)
      const page = await browser.newPage()
      await page.setViewport({ width: WIDTH, height: HEIGHT })
      await page.goto(ref.url, { waitUntil: 'networkidle2', timeout: 30000 })
      await new Promise(r => setTimeout(r, 2000))
      await page.screenshot({
        path: outputPath,
        type: 'webp',
        quality: 80,
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
      })
      await page.close()
      console.log(`✅ ${ref.name} saved to ${ref.filename}`)
    } catch (error) {
      console.error(`❌ Failed to capture ${ref.name}: ${error.message}`)
    }
  }

  await browser.close()
  console.log('\n🎉 Screenshot generation complete!')
}

generateScreenshots().catch(console.error)
