export default {
  type: "object",
  properties: {
    phone: { type: 'number', },
    password: { type: 'string' }
  },
  required: ['phone', 'password']
} as const;
