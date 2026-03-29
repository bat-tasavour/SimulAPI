export async function simulate(config: { latency: number; errorRate: number; staticResponse?: any }) {
  if (config.latency > 0) {
    await new Promise((r) => setTimeout(r, config.latency));
  }

  if (Math.random() < config.errorRate / 100) {
    return {
      success: false,
      error: {
        code: "SIMULATED_ERROR",
        message: "Mock failure triggered by error rate configuration",
      },
    };
  }

  return { success: true };
}