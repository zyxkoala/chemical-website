import { useTranslations } from 'next-intl';
import type { LocalizedProduct } from '@/types/product';

export function SpecsPanel({ product }: { product: LocalizedProduct }) {
  const t = useTranslations('productDetail');
  const hasMethodStandard = product.specs.some(spec => spec.methodStandard);

  return (
    <div className="bg-white border border-border-light rounded-card p-8">
      <h2 className="text-card-title text-navy-deep mb-6">{t('specsHeading')}</h2>
      {hasMethodStandard ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border-light">
                <th className="py-3 pr-4 text-body font-semibold text-gray-body">
                  {t('specTable.standard')}
                </th>
                <th className="py-3 pr-4 text-body font-semibold text-gray-body">
                  {t('specTable.value')}
                </th>
                <th className="py-3 text-body font-semibold text-gray-body">
                  {t('specTable.methodStandard')}
                </th>
              </tr>
            </thead>
            <tbody>
              {product.specs.map((spec, i) => (
                <tr key={i} className="border-b border-border-light last:border-b-0">
                  <th scope="row" className="py-4 pr-4 align-top text-body font-normal text-gray-body">
                    {spec.label}
                  </th>
                  <td className="py-4 pr-4 align-top text-body text-navy-deep">
                    {formatSpecValue(spec.value)}
                  </td>
                  <td className="py-4 align-top text-body text-navy-deep">{spec.methodStandard ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <dl className="divide-y divide-border-light">
          {product.specs.map((spec, i) => (
            <div key={i} className="grid grid-cols-2 gap-4 py-3">
              <dt className="text-body text-gray-body">{spec.label}</dt>
              <dd className="text-body text-navy-deep">{formatSpecValue(spec.value)}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function formatSpecValue(value: string) {
  const zhMatch = value.match(/^指标：(.+)；结果：(.+)$/);
  if (zhMatch) {
    const [, limit, result] = zhMatch;
    if (limit === '报告') {
      return `检测结果：${result}（质量指标：报告）`;
    }

    return `质量指标：${limit}；检测结果：${result}`;
  }

  const enMatch = value.match(/^Limit: (.+); Result: (.+)$/);
  if (enMatch) {
    const [, limit, result] = enMatch;
    if (limit.toLowerCase() === 'report' || limit === '报告') {
      return `Result: ${result} (Limit: report)`;
    }
  }

  return value;
}
