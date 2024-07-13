
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { createElementOption, populateDropdown, fetchData, API_BASE_URL } from "./utility.js";

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
jest.mock('axios');

describe('createElementOption', () => {
  it('creates an option element with correct value and text', () => {
    const option = createElementOption('value', 'text');
    expect(option.value).toBe('value');
    expect(option.textContent).toBe('text'); // Note: Changed from .text to .textContent
  });
});

describe('populateDropdown', () => {
  it('populates a select element with options', () => {
    const select = document.createElement('select');
    populateDropdown(select, ['option1', 'option2']);

    expect(select.options.length).toBe(2);
    expect(select.options[0].value).toBe('option1');
    expect(select.options[0].textContent).toBe('option1'); // Note: Changed from .text to .textContent
    expect(select.options[1].value).toBe('option2');
    expect(select.options[1].textContent).toBe('option2'); // Note: Changed from .text to .textContent
  });
});

  
describe('fetchData', () => {
  it('returns data from the API', async () => {
    axios.get.mockResolvedValue({ data: 'test data' });
    const result = await fetchData(API_BASE_URL + 'dummy-endpoint');
    expect(result).toEqual('test data');
  });

  it('handles errors', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));
    await expect(fetchData(API_BASE_URL + 'dummy-endpoint')).rejects.toThrow('Network Error');
  });
});
  
  
  
  