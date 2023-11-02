import {isFeedbackLoadingSelector, postFeedbackStart} from '@/src/redux/features';
import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Button, Separator} from '@/src/components/ui';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from '../../helpers';

import styles from './feedback-form.module.scss';

type FormValuesType = {name?: string; text?: string; errors?: {name?: string; text?: string}};

export const FeedbackForm: FC = () => {
  const [formState, setFormState] = useState<FormValuesType>({name: '', text: ''});
  const dispatch = useDispatch();
  const isLoading = useSelector(isFeedbackLoadingSelector);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setFormState((state) => ({...state, [name]: value, errors: {...state.errors, [name]: ''}}));
  };

  const validate = (data: FormValuesType) => {
    const errors = {} as FormValuesType;
    if (isEmpty(data.name)) {
      errors.name = 'Required field';
    }
    if (isEmpty(data.text)) {
      errors.text = 'Required field';
    }
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formState);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(postFeedbackStart({text: formState.text as string, name: formState.name as string}));
    } else {
      setFormState((state) => ({...state, errors: validationErrors}));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        id="name"
        type="text"
        name="name"
        value={formState.name}
        className={styles.input}
        placeholder="Your name or e-mail"
        onChange={handleInputChange}
      />
      {formState?.errors?.name && <div className={styles.error}>{formState.errors.name}</div>}
      <textarea
        rows={10}
        value={formState.text}
        id="text"
        name="text"
        className={styles.text}
        placeholder="Write feedback"
        onChange={handleInputChange}
      />
      {formState?.errors?.text && <div className={styles.error}>{formState?.errors?.text}</div>}

      <Separator smallMargin />
      <Button label="Submit" isSubmit loading={isLoading} disabled={isLoading} />
    </form>
  );
};
