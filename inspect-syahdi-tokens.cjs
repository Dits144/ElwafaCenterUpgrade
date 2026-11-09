
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://syahdicargo.com/', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Inspect the hero elements, ticker/marquee, card hover effects, buttons, navbar
  const designTokens = await page.evaluate(() => {
    const nav = document.querySelector('nav') || document.querySelector('header') || document.querySelector('div[style*="position: fixed"]') || document.querySelector('div[style*="backdrop-filter"]');
    
    // Find all marquee / ticker elements (e.g. Mukalla, Tareem, Seyyun...)
    const tickers = Array.from(document.querySelectorAll('*')).filter(el => {
      const text = el.innerText || '';
      return text.includes('Mukalla') && text.includes('Tareem');
    }).map(el => ({
      tag: el.tagName,
      style: el.getAttribute('style'),
      computed: {
        display: window.getComputedStyle(el).display,
        overflow: window.getComputedStyle(el).overflow,
        animation: window.getComputedStyle(el).animation,
      }
    }));

    // Find card elements (features, cara kerja, etc.)
    const cards = Array.from(document.querySelectorAll('div')).filter(el => {
      const cs = window.getComputedStyle(el);
      return cs.borderRadius && parseInt(cs.borderRadius) >= 12 && cs.borderWidth && cs.borderWidth !== '0px';
    }).slice(0, 10).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        bg: cs.backgroundColor,
        border: cs.border,
        radius: cs.borderRadius,
        shadow: cs.boxShadow,
        backdrop: cs.backdropFilter,
        padding: cs.padding,
        text: el.innerText.slice(0, 50).replace(/\n/g, ' ')
      };
    });

    // Check typography and colors
    const body = window.getComputedStyle(document.body);
    const h1 = document.querySelector('h1') ? window.getComputedStyle(document.querySelector('h1')) : null;
    const button = document.querySelector('button, a[href*="wa.me"], a[href*="cek"]') ? window.getComputedStyle(document.querySelector('button, a[href*="wa.me"], a[href*="cek"]')) : null;

    return {
      bodyBg: body.backgroundColor,
      bodyColor: body.color,
      bodyFont: body.fontFamily,
      h1: h1 ? { font: h1.fontFamily, size: h1.fontSize, weight: h1.fontWeight, letterSpacing: h1.letterSpacing } : null,
      button: button ? { bg: button.backgroundColor, color: button.color, radius: button.borderRadius, padding: button.padding, shadow: button.boxShadow } : null,
      cards: cards.slice(0, 6),
      tickers: tickers.slice(0, 3)
    };
  });

  console.log('Design Tokens:', JSON.stringify(designTokens, null, 2));

  // Check how Framer animations work on the page (motion transform, opacity, transition)
  const motionElements = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('[data-framer-name], [style*="transform"], [style*="opacity"]').forEach(el => {
      const style = el.getAttribute('style') || '';
      if (style.includes('transform') || style.includes('opacity') || style.includes('will-change')) {
        list.push({
          name: el.getAttribute('data-framer-name') || el.tagName,
          style: style.slice(0, 150)
        });
      }
    });
    return list.slice(0, 15);
  });
  console.log('Motion elements sample:', JSON.stringify(motionElements, null, 2));

  await browser.close();
})();
