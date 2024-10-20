/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  detectOpenHandles: true, // procurará quando houver requisicoes em aberto
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};