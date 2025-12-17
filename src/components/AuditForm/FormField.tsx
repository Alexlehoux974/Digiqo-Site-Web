'use client';


import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  error?: string;
  helper?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  options,
  error,
  helper,
  className = '',
  multiline = false,
  rows = 4
}: FormFieldProps) {
  const baseFieldClass = `
    w-full px-4 py-3 rounded-lg
    bg-white backdrop-blur-sm
    border-2 border-digiqo-gray/30 dark:border-gray-700
    text-digiqo-black dark:text-white
    placeholder-digiqo-gray-dark/50 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-digiqo-accent/40 focus:border-digiqo-accent
    hover:border-digiqo-primary/30 transition-all duration-300
    ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
    ${className}
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label htmlFor={name} className="block text-sm font-semibold text-digiqo-primary dark:text-gray-300">
        {label}
        {required && <span className="text-digiqo-accent ml-1">*</span>}
      </label>
      
      {type === 'select' && options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={baseFieldClass}
        >
          <option value="">Sélectionnez une option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseFieldClass} resize-none`}
        />
      ) : type === 'range' ? (
        <div className="space-y-2">
          <input
            type="range"
            id={name}
            name={name}
            value={value || 5}
            onChange={onChange}
            min="0"
            max="10"
            className="w-full h-3 bg-gradient-to-r from-digiqo-gray to-digiqo-accent/20 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-digiqo-accent"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span className="text-digiqo-accent font-bold text-lg">{value || 5}</span>
            <span>10</span>
          </div>
        </div>
      ) : type === 'checkbox' ? (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            onChange={onChange}
            className="w-5 h-5 text-digiqo-accent bg-white border-2 border-digiqo-primary/30 rounded focus:ring-digiqo-accent dark:focus:ring-digiqo-accent dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-digiqo-accent"
          />
          <label htmlFor={name} className="text-sm text-gray-700 dark:text-gray-300">
            {placeholder}
          </label>
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseFieldClass}
        />
      )}
      
      {helper && !error && (
        <div className="flex items-start space-x-1 text-xs text-digiqo-secondary font-medium">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-digiqo-secondary" />
          <span>{helper}</span>
        </div>
      )}
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 font-semibold flex items-center space-x-1"
        >
          <span>{error}</span>
        </motion.p>
      )}
    </motion.div>
  );
}