import { ReactNode } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

export default function Input({
  label,
  id,
  placeholder,
  required = false,
  className,
  size,
  options,
  disabled = false,
  children,
  inputClassName,
}: {
  label?: string;
  id: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  size?: string;
  options?: RegisterOptions<FieldValues>;
  disabled?: boolean;
  children?: ReactNode;
  inputClassName?: string;
}) {
  const { register, setValue, getValues, watch, formState: { errors }} = useFormContext()
  options = {
    ...options,
    required: options?.required !== undefined ? options.required : required,
  }

  watch(id)
  return (
    <div className={`form-control ${className ? className : ''}`}>
      {(label || required) &&
        <label htmlFor={id} className="label cursor-pointer">
          {label && <span className="label-text">{label}</span>}
          {required && <span className="label-text text-secondary text-xs">*required</span>}
        </label>
      }
      {children && 
      <div className="join">
        <input 
          id={id}
          type="text"
          required={required}
          className={`input input-bordered w-full max-w-xs ${size ? `input-${size}` : '' } ${inputClassName} ${/*errors.title && 'input-error'*/''}`}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id, options || {})}
        />
        {children}
      </div>
      }
      {!children && 
        <input 
          id={id}
          type="text"
          required={required}
          className={`input input-bordered w-full max-w-xs ${size ? `input-${size}` : '' } ${inputClassName} ${/*errors.title && 'input-error'*/''}`}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id, options || {})}
        />
      }
      {errors && errors[id] && 
      <label className="label">
        <span className="label-text-alt ">{errors[id]?.message?.toString()}</span>
      </label>
      }
    </div>
  )
}
