import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'radio' | 'checkbox' | 'number';
  placeholder?: string;
  required?: boolean;
  value: any;
  onChange: (e: any) => void;
  options?: { value: string; label: string }[];
  helper?: string;
  error?: string;
}

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  options = [],
  helper,
  error
}: FormFieldProps) {
  if (type === 'select') {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-digiqo-accent">*</span>}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-digiqo-accent focus:outline-none transition-colors"
          required={required}
        >
          <option value="">Choisir...</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-digiqo-accent">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-digiqo-accent focus:outline-none transition-colors min-h-[100px]"
          required={required}
        />
        {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value}
          onChange={onChange}
          className="w-5 h-5 text-digiqo-accent border-2 border-gray-300 rounded focus:ring-digiqo-accent"
        />
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      </div>
    );
  }

  if (type === 'radio') {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-digiqo-accent">*</span>}
        </label>
        {options.map(option => (
          <label key={option.value} className="flex items-center space-x-3">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="w-5 h-5 text-digiqo-accent border-2 border-gray-300 focus:ring-digiqo-accent"
            />
            <span className="text-sm font-medium text-gray-700">{option.label}</span>
          </label>
        ))}
        {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-digiqo-accent">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-digiqo-accent focus:outline-none transition-colors"
        required={required}
      />
      {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}