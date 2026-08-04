export function required(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is required`);
  return value;
}

export function paddleEnvironment(): 'sandbox' | 'production' {
  const value = required('PADDLE_ENVIRONMENT');
  if (value !== 'sandbox' && value !== 'production') throw new Error('Invalid PADDLE_ENVIRONMENT');
  return value;
}
