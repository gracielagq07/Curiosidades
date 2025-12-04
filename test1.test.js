import { test, expect, vi, describe, beforeEach } from 'vitest';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn(key => {
      delete store[key];
    }),
    setItem: vi.fn((key, value) => {
        store[key] = value.toString();
    }),
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

function saveQuoteLogic(currentInsight, savedQuotes) {
    if (!currentInsight) {
        return false;
    }

    const isDuplicate = savedQuotes.some(quote => quote.value === currentInsight.value);
            
    if (isDuplicate) {
        return 'duplicate';
    }

    savedQuotes.push(currentInsight);
    localStorage.setItem('motivaNowQuotes', JSON.stringify(savedQuotes));

    return savedQuotes;
}

describe('Pruebas de Lógica: saveCurrentQuote', () => {
    
    const mockQuote = {
        id: 1, 
        value: 'Frase de prueba única', 
        author: 'Test' 
    };
    
    beforeEach(() => {
      localStorageMock.clear(); 
      localStorageMock.setItem.mockClear(); 
    });

    test('Debe guardar una frase nueva correctamente', () => {
        let initialQuotes = [];
        
        const result = saveQuoteLogic(mockQuote, initialQuotes);

        expect(result).toHaveLength(1); 
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    });

    test('Debe bloquear el guardado si la frase ya existe (Duplicado)', () => {
        let initialQuotes = [mockQuote]; 
        const result = saveQuoteLogic(mockQuote, initialQuotes); 
        expect(result).toBe('duplicate');
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(0); 
    });

    test('Debe bloquear el guardado si currentInsight es nulo', () => {
        let initialQuotes = [];
        
        const result = saveQuoteLogic(null, initialQuotes); 
        expect(result).toBe(false);
        expect(localStorageMock.setItem).toHaveBeenCalledTimes(0);
    });
});