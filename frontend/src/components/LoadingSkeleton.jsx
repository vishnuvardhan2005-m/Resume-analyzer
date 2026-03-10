import React from 'react';

const Shimmer = ({ className }) => (
  <div className={`animate-pulse rounded-lg bg-gray-100 ${className}`} />
);

export const CardSkeleton = () => (
  <div className="card p-6">
    <Shimmer className="h-4 w-40" />
    <div className="mt-4 space-y-2">
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-5/6" />
      <Shimmer className="h-3 w-4/6" />
    </div>
    <div className="mt-6 flex gap-2">
      <Shimmer className="h-7 w-20 rounded-full" />
      <Shimmer className="h-7 w-24 rounded-full" />
      <Shimmer className="h-7 w-16 rounded-full" />
    </div>
  </div>
);

const LoadingSkeleton = ({ variant = 'card' }) => {
  if (variant === 'card') return <CardSkeleton />;
  return (
    <div className="space-y-2">
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-5/6" />
      <Shimmer className="h-3 w-4/6" />
    </div>
  );
};

export default LoadingSkeleton;

