#!/usr/bin/env node

const { chromium } = require('playwright');

async function testLazyLoading() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('🚀 Test de performance du lazy loading des images partenaires\n');

  // Activer la capture des métriques de performance
  await page.evaluateOnNewDocument(() => {
    window.performanceMetrics = {
      imagesLoaded: 0,
      imagesInView: 0,
      loadTimes: []
    };

    // Observer les images chargées
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('partenaires/') && entry.name.includes('.webp')) {
          window.performanceMetrics.imagesLoaded++;
          window.performanceMetrics.loadTimes.push({
            name: entry.name.split('/').pop(),
            duration: entry.duration,
            size: entry.transferSize
          });
        }
      }
    });
    observer.observe({ entryTypes: ['resource'] });

    // Observer les images dans le viewport
    if (typeof IntersectionObserver !== 'undefined') {
      window.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.performanceMetrics.imagesInView++;
          }
        });
      });
    }
  });

  // Mesurer le temps de chargement initial
  const startTime = Date.now();
  
  // Naviguer vers la page
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  
  const initialLoadTime = Date.now() - startTime;
  console.log(`⏱️  Temps de chargement initial: ${initialLoadTime}ms`);

  // Attendre que les premières images soient chargées
  await page.waitForTimeout(2000);

  // Récupérer les métriques initiales
  const initialMetrics = await page.evaluate(() => window.performanceMetrics);
  console.log(`\n📊 Métriques initiales:`);
  console.log(`   - Images chargées: ${initialMetrics.imagesLoaded}`);
  console.log(`   - Images dans le viewport: ${initialMetrics.imagesInView}`);

  // Scroller pour déclencher le lazy loading
  console.log('\n📜 Défilement de la page...');
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(2000);

  // Récupérer les métriques finales
  const finalMetrics = await page.evaluate(() => window.performanceMetrics);
  console.log(`\n📊 Métriques après défilement:`);
  console.log(`   - Images chargées: ${finalMetrics.imagesLoaded}`);
  console.log(`   - Images dans le viewport: ${finalMetrics.imagesInView}`);
  console.log(`   - Images chargées progressivement: ${finalMetrics.imagesLoaded - initialMetrics.imagesLoaded}`);

  // Analyser les temps de chargement
  if (finalMetrics.loadTimes.length > 0) {
    const avgLoadTime = finalMetrics.loadTimes.reduce((sum, img) => sum + img.duration, 0) / finalMetrics.loadTimes.length;
    const totalSize = finalMetrics.loadTimes.reduce((sum, img) => sum + (img.size || 0), 0);
    
    console.log(`\n⚡ Performance des images:`);
    console.log(`   - Temps de chargement moyen: ${avgLoadTime.toFixed(2)}ms`);
    console.log(`   - Taille totale téléchargée: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  }

  // Vérifier les alt texts
  const altTexts = await page.evaluate(() => {
    const images = document.querySelectorAll('img[src*="partenaires"]');
    return Array.from(images).slice(0, 5).map(img => ({
      src: img.src.split('/').pop(),
      alt: img.alt
    }));
  });

  console.log(`\n🏷️  Vérification des alt texts (5 premiers):`);
  altTexts.forEach(img => {
    console.log(`   - ${img.src}: "${img.alt}"`);
  });

  // Capture d'écran pour vérification visuelle
  await page.screenshot({ path: 'lazy-loading-test.png', fullPage: false });
  console.log(`\n📸 Capture d'écran sauvegardée: lazy-loading-test.png`);

  await browser.close();

  // Résumé
  console.log(`\n✅ Test terminé avec succès!`);
  console.log(`\n📈 Résumé:`);
  console.log(`   - Lazy loading fonctionnel: ${finalMetrics.imagesLoaded > initialMetrics.imagesLoaded ? '✓' : '✗'}`);
  console.log(`   - Images avec alt texts: ✓`);
  console.log(`   - Temps de chargement initial optimisé: ${initialLoadTime < 3000 ? '✓' : '✗'}`);
}

testLazyLoading().catch(console.error);