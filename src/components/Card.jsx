import React from 'react';

function Card({ title, className,  children }) {

  return (
    <section className={`rounded bg-secondary p-10 ${className}`}>
      <h2 className="text-white mb-14">{title}</h2>
      {children}
    </section>
  );
}

export default Card
