import React from 'react';
import ChartComponent from './ChartComponent';

function Card({ title, className, data, children }) {

  return (
    <section className={`rounded bg-secondary p-10 ${className}`}>
      <h2 className="text-white mb-14">{title}</h2>
      <ChartComponent data={data} />
      {children}
    </section>
  );
}

export default Card
