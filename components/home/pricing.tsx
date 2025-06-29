"use client";

import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { ExternalLink, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then((mod) => mod.SwiperSlide), { ssr: false });

import "swiper/css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

function Modal({ isOpen, onClose, children, size = "full" }: ModalProps) {
  const { theme } = useTheme();
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm rounded-xl",
    md: "max-w-md rounded-xl",
    lg: "max-w-2xl rounded-xl",
    full: "max-w-full w-full h-[90vh] rounded-xl",
  }[size];
  
  const contentPadding = size === 'full' ? 'p-0' : 'p-4';

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4`}>
      <div
        className={`${sizeClasses} ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } overflow-hidden shadow-2xl relative ${contentPadding}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 z-10 bg-black/20 hover:bg-black/40
            ${theme === "dark"
              ? "text-gray-300 hover:text-white"
              : "text-gray-200 hover:text-white"
            }`}
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}


function OrderingInstructions() {
  const { theme } = useTheme();
  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        Cara Pemesanan
      </h3>
      <div className="space-y-3">
        <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            1. Pilih Paket
          </h4>
          <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            2. Konsultasi
          </h4>
          <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Diskusikan kebutuhan spesifik dan detail proyek dengan tim kami
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            3. Pembayaran
          </h4>
          <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Lakukan pembayaran sesuai paket yang dipilih
          </p>
        </div>
        <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
          <h4 className={`font-semibold text-sm mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            4. Pengerjaan
          </h4>
          <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Tim kami akan mulai mengerjakan proyek sesuai timeline yang disepakati
          </p>
        </div>
      </div>
    </div>
  );
}

interface Product {
  name: string;
  price: string;
  superCategory: "Bisnis" | "Nonbisnis";
  category: "landing_page" | "portfolio" | "profil_bisnis" | "undangan" | "personal";
  categoryLabel: string;
  imageUrl?: string;
  exampleUrl?: string;
  modalType?: "example" | "details";
}

