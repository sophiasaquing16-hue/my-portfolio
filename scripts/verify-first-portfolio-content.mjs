import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const home = read('src/pages/Home.tsx');
const nav = read('src/sections/Navigation.tsx');
const hero = read('src/sections/Hero.tsx');
const work = read('src/sections/SelectedWork.tsx');
const contact = read('src/sections/Contact.tsx');
const footer = read('src/sections/Footer.tsx');

assert.ok(!home.includes("import Experience from '../sections/Experience';"), 'Home should not import Experience.');
assert.ok(!home.includes('<Experience />'), 'Home should not render the Experience section.');

assert.ok(!nav.includes("{ label: 'Experience', target: '#experience' }"), 'Navigation should not include an Experience link.');
assert.ok(nav.includes('Say Hello'), 'Navigation CTA should sound casual and beginner-friendly.');

assert.ok(hero.includes('A simple portfolio while I learn the basics'), 'Hero should use simpler beginner-facing headline copy.');
assert.ok(hero.includes('put together for me as a starting point'), 'Hero should make it clear this site is a starting point, not a record of prior work.');

assert.ok(work.includes('My First Portfolio Website'), 'Selected work should feature the portfolio itself.');
assert.ok(work.includes('Portfolio / Personal Site / First Project'), 'Project tags should describe a beginner-first portfolio honestly.');
assert.ok(work.includes('First website'), 'Portfolio card should include plain beginner-friendly details.');
assert.ok(work.includes('Personal portfolio'), 'Portfolio card should include simple project details.');
assert.ok(work.includes('Simple project card'), 'Portfolio section should explicitly describe the simpler static format.');
assert.ok(!work.includes("number: '02'"), 'Selected work should not include multiple fake projects.');
assert.ok(!work.includes('useState'), 'Portfolio section should not need modal state for the simpler static version.');
assert.ok(!work.includes('useCallback'), 'Portfolio section should not use modal callbacks in the simpler static version.');
assert.ok(!work.includes('useMemo'), 'Portfolio section should not use starfield memoization in the simpler static version.');
assert.ok(!work.includes('selectedIdx'), 'Portfolio section should not include modal selection state.');
assert.ok(!work.includes('star-pulse'), 'Portfolio section should not include star animation.');
assert.ok(!work.includes('requestAnimationFrame'), 'Portfolio section should not include orbital animation loops.');
assert.ok(!work.includes('Site Details'), 'Portfolio section should not include a modal details panel.');

assert.ok(contact.includes('I am new to coding'), 'Contact should reflect zero prior experience in plain language.');
assert.ok(!contact.includes('internships, junior roles'), 'Contact should not imply job-ready experience.');

assert.ok(footer.includes('Still learning the basics'), 'Footer subtitle should feel informal and beginner-realistic.');
assert.ok(footer.includes('LEARNING STEP BY STEP'), 'Footer badge should match the beginner positioning.');
assert.ok(footer.includes('First website, more to come.'), 'Footer should describe the site as a starting point.');
assert.ok(!footer.includes('Download CV'), 'Footer should not advertise a CV for a first project.');

console.log('First-portfolio content check passed.');
