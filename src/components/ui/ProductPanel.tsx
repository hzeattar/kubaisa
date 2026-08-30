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

  return (
    <div className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-[#050a15]/95 backdrop-blur-md border-l border-[#d4af37]/20 p-6 flex flex-col pointer-events-auto transform transition-transform shadow-2xl overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-2xl font-serif text-[#d4af37]">
          {language === 'ar' ? product.nameAr : product.nameEn}
        </h2>
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
            {language === 'ar' ? product.descriptionAr : product.descriptionEn}
          </p>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-[#f3e5ab] font-semibold mb-2">{t('product', 'dimensions')}</h3>
          <p className="text-white/70">{product.dimensions}</p>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-[#f3e5ab] font-semibold mb-2">{t('product', 'materials')}</h3>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            {product.materials.map((mat, i) => (
              <li key={i}>{mat}</li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-[#f3e5ab] font-semibold mb-2">{t('product', 'colors')}</h3>
          <div className="flex gap-2">
            {product.colors.map((color, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 rounded text-white/80 border border-white/10">
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>

      {product.inquiryEnabled && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <button className="w-full py-3 bg-[#d4af37] text-[#050a15] rounded font-semibold hover:bg-[#f3e5ab] transition-colors">
            {t('product', 'inquiry')}
          </button>
        </div>
      )}
    </div>
  );
};
