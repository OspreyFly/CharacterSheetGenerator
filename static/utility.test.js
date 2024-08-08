import { JSDOM } from 'jsdom';
import { createElementOption, populateDropdown, fetchData, API_BASE_URL } from "./utility.js";

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;

// Your test cases follow...


describe('createElementOption', () => {
  it('creates an option element with correct value and text', () => {
    const option = createElementOption('value', 'text');
    expect(option.value).toBe('value');
    expect(option.textContent).toBe('text'); 
  });
});

describe('populateDropdown', () => {
  it('populates a select element with options', () => {
    const select = document.createElement('select');
    populateDropdown(select, ['option1', 'option2']);

    expect(select.options.length).toBe(2);
    expect(select.options[0].value).toBe('option1');
    expect(select.options[0].textContent).toBe('option1'); 
    expect(select.options[1].value).toBe('option2');
    expect(select.options[1].textContent).toBe('option2');
  });
});

  
describe('fetchData', () => {
  it('returns data from the API', async () => {
    // Reset the mock to ensure it's clean between tests
    jest.resetAllMocks();

    // Mock fetch to resolve with some data
    // Adjusting the fetch mock to include a status
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: 'test data' }),
    })
  );


    const result = await fetchData(API_BASE_URL + 'dummy-endpoint');
    expect(result).toEqual({ data: 'test data' });

    // Ensure fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('handles errors', async () => {
    // Reset the mock to ensure it's clean between tests
    jest.resetAllMocks();

    // Mock fetch to reject with an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

    await expect(fetchData(API_BASE_URL + 'dummy-endpoint')).rejects.toThrow('Network Error');

    // Ensure fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

  
  
  
  