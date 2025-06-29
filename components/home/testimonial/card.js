'use client';

import Image from 'next/image';

export default function TestimonialCard({ testimonialItem = {} }) {
  return (
    <div className="bg-base-200 p-3 rounded-lg h-full flex flex-col justify-between">
      {/* Konten testimoni */}
      <div>
        <p className="text-xs text-base-content/80 leading-relaxed">
          {testimonialItem.content}
        </p>
      </div>

      {/* Atribut (nama & avatar) */}
      <div className="flex items-center gap-2 mt-3">
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src={testimonialItem.avatar}
            alt={testimonialItem.nickname}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-xs text-base-content">{testimonialItem.nickname}</p>
          <p className="text-[10px] text-base-content/70">{testimonialItem.description}</p>
        </div>
      </div>
    </div>
  );
}
