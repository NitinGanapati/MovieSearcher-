"use client"; 
import React from 'react';

export default function About() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='max-w-2xl mx-auto p-2 text-center'>
        <h1 className='text-3xl font-bold'>About the Movies</h1>
        <div className='text-md text-gray-500 flex flex-col gap-4'>
          <p>
            This is a simple movie app made with Next.js and Tailwind CSS
          </p>
          <p>
            It is a simple movie app made with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
