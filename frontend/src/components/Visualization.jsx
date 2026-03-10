import React from 'react';
import Charts from './Charts.jsx';

const Visualization = ({ result }) => {
  const matchedCount = result?.matchedSkills?.length || 0;
  const missingCount = result?.missingSkills?.length || 0;
  const matchPercentage = result?.matchPercentage ?? 0;

  return (
    <Charts
      matchedCount={matchedCount}
      missingCount={missingCount}
      matchPercentage={matchPercentage}
    />
  );
};

export default Visualization;

