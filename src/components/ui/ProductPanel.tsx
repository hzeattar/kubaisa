import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useTranslation } from '../../hooks/useTranslation';
import { products } from '../../data/products';

export const ProductPanel: React.FC = () => {
  const { selectedProduct, setSelectedProduct, language } = useAppStore();
  const { t } = useTranslation();

  if (!selectedProduct) return null;

  const product = products[selectedProduct];
  if (!product) return null;

  const name = language === 'ar' ? product.nameAr : product.nameEn;
  const description = language === 'ar' ? product.descriptionAr : product.descriptionEn;
  const dimensions = language === 'ar' ? product.dimensionsAr : product.dimensionsEn;
  const materials = language === 'ar' ? product.materialsAr : product.materialsEn;
  const colors = language === 'ar' ? product.colorsAr : product.colorsEn;
  const isRtl = language === 'ar';

  const handleInquiry = () => {
    // Generate WhatsApp link if possible. For now, open a mailto or just log
    const whatsappNumber = (import.meta as any).env.VITE_WHATSAPP_NUMBER || '';
    if (whatsappNumber) {
      const message = language === 'ar' 
        ? `مرحباً، أود الاستفسار عن ${name}`
        : `Hello, I would like to inquire about ${name}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      console.log('Inquiry clicked for', name);
    }
  };

  return (
    <div className={`absolute ${isRtl ? 'left-0 border-r' : 'right-0 border-l'} top-0 bottom-0 w-full md:w-[400px] bg-[#050a15]/95 backdrop-blur-md border-[#d4af37]/20 p-6 flex flex-col pointer-events-auto transform transition-transform shadow-2xl overflow-y-auto`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-serif text-[#d4af37]">
            {name}
          </h2>
          {product.dataStatus === 'proxy' && (
            <span className="inline-block mt-2 px-2 py-1 bg-red-900/30 text-red-200 text-xs rounded border border-red-900/50">
              {language === 'ar' ? 'نموذج استرشادي' : 'Proxy Model'}
            </span>
          )}
        </div>
        <button 
          onClick={() => setSelectedProduct(null)}
          className="text-white/50 hover:text-white p-2"
        >
          {t('ui', 'close')}
        </button>
      </div>

      <div className="space-y-6 flex-1 text-sm">
        <div>
          <p className="text-[#fdfbf7]/80 leading-relaxed">
            {description}
          </p>
        </div>

        {dimensions && (
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-[#f3e5ab] font-semibold mb-2">{t('product', 'dimensions')}</h3>
            <p className="text-white/70">{dimensions}</p>
          </div>
        )}

        {materials && materials.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-[#f3e5ab] font-semibold mb-2">{t('product', 'materials')}</h3>
            <ul className="list-disc list-inside text-white/70 space-y-1">
              {materials.map((mat, i) => (
                <li key={i}>{mat}</li>
              ))}
            </ul>
          </div>
        )}

        {colors && colors.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-[#f3e5ab] font-semibold mb-2">{t('product', 'colors')}</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 rounded text-white/80 border border-white/10">
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {product.inquiryEnabled && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <button 
            onClick={handleInquiry}
            className="w-full py-3 bg-[#d4af37] text-[#050a15] rounded font-semibold hover:bg-[#f3e5ab] transition-colors"
          >
            {t('product', 'inquiry')}
          </button>
        </div>
      )}
    </div>
  );
};
