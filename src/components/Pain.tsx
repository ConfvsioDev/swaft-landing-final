// src/components/Pain.tsx
import React from 'react';

const Pain: React.FC = () => {
  return (
    <div id="pain" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Understanding Your Pain Points</h2>
      <p className="mb-4">We recognize the challenges you face in your business:</p>
      <ul className="list-disc list-inside mb-8">
        <li>Difficulty in attracting and retaining customers</li>
        <li>Struggle with online visibility and brand recognition</li>
        <li>Challenges in effectively communicating your value proposition</li>
        <li>Limited resources for marketing and promotion</li>
      </ul>
      <p>Our solutions are designed to address these pain points and help your business thrive.</p>
    </div>
  );
};

export default Pain;
