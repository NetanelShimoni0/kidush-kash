/**
 * Hebrew / RTL audit.
 *
 * Fails the build if any user-facing string in the UI contains Latin letters.
 * Scans JSX text nodes plus the attributes that surface text to a user
 * (aria-label, placeholder, title, alt).
 *
 * Run with: npm run audit:rtl
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')

/** Strings that are allowed to contain Latin letters even in the UI. */
const ALLOWLIST = new Set([])

/** Files whose JSX carries no user-facing copy (pure vector artwork). */
const SKIP_FILES = new Set(['src/components/HeroDecor.tsx'])

const LATIN = /[A-Za-z]/
const ENTITY = /&[a-zA-Z]+;|&#\d+;/g

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (full.endsWith('.tsx')) out.push(full)
  }
  return out
}

/** Removes HTML entities so `&quot;` is not mistaken for English copy. */
function clean(value) {
  return value.replace(ENTITY, '').trim()
}

function lineOf(source, index) {
  return source.slice(0, index).split('\n').length
}

const problems = []

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  if (SKIP_FILES.has(rel)) continue

  const source = readFileSync(file, 'utf8')

  // 1. JSX text nodes: text between an opening tag and a closing tag (or a <br />).
  //    Requiring the trailing `</` or `<br` keeps TypeScript generics and
  //    comparison operators out of the results.
  for (const match of source.matchAll(/>([^<>{}]+)<(?=\/|br)/g)) {
    const text = clean(match[1])
    if (!text || ALLOWLIST.has(text)) continue
    if (LATIN.test(text)) {
      problems.push({ rel, line: lineOf(source, match.index), kind: 'טקסט', text })
    }
  }

  // 2. User-visible attributes.
  for (const match of source.matchAll(/\b(aria-label|placeholder|title|alt)\s*=\s*"([^"]*)"/g)) {
    const text = clean(match[2])
    if (!text || ALLOWLIST.has(text)) continue
    if (LATIN.test(text)) {
      problems.push({ rel, line: lineOf(source, match.index), kind: match[1], text })
    }
  }
}

if (problems.length > 0) {
  console.error(`\nFound ${problems.length} user-facing string(s) containing Latin letters:\n`)
  for (const p of problems) {
    console.error(`  ${p.rel}:${p.line}  [${p.kind}]  ${p.text}`)
  }
  console.error('\nAll UI copy must be written in Hebrew.\n')
  process.exit(1)
}

console.log('Hebrew / RTL audit passed: no Latin-letter UI strings found.')
