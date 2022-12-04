export default {
  type: "object",
  properties: {
    role: { type: 'string' },
    name: { type: 'string' },
    phoneNumber: { type: 'string' },
    age: { type: 'number' },
    pincode: { type: 'number' },
    aadharNo: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['name', 'phoneNumber', 'age', 'pincode', 'aadharNo', 'password']
} as const;
