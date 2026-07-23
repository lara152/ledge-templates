/*
 * site.config.json validator — the config is the single source of truth for the
 * whole site, so we give it teeth: `next.config.js` calls validateConfig() at the
 * top of every build, and a structurally invalid config throws → the build fails
 * loudly instead of shipping a broken site.
 *
 * HARD errors (throw / exit 1): things that make the site incorrect or un-renderable.
 * SOFT warnings (print, exit 0): empty fields that produce a thinner-but-valid site.
 *
 * Run standalone:  npm run validate   (or)  node scripts/validate-config.cjs
 */
'use strict';

const ALLOWED_CTAS = ['call', 'book', 'form', 'purchase', 'credibility'];
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

/**
 * Validate a parsed site.config.json object.
 * @param {any} config
 * @returns {{ errors: string[], warnings: string[] }}
 * @throws Error when there are hard errors.
 */
function validateConfig(config) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(config)) {
    throw new Error('site.config.json must be a JSON object.');
  }

  // --- template ---
  const ALLOWED_TEMPLATES = ['classic', 'studio', 'meridian', 'greenleaf'];
  if (config.template != null && !ALLOWED_TEMPLATES.includes(config.template)) {
    errors.push(`\`template\` must be one of ${ALLOWED_TEMPLATES.join(' | ')} (got "${config.template}").`);
  }

  // --- business ---
  const business = config.business;
  if (!isPlainObject(business)) {
    errors.push('`business` is required and must be an object.');
  } else {
    if (!isNonEmptyString(business.name)) {
      errors.push('`business.name` is required — it drives titles, schema, and the header.');
    }
    if (!isNonEmptyString(business.tagline)) warnings.push('`business.tagline` is empty — the hero will read flat.');
    if (!isNonEmptyString(business.oneLineDescription)) warnings.push('`business.oneLineDescription` is empty — used in meta descriptions and llms.txt.');
  }

  // --- goal / primaryCTA ---
  const goal = config.goal;
  if (!isPlainObject(goal) || !isNonEmptyString(goal.primaryCTA)) {
    errors.push('`goal.primaryCTA` is required.');
  } else if (!ALLOWED_CTAS.includes(goal.primaryCTA)) {
    errors.push(`\`goal.primaryCTA\` must be one of ${ALLOWED_CTAS.join(' | ')} (got "${goal.primaryCTA}").`);
  }

  // --- contact ---
  const contact = config.contact;
  if (!isPlainObject(contact)) {
    warnings.push('`contact` is missing — the site will have no phone/email/address.');
  } else {
    if (goal && goal.primaryCTA === 'call' && !isNonEmptyString(contact.phone)) {
      errors.push('`goal.primaryCTA` is "call" but `contact.phone` is empty — the primary CTA would be dead.');
    }
    if (goal && goal.primaryCTA === 'form' && !isNonEmptyString(contact.email) && !isNonEmptyString(contact.formEndpoint)) {
      warnings.push('`goal.primaryCTA` is "form" but neither `contact.email` nor `contact.formEndpoint` is set — the form has nowhere to send.');
    }
    if (contact.address != null && !isPlainObject(contact.address)) {
      errors.push('`contact.address` must be an object when present.');
    }
    if (isPlainObject(contact.address) && !isNonEmptyString(contact.address.city)) {
      warnings.push('`contact.address.city` is empty — weakens local SEO and the NAP block.');
    }
    if (contact.social != null && !Array.isArray(contact.social)) {
      errors.push('`contact.social` must be an array of URLs when present.');
    }
  }

  // --- services ---
  if (config.services != null) {
    if (!Array.isArray(config.services)) {
      errors.push('`services` must be an array.');
    } else {
      config.services.forEach((s, i) => {
        if (!isPlainObject(s) || !isNonEmptyString(s.name)) {
          errors.push(`\`services[${i}].name\` is required.`);
        }
      });
      if (config.services.length === 0) warnings.push('`services` is empty — the Services section will be hidden.');
    }
  } else {
    warnings.push('`services` is missing — the Services section will be hidden.');
  }

  // --- audience / FAQ ---
  const audience = config.audience;
  if (isPlainObject(audience) && audience.topQuestions != null) {
    if (!Array.isArray(audience.topQuestions)) {
      errors.push('`audience.topQuestions` must be an array.');
    } else {
      let answered = 0;
      audience.topQuestions.forEach((q, i) => {
        if (typeof q === 'string') {
          if (isNonEmptyString(q)) {
            warnings.push(`\`audience.topQuestions[${i}]\` is a bare question with no answer — it will be dropped from the FAQ and FAQPage schema (schema requires an answer that matches the visible text).`);
          }
        } else if (isPlainObject(q)) {
          if (!isNonEmptyString(q.question)) errors.push(`\`audience.topQuestions[${i}].question\` is required.`);
          if (isNonEmptyString(q.question) && isNonEmptyString(q.answer)) answered += 1;
          else if (isNonEmptyString(q.question)) {
            warnings.push(`\`audience.topQuestions[${i}]\` has no answer — dropped from FAQ + schema.`);
          }
        } else {
          errors.push(`\`audience.topQuestions[${i}]\` must be a string or { question, answer } object.`);
        }
      });
      if (audience.topQuestions.length > 0 && answered === 0) {
        warnings.push('No FAQ item has an answer — the FAQ section and FAQPage schema will be empty.');
      }
    }
  }

  // --- proof ---
  if (isPlainObject(config.proof)) {
    const proof = config.proof;
    if (proof.testimonials != null && !Array.isArray(proof.testimonials)) errors.push('`proof.testimonials` must be an array.');
    if (proof.credentials != null && !Array.isArray(proof.credentials)) errors.push('`proof.credentials` must be an array.');
    if (proof.notableClients != null && !Array.isArray(proof.notableClients)) errors.push('`proof.notableClients` must be an array.');
  }

  // --- brand ---
  if (isPlainObject(config.brand)) {
    const colors = config.brand.colors;
    if (colors != null) {
      if (!isPlainObject(colors)) {
        errors.push('`brand.colors` must be an object.');
      } else {
        for (const key of ['primary', 'secondary', 'accent']) {
          const val = colors[key];
          if (isNonEmptyString(val) && val.trim().startsWith('#') && !HEX_RE.test(val.trim())) {
            errors.push(`\`brand.colors.${key}\` ("${val}") is not a valid hex color.`);
          }
        }
      }
    } else {
      warnings.push('`brand.colors` not set — the site will use the default theme palette.');
    }
    if (!isNonEmptyString(config.brand.logoPath)) warnings.push('`brand.logoPath` not set — the header will show the business name as a wordmark.');
  } else {
    warnings.push('`brand` not set — using the default theme.');
  }

  // --- deploy ---
  if (isPlainObject(config.deploy)) {
    if (!isNonEmptyString(config.deploy.domain) && !isNonEmptyString(config.deploy.subdomainFallback)) {
      warnings.push('Neither `deploy.domain` nor `deploy.subdomainFallback` is set — canonical URLs, sitemap, and OG tags will fall back to a placeholder host. Set one before going live.');
    }
  } else {
    warnings.push('`deploy` not set — using a placeholder host for canonical/sitemap URLs.');
  }

  // --- meta ---
  if (!isPlainObject(config.meta) || !isNonEmptyString(config.meta.lastUpdated)) {
    warnings.push('`meta.lastUpdated` is empty — the visible "Last updated" date and llms.txt will fall back to build date.');
  }

  if (errors.length > 0) {
    const msg =
      '\n✖ site.config.json is invalid:\n' +
      errors.map((e) => `  - ${e}`).join('\n') +
      '\n';
    throw new Error(msg);
  }

  return { errors, warnings };
}

// Standalone CLI mode
if (require.main === module) {
  const path = require('path');
  const configPath = path.join(__dirname, '..', 'site.config.json');
  let config;
  try {
    config = require(configPath);
  } catch (e) {
    console.error(`✖ Could not read/parse ${configPath}: ${e.message}`);
    process.exit(1);
  }
  try {
    const { warnings } = validateConfig(config);
    if (warnings.length > 0) {
      console.warn('⚠ site.config.json warnings:');
      warnings.forEach((w) => console.warn(`  - ${w}`));
    }
    console.log('✔ site.config.json is valid.');
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

module.exports = { validateConfig, ALLOWED_CTAS };
