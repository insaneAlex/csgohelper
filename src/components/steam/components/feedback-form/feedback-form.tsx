import {FeedbackStatuses, feedbackStatusSelector, postFeedbackStart} from '@/src/redux/features';
import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Button, Separator} from '@/src/components/ui';
import {useDispatch, useSelector} from 'react-redux';
import {NAME_FIELD, TEXT_FIELD} from './constants';
import {getEmptyFormValues} from '../../helpers';
import {FeedbackType} from '@/core/types';

import styles from './feedback-form.module.scss';

type FormErrorType = Partial<FeedbackType>;
type FormStateType = {formValues: FeedbackType; errors?: FormErrorType};

export const FeedbackForm: FC = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<FormStateType>({formValues: {name: '', text: ''}});
  const isLoading = useSelector(feedbackStatusSelector) === FeedbackStatuses.LOADING;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormState((state) => ({
      formValues: {...state.formValues, [name]: value},
      errors: {...state.errors, [name]: ''}
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = getEmptyFormValues(formState.formValues as FeedbackType);
    const noFormErrors = Object.keys(validationErrors).length === 0;

    noFormErrors
      ? dispatch(postFeedbackStart(formState.formValues))
      : setFormState((state) => ({...state, errors: validationErrors}));
  };

  const textError = formState?.errors?.text;
  const nameError = formState?.errors?.name;
  const errorAnimateProps = {className: styles.error, initial: {opacity: 0}, animate: {opacity: 1}, exit: {opacity: 0}};
  return (
    <>
      <form className={styles.form} data-testid="feedback-form" onSubmit={handleSubmit}>
        <h1 className={styles.header}>Have any thoughts or ideas? Share them with us below</h1>

        <fieldset className={styles.fieldset}>
          <input
            id={NAME_FIELD}
            name={NAME_FIELD}
            value={formState.formValues.name}
            className={styles.input}
            placeholder="Your name or e-mail"
            onChange={handleInputChange}
          />
          <AnimatePresence>{nameError && <motion.div {...errorAnimateProps}>{nameError}</motion.div>}</AnimatePresence>
          <textarea
            rows={10}
            id={TEXT_FIELD}
            name={TEXT_FIELD}
            value={formState.formValues.text}
            className={styles.text}
            placeholder="Write feedback"
            onChange={handleInputChange}
          />
          <AnimatePresence>{textError && <motion.div {...errorAnimateProps}>{textError}</motion.div>}</AnimatePresence>
          <Separator />
          <Button isSubmit loading={isLoading} disabled={isLoading}>
            Submit
          </Button>
        </fieldset>
      </form>
    </>
  );
};
