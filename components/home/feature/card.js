'use client';
import React from 'react';

export default function FeatureCard({ featureItem = {} }) {
  return (
    <div
      className='w-full max-w-[300px] p-4 border-2 border-base-content rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-100 shadow-none hover:shadow-2xl hover:scale-110 bg-base-100 aspect-square'
    >
      <div className="text-center flex flex-col items-center justify-center h-full">
        {featureItem.icon && React.createElement(featureItem.icon, { className: 'text-2xl mx-auto' })}
        <h2 className='mt-2 text-base font-bold text-center'>{featureItem.title}</h2>
        <p className='text-xs text-center overflow-hidden text-ellipsis line-clamp-3'>{featureItem.description}</p>
      </div>
    </div>
  );
}