const productData: Product[] = [
    { name: "Landing Page", price: "Rp 20,000", superCategory: "Bisnis", category: "landing_page", categoryLabel: "Landing Page", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://unbounce.com", modalType: "example" },
    { name: "Simple Store", price: "Rp 20,000", superCategory: "Bisnis", category: "landing_page", categoryLabel: "Landing Page", imageUrl: "https://images.unsplash.com/photo-1556740738-6b4a6d8b8b8b?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://shopify.com", modalType: "example" },
    { name: "Online Course", price: "Rp 20,000", superCategory: "Bisnis", category: "landing_page", categoryLabel: "Landing Page", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://course-demo.vercel.app", modalType: "example" },
    { name: "Membership", price: "Rp 20,000", superCategory: "Bisnis", category: "landing_page", categoryLabel: "Landing Page", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://membership-demo.vercel.app", modalType: "example" },
    { name: "Profil Bisnis", price: "Rp 20,000", superCategory: "Bisnis", category: "profil_bisnis", categoryLabel: "Profil Bisnis", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://profil-bisnis-demo.vercel.app", modalType: "example" },
    { name: "Link in Bio", price: "Rp 20,000", superCategory: "Nonbisnis", category: "personal", categoryLabel: "Personal", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://linkinbio-demo.vercel.app", modalType: "example" },
    { name: "Digital Invitation", price: "Rp 20,000", superCategory: "Nonbisnis", category: "undangan", categoryLabel: "Undangan", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://invitation-demo.vercel.app", modalType: "example" },
    { name: "Birthday", price: "Rp 20,000", superCategory: "Nonbisnis", category: "undangan", categoryLabel: "Undangan", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://birthday-demo.vercel.app", modalType: "example" },
    { name: "Event", price: "Rp 20,000", superCategory: "Nonbisnis", category: "undangan", categoryLabel: "Undangan", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://event-demo.vercel.app", modalType: "example" },
    { name: "Portfolio", price: "Rp 20,000", superCategory: "Nonbisnis", category: "portfolio", categoryLabel: "Portfolio", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop", exampleUrl: "https://portfolio-demo.vercel.app", modalType: "example" },
];


const subCategories: { [key in Product["superCategory"]]: { value: Product["category"]; label: string }[] } = {
  Bisnis: [
    { value: "landing_page", label: "Landing Page" },
    { value: "profil_bisnis", label: "Profil Bisnis" },
  ],
  Nonbisnis: [
    { value: "portfolio", label: "Portfolio" },
    { value: "undangan", label: "Undangan" },
    { value: "personal", label: "Personal" },
  ],
};


export default function ServicesPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSuperCategory, setActiveSuperCategory] = useState<Product["superCategory"]>("Bisnis");
  
  // ===============================================================
  // PERUBAHAN 1: State awal sub-kategori diubah
  // Menghapus state "all" dan langsung set ke sub-kategori pertama
  // ===============================================================
  const [activeSubCategory, setActiveSubCategory] = useState<Product["category"]>("landing_page");
  
  const [activeModal, setActiveModal] = useState<Product["modalType"] | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ===============================================================
  // PERUBAHAN 2: Logika saat super-kategori diganti
  // Saat super-kategori baru dipilih, otomatis aktifkan sub-kategori pertamanya
  // ===============================================================
  useEffect(() => {
    if (mounted) {
      const firstSubCategory = subCategories[activeSuperCategory][0]?.value;
      if (firstSubCategory) {
        setActiveSubCategory(firstSubCategory);
      }
    }
  }, [activeSuperCategory, mounted]);

  // Logika filter disederhanakan karena tidak ada lagi state "all"
  const filteredProducts = productData.filter(
    (product) =>
      product.superCategory === activeSuperCategory &&
      product.category === activeSubCategory
  );

  const openModal = useCallback((type: Product["modalType"], product?: Product) => {
    setActiveModal(type);
    setModalProduct(product || null);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalProduct(null);
  }, []);

  const getButtonClasses = (isActive: boolean) => `btn btn-sm md:btn-md btn-base rounded-full whitespace-nowrap px-4 py-2 transition-all duration-300 ${isActive ? "border-none ring-1 ring-base-content/50 text-base-100 hover:text-base-content bg-base-content hover:bg-base-100 shadow-md" : "border border-base-content/20 text-base-content hover:bg-base-100/50 hover:shadow-sm"}`;

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full pt-20 pb-8">
      <div className="w-full">
        <div className="flex justify-center overflow-x-auto space-x-3 mb-4 pb-2 snap-x snap-mandatory px-2">
          <button
            onClick={() => setActiveSuperCategory("Bisnis")}
            className={getButtonClasses(activeSuperCategory === "Bisnis")}
          >
            Bisnis
          </button>
          <button
            onClick={() => setActiveSuperCategory("Nonbisnis")}
            className={getButtonClasses(activeSuperCategory === "Nonbisnis")}
          >
            Nonbisnis
          </button>
        </div>

        <div className="flex justify-center overflow-x-auto space-x-3 mb-8 pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory px-2">
          {/* Tombol "Semua" telah dihapus dari sini */}
          {subCategories[activeSuperCategory].map((sub) => (
            <button
              key={sub.value}
              onClick={() => setActiveSubCategory(sub.value)}
              className={getButtonClasses(activeSubCategory === sub.value)}
            >
              {sub.label}
            </button>
          ))}
        </div>
        
        {/* ===============================================================
          PERUBAHAN 3: Margin kanan-kiri (px-1) dihapus dari grid
          =============================================================== */}
        <div className="grid grid-cols-2 gap-2">
          {filteredProducts.map((product) => (
            <div
              key={product.name}
              className={`flex flex-col rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
                theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              } p-2`} // Padding internal kartu dikurangi sedikit menjadi p-2
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold leading-tight text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{product.name}</h3>
                <span className={`px-2 py-1 rounded-full font-bold whitespace-nowrap ml-2 text-xs shadow-sm border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100`}>{product.price}</span>
              </div>

              <div className="flex-grow mb-3">
                {product.imageUrl && (
                  <div className="relative w-full h-28"><Image src={product.imageUrl} alt={`${product.name} preview`} fill className="object-cover rounded-md"/></div>
                )}
              </div>
              
              {/* ===============================================================
                PERUBAHAN 4: Tombol diperkecil menggunakan class 'btn-xs'
                =============================================================== */}
              <div className="flex gap-2 mt-auto items-center">
                <button
                  className={`flex-1 btn btn-xs border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100 rounded-full`}
                >
                  Bayar
                </button>
                {product.modalType && (
                  <button
                    onClick={() => openModal(product.modalType, product)}
                    aria-label="Lihat Contoh"
                    className={`btn btn-xs btn-square rounded-full flex items-center justify-center`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={activeModal === "example" && modalProduct !== null} onClose={closeModal} size="full">
          {modalProduct?.exampleUrl && (
            <iframe
              src={modalProduct.exampleUrl}
              title={`Contoh ${modalProduct.name}`}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </Modal>

        <Modal isOpen={activeModal === "details" && modalProduct !== null} onClose={closeModal} size="md">
          <OrderingInstructions />
        </Modal>
      </div>
    </div>
  );
}
