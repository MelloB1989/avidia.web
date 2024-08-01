import { createClient } from 'redis';

const client = await createClient({
  url: 'redis://18.60.251.59:6379'
})
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();
