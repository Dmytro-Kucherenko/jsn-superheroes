import {
  type FieldPath,
  type FieldValues,
  type PathValue,
  type UseControllerProps,
  useController,
} from 'react-hook-form';
import UploadIcon from '../../../assets/icons/upload.svg';
import type { ContentType } from '../../enums';

import './style.scss';

const FileInput = <T extends FieldValues>({
  controllerProps,
  onChange,
  description,
  extensions,
  required,
}: {
  controllerProps: UseControllerProps<T, FieldPath<T>>;
  onChange?: (value: PathValue<T, FieldPath<T>>, file: File) => unknown;
  description: string;
  extensions?: ContentType[];
  required?: boolean;
}) => {
  const {
    field: { onChange: onFileChnage, value },
  } = useController(controllerProps);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file = null] = event.target.files ?? [];
    event.currentTarget.value = '';

    if (file) {
      onChange ? onFileChnage(await onChange(value, file)) : onFileChnage(file);
    }
  };

  return (
    <div className="drag-zone">
      <div>
        <img src={UploadIcon} height={80} width={80} alt="Upload icon" />
      </div>
      <span className="primary-text">Drag file or click here</span>
      <span className="secondary-text">{description}</span>
      <input
        type="file"
        className="file-input"
        onChange={handleChange}
        accept={extensions?.join(', ')}
        required={required}
      />
    </div>
  );
};

export { FileInput };
