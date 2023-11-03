import {call, type PutEffect, type CallEffect, put} from 'redux-saga/effects';
import {postFeedbackError, postFeedbackSuccess} from '../features/feedback';
import type {PayloadAction} from '@reduxjs/toolkit';
import {FeedbackType} from '@/core/types';
import {postFeedback} from '@/core';

type ReturnType = Generator<CallEffect | PutEffect, void, {status: string}>;

export function* postFeedbackTask({payload}: PayloadAction<FeedbackType>): ReturnType {
  const {signal} = new AbortController();

  try {
    yield call(postFeedback, {body: payload, signal});
    yield put(postFeedbackSuccess());
  } catch (e) {
    yield put(postFeedbackError());
  }
}
