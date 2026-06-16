import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { PageHero } from '@/components/ui/PageHero';
import type { Locale } from '@/types/locale';

type Props = {
  locale: Locale;
  title: string;
  docName: 'privacy' | 'disclaimer';
};

export function LegalPage({ locale, title, docName }: Props) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'legal', `${docName}.${locale}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const html = marked.parse(raw, { async: false }) as string;

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
