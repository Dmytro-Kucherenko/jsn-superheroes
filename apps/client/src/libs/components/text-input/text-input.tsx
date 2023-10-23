import {
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form';

import './style.scss';

const TextInput = <T extends FieldValues>({
  controllerProps,
  label,
  placeholder,
  disabled,
  required,
  rowsCount = 1,
}: {
  controllerProps: UseControllerProps<T, FieldPath<T>>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rowsCount?: number;
}) => {
  const { field } = useController(controllerProps);

  return (
    <label className="input-container">
      <span className="label">{label}</span>
      {rowsCount === 1 ? (
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          {...field}
        />
      ) : (
        <textarea
          className="input"
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rowsCount}
          {...field}
        />
      )}
    </label>
  );
};

export { TextInput };
