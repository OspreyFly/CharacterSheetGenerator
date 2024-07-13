const MockAdapter = require('axios-mock-adapter');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = window.document;
const axios = require('axios');
const { createElementOption, populateDropdown, fetchData, API_BASE_URL } = require("./utility") ;

let mock;

// Mock for the Option constructor

describe('createElementOption', () => {
    it('creates an option element with correct value and text', () => {
      const option = createElementOption('value', 'text');
      expect(option.value).toBe('value');
      expect(option.text).toBe('text');
    });
  });

  describe('populateDropdown', () => {
    it('populates a select element with options', () => {
        const select = document.createElement('select');
        populateDropdown(select, ['option1', 'option2']);
        
        expect(select.options.length).toBe(2);
        expect(select.options[0].value).toBe('option1');
        expect(select.options[0].text).toBe('option1');
        expect(select.options[1].value).toBe('option2');
        expect(select.options[1].text).toBe('option2');
    });
});

  
  describe('fetchData', () => {
    let mock;
  
    beforeEach(() => {
      mock = new MockAdapter(axios);
    });
  
    afterEach(() => {
      mock.restore();
    });
  
    it('returns data from the API', async () => {
      const mockData = { data: 'test data' };
      mock.onGet(API_BASE_URL + 'dummy-endpoint').reply(200, mockData);
      const result = await fetchData(API_BASE_URL + 'dummy-endpoint');
      expect(result).toEqual(mockData);
    });
  
    it('handles errors', async () => {
      mock.onGet(API_BASE_URL + 'dummy-endpoint').networkError();
      await expect(fetchData(API_BASE_URL + 'dummy-endpoint')).rejects.toThrow('Network Error');
    });
  });
  
  
  
  