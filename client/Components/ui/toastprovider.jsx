'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const SuccessToast = forwardRef(({ id, message }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          clearInterval(timer);
          return 0;
        }
        return oldProgress - 1;
      });
    }, 20);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => closeSnackbar(id)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-green-100 h-1">
        <div
          className="bg-green-500 h-1 transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});

SuccessToast.displayName = 'SuccessToast';

const ErrorToast = forwardRef(({ id, message }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          clearInterval(timer);
          return 0;
        }
        return oldProgress - 1;
      });
    }, 20);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => closeSnackbar(id)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-red-100 h-1">
        <div
          className="bg-red-500 h-1 transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});

ErrorToast.displayName = 'ErrorToast';

export function ToastProvider({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={2000}
      Components={{
        success: SuccessToast,
        error: ErrorToast,
      }}
      classes={{
        containerRoot: 'z-50',
      }}
      TransitionProps={{
        timeout: 300,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}