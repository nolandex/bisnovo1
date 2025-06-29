'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero({ locale }) {
  const [tilt, setTilt] = useState(45);
  const [duration, setDuration] = useState(0.8);

  useEffect(() => {
    const handleScroll = () => {
      const maxTilt = 45;
      const scrollY = window.scrollY;
      const tiltValue = Math.max(maxTilt - scrollY / 8, 0);
      setTilt(tiltValue);
      setDuration(0.3);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <section
        className='relative z-10 flex flex-col items-start py-10 md:py-20 overflow-hidden'
        style={{ perspective: '800px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 10 }}
          className='w-full'
        >
          {/* REVISI: Menghapus kelas gradient dan menggantinya dengan warna teks solid */}
          <h1 className='font-bold text-5xl md:text-7xl text-base-content !leading-[1.25em] mb-5'>
            {locale.h1}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 1,
          }}
          className='w-full'
        >
          <h2 className='w-full md:w-10/12 text-xl md:text-2xl text-base-content/80 mb-5 md:mb-10'>
            {locale.h2}
          </h2>

          <div className='w-full flex flex-col md:flex-row md:items-center gap-y-5'>
            <div className='flex flex-col md:flex-row gap-2'>
              <a
                title='Lihat Produk Kami'
                className='btn btn-sm md:btn-md btn-base border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100 rounded-full'
                href='#pricing'
              >
                Produk
              </a>
              <a
                title='Hubungi via WhatsApp'
                className='btn btn-sm md:btn-md btn-base rounded-full'
                href='https://wa.me/6285156779923'
                target='_blank'
                rel='noopener noreferrer'
              >
                Hubungi WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: '0deg' }}
          animate={{ opacity: 1, y: 0, rotateX: `${tilt}deg` }}
          transition={{
            delay: duration == 0.8 ? 0.4 : 0,
            duration: duration,
          }}
          className='w-full'
        >
          <Image
            width={1024}
            height={600}
            src={'/og.png'}
            className='hidden md:flex w-full -mt-10'
            alt='app demo'
          />
        </motion.div>
      </section>
    </>
  );
}
