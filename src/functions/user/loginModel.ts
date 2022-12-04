export default {
  type: "object",
  properties: {
    phoneNumber: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['phoneNumber', 'password']
} as const;
