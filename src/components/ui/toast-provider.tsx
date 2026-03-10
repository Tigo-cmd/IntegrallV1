import React, { createContext, useCallback, useContext, useState } from 'react';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'info';
    exiting?: boolean;
}

interface ToastContextValue {
    addToast: (message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });

export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 300);
        }, 2500);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="il-toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`il-toast ${t.type}${t.exiting ? ' exit' : ''}`}>
                        <span className="il-toast-icon">
                            {t.type === 'success' ? '✓' : 'ℹ'}
                        </span>
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
