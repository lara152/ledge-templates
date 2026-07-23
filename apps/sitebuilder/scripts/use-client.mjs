#!/usr/bin/env node
/*
 * use-client — pick which client's site to build.
 *
 * The "one repo, many clients" model: every client is a folder under clients/<slug>/
 * holding their own site.config.json. This script copies a chosen client's config to
 * the repo root as site.config.json (the file the app builds from), so the same code
 * builds any client. Edit clients/<slug>/site.config.json — never the root copy.
 *
 *   node scripts/use-client.mjs                # list all clients + show the active one
 *   node scripts/use-client.mjs sage-and-stone # make that client the active build target
 *
 * Then:  npm run dev   (preview)   or   npm run build   (static export in ./out)
 */
'use strict';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientsDir = path.join(root, 'clients');
const activePath = path.join(root, 'site.config.json');

/** Every clients/<slug>/ that contains a site.config.json. */
function listClients() {
  if (!fs.existsSync(clientsDir)) return [];
  return fs
    .readdirSync(clientsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(clientsDir, d.name, 'site.config.json')))
    .map((d) => d.name)
    .sort();
}

/** Best-effort name of the client currently copied into the root config. */
function activeBusinessName() {
  try {
    return JSON.parse(fs.readFileSync(activePath, 'utf8'))?.business?.name ?? null;
  } catch {
    return null;
  }
}

function printList() {
  const clients = listClients();
  const active = activeBusinessName();
  if (clients.length === 0) {
    console.log('No clients yet. Add one:  clients/<slug>/site.config.json');
    return;
  }
  console.log('Clients (one folder each under clients/):\n');
  for (const slug of clients) {
    let name = '';
    try {
      name = JSON.parse(
        fs.readFileSync(path.join(clientsDir, slug, 'site.config.json'), 'utf8'),
      )?.business?.name;
    } catch {
      name = '(unreadable config)';
    }
    console.log(`  • ${slug}${name ? `  —  ${name}` : ''}`);
  }
  console.log(`\nActive site.config.json: ${active ?? '(none/invalid)'}`);
  console.log('\nSelect one:  node scripts/use-client.mjs <slug>');
}

const slug = process.argv[2];

if (!slug || slug === '--list' || slug === '-l') {
  printList();
  process.exit(0);
}

const source = path.join(clientsDir, slug, 'site.config.json');
if (!fs.existsSync(source)) {
  console.error(`✖ No client "${slug}" (looked for ${path.relative(root, source)}).\n`);
  printList();
  process.exit(1);
}

fs.copyFileSync(source, activePath);
const name = activeBusinessName();
console.log(`✔ Active client → ${slug}${name ? `  (${name})` : ''}`);
console.log('  Next:  npm run dev   (preview)   or   npm run build   (export ./out)');
