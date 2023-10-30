import { Buffer } from 'buffer';
import { useCallback, useState } from 'react';
import { type FieldPath, type PathValue, useForm } from 'react-hook-form';
import type { Base64File } from '../../types';
import type {
  HeroItemFormPayload,
  HeroItemResponseDto,
} from '../../../packages/heroes';
import { ContentType } from '../../enums';
import { TextInput } from '../text-input/text-input';
import { FileInput } from '../file-input/file-input';
import { RemoveCover } from '../remove-cover/remove-cover';
import { Button } from '../button/button';

import './style.scss';

const HeroForm: React.FC<{
  hero?: HeroItemResponseDto;
  editable: boolean;
  label: string;
  onSubmit: (hero: HeroItemFormPayload) => void;
  onDelete?: () => void;
}> = ({ hero, editable, label, onSubmit, onDelete }) => {
  const [formDisabled, setFormDisabled] = useState<boolean>(editable);

  const {
    handleSubmit,
    formState: { isValid },
    control,
    watch,
    setValue,
  } = useForm<HeroItemFormPayload>({
    defaultValues: {
      nickname: hero?.nickname ?? '',
      realName: hero?.realName ?? '',
      description: hero?.description ?? '',
      powers: hero?.powers ?? '',
      phrase: hero?.phrase ?? '',
      images: hero?.images ?? [],
    },
  });

  const images = watch('images');

  const handleImageDelete = useCallback(
    (index: number) => {
      return () => {
        setValue(
          'images',
          images.filter((_, imageIndex) => index !== imageIndex),
        );
      };
    },
    [setValue, images],
  );

  const handleEditClick = useCallback(() => {
    setFormDisabled(!formDisabled);
  }, [formDisabled, setFormDisabled]);

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleEditClick();
      handleSubmit(onSubmit)(event);
    },
    [handleEditClick],
  );

  const handleFileChange = async (
    files: PathValue<HeroItemFormPayload, FieldPath<HeroItemFormPayload>>,
    file: File,
  ) => {
    const binary = Buffer.from(await file.arrayBuffer()).toString('base64');

    return [
      ...(files as Base64File[]),
      { binary, contentType: file.type },
    ] as Base64File[];
  };

  return (
    <div className="hero-info">
      <div className="images-container">
        <div className="images">
          {images.map((file, index) => (
            <RemoveCover
              disabled={formDisabled}
              key={index}
              onClick={handleImageDelete(index)}
            >
              <img
                className="hero-image"
                src={`data:${file.contentType};base64,${file.binary}`}
                alt={`Image of the hero`}
              />
            </RemoveCover>
          ))}

          {!formDisabled && (
            <div className="drag-zone-container">
              <FileInput
                controllerProps={{
                  control,
                  name: 'images',
                  rules: { required: true, minLength: 1 },
                }}
                onChange={handleFileChange}
                description="Only images are allowed"
                extensions={[ContentType.PNG, ContentType.JPEG]}
                required
              />
            </div>
          )}
        </div>
      </div>

      <form className="form" onSubmit={handleFormSubmit}>
        <TextInput
          controllerProps={{
            name: 'nickname',
            control,
            rules: { required: true },
          }}
          label="Nickname"
          placeholder="Enter nickname"
          disabled={formDisabled}
          required
        />
        <TextInput
          controllerProps={{
            name: 'realName',
            control,
            rules: { required: true },
          }}
          label="Real name"
          placeholder="Enter real name"
          disabled={formDisabled}
          required
        />
        <TextInput
          controllerProps={{
            name: 'description',
            control,
            rules: { required: true },
          }}
          label="Origin description"
          placeholder="Enter origin description"
          rowsCount={3}
          disabled={formDisabled}
          required
        />
        <TextInput
          controllerProps={{
            name: 'phrase',
            control,
            rules: { required: true },
          }}
          label="Catch phrase"
          placeholder="Enter catch phrase"
          disabled={formDisabled}
          required
        />
        <TextInput
          controllerProps={{
            name: 'powers',
            control,
            rules: { required: true },
          }}
          label="Powers"
          placeholder="Enter powers"
          rowsCount={3}
          disabled={formDisabled}
          required
        />

        {editable && (
          <Button
            type="button"
            onClick={handleEditClick}
            disabled={!formDisabled}
          >
            Edit
          </Button>
        )}
        <Button type="submit" disabled={formDisabled || !isValid}>
          {label}
        </Button>
        {editable && (
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        )}
      </form>
    </div>
  );
};

export { HeroForm };
