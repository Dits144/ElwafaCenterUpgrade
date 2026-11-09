
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://syahdicargo.com/', { waitUntil: 'networkidle', timeout: 30000 }).catch(e => console.log('goto err', e));
  
  console.log('Title:', await page.title());
  
  // Inspect scripts & libraries loaded
  const scripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script')).map(s => s.src || s.innerText.slice(0, 100));
  });
  console.log('Script count:', scripts.length);
  const externalScripts = scripts.filter(s => typeof s === 'string' && s.startsWith('http'));
  console.log('External scripts:', externalScripts);

  // Check animation libraries in window
  const windowVars = await page.evaluate(() => {
    return {
      hasGSAP: !!window.gsap,
      hasAOS: !!window.AOS,
      hasLenis: !!window.Lenis,
      hasFramerMotion: !!window.__framer_importFromPackage || !!document.querySelector('[data-framer-name]'),
      framework: window.__NEXT_DATA__ ? 'Next.js' : (window.__NUXT__ ? 'Nuxt' : (document.getElementById('root') ? 'React' : 'Other')),
    };
  });
  console.log('Window vars:', windowVars);

  // Check CSS animations, keyframes, transitions
  const animationDetails = await page.evaluate(() => {
    const keyframes = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            keyframes.push(rule.name);
          }
        }
      } catch (e) {}
    }
    
    // Check elements with transition or animation or interesting styling
    const styledElements = Array.from(document.querySelectorAll('*')).map(el => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className?.toString?.() || '',
        animation: cs.animationName !== 'none' ? cs.animationName : null,
        transition: cs.transitionProperty !== 'all' && cs.transitionProperty !== 'none' ? cs.transition : null,
        backdropFilter: cs.backdropFilter !== 'none' ? cs.backdropFilter : null,
        boxShadow: cs.boxShadow !== 'none' ? cs.boxShadow : null,
      };
    }).filter(x => x.animation || x.backdropFilter || (x.className && (x.className.includes('animate') || x.className.includes('motion') || x.className.includes('hover:'))));
    
    return {
      keyframes: [...new Set(keyframes)],
      sampleClasses: Array.from(new Set(Array.from(document.querySelectorAll('[class]')).flatMap(el => (el.className?.toString?.() || '').split(/\s+/)).filter(c => c.includes('animate') || c.includes('transition') || c.includes('duration') || c.includes('hover') || c.includes('blur') || c.includes('gradient') || c.includes('shadow') || c.includes('rounded')))).slice(0, 50),
      bodyClasses: document.body.className,
    };
  });
  console.log('Animation Details:', JSON.stringify(animationDetails, null, 2));

  // Structure / visual sections of syahdicargo.com
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section, header, nav, footer, main > div')).map(el => ({
      tag: el.tagName,
      id: el.id,
      className: el.className?.toString?.() || '',
      text: el.innerText.slice(0, 150).replace(/\n/g, ' '),
    }));
  });
  console.log('Sections:', JSON.stringify(sections.slice(0, 15), null, 2));

  await browser.close();
})();
