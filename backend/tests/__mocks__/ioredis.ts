const mockRedisStore: Record<string, string> = {};
const activeTimeouts: NodeJS.Timeout[] = [];

class RedisMock {
  async get(key: string): Promise<string | null> {
    return mockRedisStore[key] || null;
  }

  async mget(...keys: string[]): Promise<(string | null)[]> {
    return keys.map((key) => mockRedisStore[key] || null);
  }

  async set(key: string, value: string, mode: string, duration: number): Promise<string> {
    mockRedisStore[key] = value;

    const timeout = setTimeout(() => {
      delete mockRedisStore[key];
    }, duration * 1000);

    activeTimeouts.push(timeout);
    return "OK";
  }

  async del(key: string): Promise<number> {
    delete mockRedisStore[key];
    return 1; // Number of keys deleted
  }
}

export const resetRedisMock = () => {
  jest.clearAllMocks();
  activeTimeouts.forEach((timeout) => clearTimeout(timeout));
  activeTimeouts.length = 0;
  Object.keys(mockRedisStore).forEach((key) => delete mockRedisStore[key]);
};

export default RedisMock;
