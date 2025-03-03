'use client';
import React, { useEffect } from 'react';
import Fallback from '../src/components/errorBoundary/Fallback';

const Error = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error('Next ErrorBoundary: ', error);
  }, [error]);
  return <Fallback />;
};

export default Error;
