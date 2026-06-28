import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { PageHero } from '@/components/ui/PageHero';
import { site } from '@/content/site';
import type { Locale } from '@/types/locale';

type Props = {
  locale: Locale;
  title: string;
  docName: 'privacy' | 'disclaimer' | 'terms';
};

const tokens: Record<string, string> = {
  email: site.email,
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  whatsappUrl: site.whatsappUrl,
  address: site.address,
  domain: site.domain,
  siteName: site.name,
};

function renderTokens(source: string): string {
  return source.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) => {
    const value = tokens[key];
    return typeof value === 'string' ? value : match;
  });
}

export function LegalPage({ locale, title, docName }: Props) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'legal', `${docName}.${locale}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const html = sanitizeHtml(marked.parse(renderTokens(raw), { async: false }) as string, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    allowedAttributes: { a: ['href', 'target', 'rel'], ...sanitizeHtml.defaults.allowedAttributes },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: (_tagName, attribs) => {
        const href = attribs.href ?? '';
        const isExternal = href.startsWith('http');
        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
          },
        };
      },
    },
  });

  return (
    <>
      <PageHero locale={locale} title={title} />
      <article className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-6 legal-body">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>
    </>
  );
}
