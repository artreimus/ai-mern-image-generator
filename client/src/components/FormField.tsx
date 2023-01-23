import React from 'react';

interface FormFieldProps {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isSurpriseMe?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSurpriseMe?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  isSurpriseMe,
  handleChange,
  handleSurpriseMe,
}: FormFieldProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounder-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  );
};

export default FormField;
