'use client';

import React from 'react';
import { Grid } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Grid
        visible
        height="80"
        width="80"
        color="gray"
        ariaLabel="grid-loading"
        radius="10"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default Loading;
