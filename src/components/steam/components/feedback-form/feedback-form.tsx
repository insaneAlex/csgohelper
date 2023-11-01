import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Separator} from '@/src/components/ui';

import styles from './feedback-form.module.scss';
import {useDispatch} from 'react-redux';
import {postFeedbackStart} from '@/src/redux/features/feedback';
import {isEmpty} from '../../helpers';

type FormValuesType = {name?: string; text?: string; errors?: {name?: string; text?: string}};

export const FeedbackForm: FC = () => {
  const [formState, setFormState] = useState<FormValuesType>({name: '', text: ''});
  const dispatch = useDispatch();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setFormState((state) => ({...state, [name]: value, errors: {}}));
  };

  const validate = (data: FormValuesType) => {
    const errors = {} as FormValuesType;
    if (!data.name || isEmpty(data.name)) {
      errors.name = 'Required field';
    }
    if (!data.text || isEmpty(data.text)) {
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
      <div className={styles.fields}>
        <p className={styles.title}>Send feedback</p>
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
      </div>
      <Separator smallMargin />
      <button className={styles.button}>Submit</button>
    </form>
  );
};
