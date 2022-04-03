import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { amount: '10000', from: 'PLN', to: 'USD', result: 'PLN 10,000.00 = $2,857.14'},
      { amount: '200', from: 'PLN', to: 'USD', result: 'PLN 200.00 = $57.14' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
      const resultContainer = screen.getByTestId('resultContainer');
      expect(resultContainer).toHaveTextContent(testObj.result);
      cleanup();
    };
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { amount: '20', from: 'USD', to: 'PLN', result: '$20.00 = PLN 70.00' },
      { amount: '3450', from: 'USD', to: 'PLN', result: '$3,450.00 = PLN 12,075.00' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
      const resultContainer = screen.getByTestId('resultContainer');
      expect(resultContainer).toHaveTextContent(testObj.result);
      cleanup();
    };
  });

  it('should render proper info for same currency conversion', () => {
    const testCases = [
      { amount: '100', from: 'PLN', to: 'PLN', result: 'PLN 100.00 = PLN 100.00' },
      { amount: '3450', from: 'USD', to: 'USD', result: '$3,450.00 = $3,450.00' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
      const resultContainer = screen.getByTestId('resultContainer');
      expect(resultContainer).toHaveTextContent(testObj.result);
      cleanup();
    };
  });

  it('should render proper info for negative amount conversion', () => {
    const testCases = [
      { amount: '-260', from: 'USD', to: 'USD', result: 'Wrong value...' },
      { amount: '-2', from: 'USD', to: 'USD', result: 'Wrong value...'  },
    ];

    for (const testObj of testCases) {
      render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
      const resultContainer = screen.getByTestId('resultContainer');
      expect(resultContainer).toHaveTextContent(testObj.result);
      cleanup();
    };
  });

});
