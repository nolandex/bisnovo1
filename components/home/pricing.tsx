'use client';

import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { ExternalLink, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';

// Komponen Modal dan OrderingInstructions tidak diubah, jadi saya sembunyikan untuk keringkasan
// ... (Modal and OrderingInstructions components remain the same)
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

function Modal({ isOpen, onClose, children, size = 'full' }: ModalProps) {
  const { theme } = useTheme();
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm rounded-xl',
    md: 'max-w-md rounded-xl',
    lg: 'max-w-2xl rounded-xl',
    full: 'max-w-full w-full h-[90vh] rounded-xl',
  }[size];

  const contentPadding = size === 'full' ? 'p-0' : 'p-4';

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4`}>
      <div
        className={`${sizeClasses} ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } overflow-hidden shadow-2xl relative ${contentPadding}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 z-10 bg-black/20 hover:bg-black/40 ${
            theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-200 hover:text-white'
          }`}
        >
          <X className='h-5 w-5' />
        </button>
        {children}
      </div>
    </div>
  );
}

function OrderingInstructions() {
  const { theme } = useTheme();
  return (
    <div className='space-y-4 p-4'>
      <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Cara Pemesanan</h3>
      <div className='space-y-3'>
        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            1. Pilih Paket
          </h4>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            2. Konsultasi
          </h4>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Diskusikan kebutuhan spesifik dan detail proyek dengan tim kami
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            3. Pembayaran
          </h4>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Lakukan pembayaran sesuai paket yang dipilih
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            4. Pengerjaan
          </h4>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Tim kami akan mulai mengerjakan proyek sesuai timeline yang disepakati
          </p>
        </div>
      </div>
    </div>
  );
}


// --- STRUKTUR DATA PRODUK BARU ---
interface Product {
  name: string;
  price: string;
  superCategory: 'Website' | 'Sosmed Boost' | 'Lainnya';
  subCategory: 'Landing Page' | 'Profil Bisnis' | 'Portfolio' | null; // Sub-kategori hanya untuk Website
  imageUrl?: string;
  exampleUrl?: string;
  modalType?: 'example' | 'details';
}

const productData: Product[] = [
  // Kategori: Website -> Sub: Landing Page (10 Produk)
  { name: 'LP Basic', price: 'Rp 20rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1470', exampleUrl: 'https://example.com/lp1' },
  { name: 'LP Standard', price: 'Rp 35rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1470', exampleUrl: 'https://example.com/lp2' },
  { name: 'LP Pro', price: 'Rp 50rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1472', exampleUrl: 'https://example.com/lp3' },
  { name: 'LP Event', price: 'Rp 40rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1470', exampleUrl: 'https://example.com/lp4' },
  { name: 'LP Produk', price: 'Rp 45rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470', exampleUrl: 'https://example.com/lp5' },
  { name: 'LP Personal Brand', price: 'Rp 30rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1470', exampleUrl: 'https://example.com/lp6' },
  { name: 'LP Afiliasi', price: 'Rp 35rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1631', exampleUrl: 'https://example.com/lp7' },
  { name: 'LP Pre-launch', price: 'Rp 25rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415', exampleUrl: 'https://example.com/lp8' },
  { name: 'LP Webinar', price: 'Rp 30rb', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1470', exampleUrl: 'https://example.com/lp9' },
  { name: 'LP Custom', price: 'Call Us', superCategory: 'Website', subCategory: 'Landing Page', imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1470', exampleUrl: 'https://example.com/lp10' },

  // Kategori: Website -> Sub: Profil Bisnis (3 Produk)
  { name: 'Profil Bisnis Basic', price: 'Rp 75rb', superCategory: 'Website', subCategory: 'Profil Bisnis', imageUrl: 'https://images.unsplash.com/photo-1556740738-6b4a6d8b8b8b?q=80', exampleUrl: 'https://example.com/prof1' },
  { name: 'Profil Bisnis Pro', price: 'Rp 125rb', superCategory: 'Website', subCategory: 'Profil Bisnis', imageUrl: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80', exampleUrl: 'https://example.com/prof2' },
  { name: 'Profil Bisnis Ent.', price: 'Rp 200rb', superCategory: 'Website', subCategory: 'Profil Bisnis', imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80', exampleUrl: 'https://example.com/prof3' },

  // Kategori: Website -> Sub: Portfolio (3 Produk)
  { name: 'Portfolio Personal', price: 'Rp 50rb', superCategory: 'Website', subCategory: 'Portfolio', imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80', exampleUrl: 'https://example.com/port1' },
  { name: 'Portfolio Fotografer', price: 'Rp 80rb', superCategory: 'Website', subCategory: 'Portfolio', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80', exampleUrl: 'https://example.com/port2' },
  { name: 'Portfolio Agensi', price: 'Rp 150rb', superCategory: 'Website', subCategory: 'Portfolio', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80', exampleUrl: 'https://example.com/port3' },

  // Kategori: Sosmed Boost (5 Produk, tanpa sub-kategori)
  { name: 'Instagram Boost', price: 'Rp 50rb', superCategory: 'Sosmed Boost', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80', modalType: 'details' },
  { name: 'TikTok Boost', price: 'Rp 50rb', superCategory: 'Sosmed Boost', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1664480398670-430c4b3f3733?q=80', modalType: 'details' },
  { name: 'Facebook Boost', price: 'Rp 50rb', superCategory: 'Sosmed Boost', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1633675254053-f728692f1f28?q=80', modalType: 'details' },
  { name: 'Telegram Boost', price: 'Rp 40rb', superCategory: 'Sosmed Boost', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1634224143538-ce022a733323?q=80', modalType: 'details' },
  { name: 'YouTube Boost', price: 'Rp 75rb', superCategory: 'Sosmed Boost', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1611162616805-65313b947c63?q=80', modalType: 'details' },

  // Kategori: Lainnya (3 Produk, tanpa sub-kategori)
  { name: 'Desain Instagram', price: 'Rp 30rb', superCategory: 'Lainnya', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80', modalType: 'details' },
  { name: 'Promosi Video', price: 'Rp 100rb', superCategory: 'Lainnya', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1558992013-1a73e6593915?q=80', modalType: 'details' },
  { name: 'Jasa Iklan Meta', price: 'Rp 150rb', superCategory: 'Lainnya', subCategory: null, imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80', modalType: 'details' },
];

const superCategories: Product['superCategory'][] = ['Website', 'Sosmed Boost', 'Lainnya'];
const subCategories: { [key in 'Website']: { value: Product['subCategory']; label: string }[] } = {
  Website: [
    { value: 'Landing Page', label: 'Landing Page' },
    { value: 'Profil Bisnis', label: 'Profil Bisnis' },
    { value: 'Portfolio', label: 'Portfolio' },
  ],
};


export default function ServicesPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSuperCategory, setActiveSuperCategory] = useState<Product['superCategory']>('Website');
  const [activeSubCategory, setActiveSubCategory] = useState<Product['subCategory']>('Landing Page');
  const [activeModal, setActiveModal] = useState<Product['modalType'] | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSuperCategoryClick = (category: Product['superCategory']) => {
    setActiveSuperCategory(category);
    // Jika kategori yang diklik adalah Website, set sub-kategori default. Jika tidak, hapus sub-kategori.
    if (category === 'Website') {
      setActiveSubCategory('Landing Page');
    } else {
      setActiveSubCategory(null);
    }
  };
  
  // Logika filter produk yang telah diperbarui
  const filteredProducts = productData.filter(product => {
    if (activeSuperCategory === 'Website') {
      return product.superCategory === activeSuperCategory && product.subCategory === activeSubCategory;
    }
    // Untuk kategori lain, hanya filter berdasarkan superCategory
    return product.superCategory === activeSuperCategory;
  });

  const openModal = useCallback((product: Product) => {
    // Set modal type berdasarkan data produk, default ke 'details' jika tidak ada
    const modalType = product.exampleUrl ? 'example' : 'details';
    setActiveModal(modalType);
    setModalProduct(product);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalProduct(null);
  }, []);

  if (!mounted) return null;

  return (
    <div id='pricing' className='min-h-screen w-full pt-20 pb-8 px-4'>
      <div className='w-full max-w-6xl mx-auto'>
        {/* === JUDUL DAN SUBHEADLINE BARU === */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='relative z-10 flex flex-col gap-4 items-center mb-10 mx-auto text-center'>
                <div className='inline-flex items-center justify-center gap-2 border-2 border-primary px-6 py-2 rounded-full text-xl font-semibold'>
                    <MdOutlineFeaturedPlayList /> <h2>Layanan & Harga</h2>
                </div>
                <h3 className='font-bold text-3xl md:text-4xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent !leading-tight'>
                    Tingkatkan Bisnismu Secara Digital
                </h3>
            </div>
        </motion.div>
        
        {/* === NAVIGASI KATEGORI 1 BARIS (TOMBOL) === */}
        <div className='flex flex-col items-center gap-4 mb-8'>
          {/* Main Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {superCategories.map(cat => (
              <button key={cat} onClick={() => handleSuperCategoryClick(cat)} className={`btn btn-sm md:btn-md rounded-full ${activeSuperCategory === cat ? 'btn-primary' : 'btn-ghost'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Sub Categories (hanya tampil jika kategori Website aktif) */}
          {activeSuperCategory === 'Website' && (
            <div className="flex flex-wrap justify-center gap-2 mt-2 p-2 bg-base-200 rounded-full">
              {subCategories.Website.map(sub => (
                <button key={sub.value} onClick={() => setActiveSubCategory(sub.value)} className={`btn btn-xs md:btn-sm rounded-full ${activeSubCategory === sub.value ? 'btn-active btn-neutral' : 'btn-ghost'}`}>
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* === DAFTAR PRODUK === */}
        <motion.div 
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            key={activeSuperCategory + activeSubCategory} // Ganti key untuk memicu animasi saat filter berubah
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.name}
              className={`flex flex-col rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'
              }`}
            >
              {product.imageUrl && (
                <div className='relative w-full h-32'>
                  <Image src={product.imageUrl} alt={`${product.name} preview`} fill className='object-cover' />
                </div>
              )}
              <div className="p-3 flex flex-col flex-grow">
                <h3 className={`font-bold leading-tight text-sm flex-grow mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                
                <div className='flex gap-2 mt-auto items-center'>
                  <button className={`flex-1 btn btn-primary btn-xs rounded-full`}>
                    {product.price}
                  </button>
                  <button
                    onClick={() => openModal(product)}
                    aria-label='Lihat Rincian'
                    className={`btn btn-outline btn-xs btn-square rounded-full flex items-center justify-center`}
                  >
                    <ExternalLink className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* === MODALS === */}
        <Modal isOpen={activeModal === 'example' && !!modalProduct} onClose={closeModal} size='full'>
          {modalProduct?.exampleUrl && (
            <iframe
              src={modalProduct.exampleUrl}
              title={`Contoh ${modalProduct.name}`}
              className='w-full h-full border-0'
              sandbox='allow-scripts allow-same-origin'
            />
          )}
        </Modal>

        <Modal isOpen={activeModal === 'details' && !!modalProduct} onClose={closeModal} size='sm'>
          <OrderingInstructions />
        </Modal>
      </div>
    </div>
  );
}
