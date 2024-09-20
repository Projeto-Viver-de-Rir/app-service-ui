import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import Dashboard from "@/views/Dashboard.vue";

vi.mock('tsyringe', async () => {
  const actual = (await vi.importActual('tsyringe')) as any;
  return {
    ...actual,
    container: {
      resolve: vi.fn().mockImplementation(() => {
        return {
          getEventsByQuery: vi.fn()
        }
      }),
    }
  };
});

describe('Dashboard', () => {
    let wrapper: any;
 
    const shallowWrapper = () => {
      wrapper = shallowMount(Dashboard);
    };
  
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    afterEach(() => {
      wrapper.unmount();
    });
  
    it('should display component content', () => {
      shallowWrapper();
      console.log(wrapper.html());
      expect(wrapper.find('.dashboard-view').exists()).toBe(true);
    });
  });