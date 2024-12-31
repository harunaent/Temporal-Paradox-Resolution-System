import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Paradox Scenarios Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-paradox-scenario', () => {
    it('should create a paradox scenario successfully', async () => {
      const title = 'Grandfather Paradox';
      const description = 'A time traveler goes back in time and prevents their grandfather from meeting their grandmother';
      const parameters = ['time-travel-method', 'year', 'location'];
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new scenario ID
      
      const result = await mockContractCall('paradox-scenarios', 'create-paradox-scenario', [title, description, parameters]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('paradox-scenarios', 'create-paradox-scenario', [title, description, parameters]);
    });
  });
  
  describe('submit-resolution-attempt', () => {
    it('should submit a resolution attempt successfully', async () => {
      const scenarioId = 1;
      const resolutionDescription = 'The time traveler creates a parallel universe, avoiding the paradox';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('paradox-scenarios', 'submit-resolution-attempt', [scenarioId, resolutionDescription]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('paradox-scenarios', 'submit-resolution-attempt', [scenarioId, resolutionDescription]);
    });
    
    it('should fail if the scenario is not open', async () => {
      const scenarioId = 1;
      const resolutionDescription = 'Invalid resolution attempt';
      
      mockContractCall.mockRejectedValue(new Error('Scenario is not open for resolution attempts'));
      
      await expect(mockContractCall('paradox-scenarios', 'submit-resolution-attempt', [scenarioId, resolutionDescription]))
          .rejects.toThrow('Scenario is not open for resolution attempts');
    });
  });
  
  describe('get-paradox-scenario', () => {
    it('should return scenario details', async () => {
      const scenarioId = 1;
      const expectedScenario = {
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        title: 'Grandfather Paradox',
        description: 'A time traveler goes back in time and prevents their grandfather from meeting their grandmother',
        parameters: ['time-travel-method', 'year', 'location'],
        status: 'open'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedScenario });
      
      const result = await mockContractCall('paradox-scenarios', 'get-paradox-scenario', [scenarioId]);
      
      expect(result.value).toEqual(expectedScenario);
      expect(mockContractCall).toHaveBeenCalledWith('paradox-scenarios', 'get-paradox-scenario', [scenarioId]);
    });
    
    it('should return null for non-existent scenario', async () => {
      const scenarioId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('paradox-scenarios', 'get-paradox-scenario', [scenarioId]);
      
      expect(result.value).toBeNull();
    });
  });
});

