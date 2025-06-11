/** @jest-environment node */
import request from 'supertest';

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  }));
});

import app from '../server';

const OpenAI = require('openai');

const mockCreate = OpenAI.mock.results[0].value.chat.completions.create;

function createStream(chunks) {
  return {
    async *[Symbol.asyncIterator]() {
      for (const chunk of chunks) {
        await new Promise((r) => setTimeout(r, 1));
        yield chunk;
      }
    },
  };
}

describe('/api/chat', () => {
  it('returns streamed content', async () => {
    mockCreate.mockReturnValue(
      createStream([
        { choices: [{ delta: { content: 'hello ' } }] },
        { choices: [{ delta: { content: 'world' } }] },
      ])
    );

    const res = await request(app)
      .post('/api/chat')
      .send({ messages: [{ role: 'user', content: 'hi' }] })
      .expect(200);

    expect(res.text).toContain('hello');
    expect(res.text).toContain('world');
  });

  it('validates missing messages', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({})
      .expect(400);
    expect(res.body).toEqual({ error: 'Messages are required' });
  });
});
