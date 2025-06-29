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
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    full: "max-w-full w-full h-[90vh]",
  }[size];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`${sizeClasses} ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-xl overflow-hidden shadow-2xl relative p-4`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-3 rounded-md transition-all duration-200 z-10 ${
            theme === "dark"
              ? "hover:bg-gray-700 text-gray-400 hover:text-white"
              : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
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
  category: "landing_page" | "portfolio" | "profil_bisnis";
  imageUrl?: string;
  exampleUrl?: string;
  modalType?: "example" | "details";
}

const productData: Product[] = [
  {
    name: "Landing Page",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://unbounce.com",
    modalType: "example",
  },
  {
    name: "Simple Store",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1556740738-6b4a6d8b8b8b?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://shopify.com",
    modalType: "example",
  },
  {
    name: "Online Course",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://course-demo.vercel.app",
    modalType: "example",
  },
  {
    name: "Membership",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://membership-demo.vercel.app",
    modalType: "example",
  },
  {
    name: "Link in Bio",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://linkinbio-demo.vercel.app",
    modalType: "example",
  },
  {
    name: "Digital Invitation",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://invitation-demo.vercel.app",
    modalType: "example",
  },
  {
    name: "Birthday",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://birthday-demo.vercel.app",
    modalType: "example",
  },
  {
    name: "Event",
    price: "Rp 20,000",
    category: "landing_page",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://event-demo.vercel.app",
    modalType: "example",
  },
  {
    name: "Portfolio",
    price: "Rp 20,000",
    category: "portfolio",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://portfolio-demo.vercel.app",
    modalType: "example",
  },
  {
    name: "Profil Bisnis",
    price: "Rp 20,000",
    category: "profil_bisnis",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
    exampleUrl: "https://profil-bisnis-demo.vercel.app",
    modalType: "example",
  },
];

export default function ServicesPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Product["category"]>("landing_page");
  const [activeModal, setActiveModal] = useState<Product["modalType"]>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = productData.filter((product) => product.category === activeCategory);

  const openModal = useCallback(
    (type: Product["modalType"], product?: Product) => {
      setActiveModal(type);
      if (product) {
        setModalProduct(product);
      } else {
        setModalProduct(null);
      }
    },
    [],
  );

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalProduct(null);
  }, []);

  const getCategoryButtonClasses = (isActive: boolean) => {
    return `btn btn-sm md:btn-md btn-base rounded-full whitespace-nowrap ${
      isActive
        ? "border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100"
        : "text-base-content hover:bg-base-100"
    }`;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex overflow-x-auto space-x-4 mb-6 pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <button
            onClick={() => setActiveCategory("landing_page")}
            className={getCategoryButtonClasses(activeCategory === "landing_page")}
          >
            Landing Page
          </button>
          <button
            onClick={() => setActiveCategory("portfolio")}
            className={getCategoryButtonClasses(activeCategory === "portfolio")}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveCategory("profil_bisnis")}
            className={getCategoryButtonClasses(activeCategory === "profil_bisnis")}
          >
            Profil Bisnis
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.name}
              className={`flex flex-col rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
                theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              } p-3`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`font-bold leading-tight text-sm ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {product.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full font-bold whitespace-nowrap ml-2 text-xs shadow-sm border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100`}
                >
                  {product.price}
                </span>
              </div>

              <div className="flex-grow mb-3">
                {product.imageUrl && (
                  <div className="relative w-full h-32">
                    <Image
                      src={product.imageUrl}
                      alt={`${product.name} preview`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  className={`flex-1 btn btn-sm md:btn-md btn-base border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100 rounded-full`}
                >
                  Bayar
                </button>
                {product.modalType && (
                  <button
                    onClick={() => openModal(product.modalType, product)}
                    className={`btn btn-sm md:btn-md btn-base rounded-full flex items-center gap-1`}
                  >
                    <ExternalLink className="h-3 w-3" />
                    {product.modalType === "example" ? "Contoh" : "Rincian"}
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
