import {FeedbackStatuses, feedbackStatusSelector, postFeedbackStart} from '@/src/redux/features';
import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Button, Separator} from '@/src/components/ui';
import {useDispatch, useSelector} from 'react-redux';
import {NAME_FIELD, TEXT_FIELD} from './constants';
import {getEmptyFormValues} from '../../helpers';
import {FeedbackType} from '@/core/types';

import styles from './feedback-form.module.scss';

type FormErrorType = Partial<FeedbackType>;
type FormValuesType = FeedbackType & {errors?: FormErrorType};

export const FeedbackForm: FC = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<FormValuesType>({name: '', text: ''});
  const isLoading = useSelector(feedbackStatusSelector) === FeedbackStatuses.LOADING;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormState((state) => ({...state, [name]: value, errors: {...state.errors, [name]: ''}}));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = getEmptyFormValues(formState as FeedbackType);
    const noFormErrors = Object.keys(validationErrors).length === 0;

    noFormErrors
      ? dispatch(postFeedbackStart(formState))
      : setFormState((state) => ({...state, errors: validationErrors}));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        id={NAME_FIELD}
        name={NAME_FIELD}
        value={formState.name}
        className={styles.input}
        placeholder="Your name or e-mail"
        onChange={handleInputChange}
      />
      {formState?.errors?.name && <div className={styles.error}>{formState.errors.name}</div>}
      <textarea
        rows={10}
        id={TEXT_FIELD}
        name={TEXT_FIELD}
        value={formState.text}
        className={styles.text}
        placeholder="Write feedback"
        onChange={handleInputChange}
      />
      {formState?.errors?.text && <div className={styles.error}>{formState?.errors?.text}</div>}

      <Separator smallMargin />
      <Button isSubmit loading={isLoading} disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
};
