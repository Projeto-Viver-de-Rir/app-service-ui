import 'reflect-metadata';
import createFetchMock from 'vitest-fetch-mock';
import { setActivePinia, createPinia } from 'pinia';
import { vi } from 'vitest';

const fetchMock = createFetchMock(vi);

fetchMock.enableMocks();

beforeEach(() => {
  setActivePinia(createPinia());
  fetchMock.mockReset();
});