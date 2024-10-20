import { Math } from './Math'
// tests unitários

// describe = criando grupo de testes
// Testando a biblioteca Math
describe('Testing Math library', () => {

    // beforeEach = execute essa função ANTES de cada teste
    beforeEach(() => {
        // bla, bla, bla
    })

    // afterEach = execute essa função DEPOIS de cada teste
    afterEach(() => {
        // bla, bla, bla
    })

    // beforeAll = execute essa função ANTES de todos

    // afterAll = execute essa função DEPOIS de todos

    // O que o teste tem que verificar?
    // test() ou it() // comandos para testes
    // ('tem que somar dois números corretamente')
    // it = isso/ele
    it('should sum two numbers correctly', () => {
        const response = Math.sum(5, 10)
        expect(response).toBe(15) // qual a resposta esperada
    })
    it('should subtract two numbers correctly', () => {
        const response = Math.sub(4, 2)
        expect(response).toBe(2)
    })
    it('should multiply two numbers correctly', () => {
        const response = Math.mut(3, 5)
        expect(response).toBe(15)

    })
    it('should divide two numbers correctly', () => {
        const response = Math.div(15, 5)
        expect(response).toBe(3)

        const response2 = Math.div(3, 0)
        // expect(response2).toThrow(new Error('Não divide por zero')) // para retornar uma mensagem de erro
        expect(response2).toBe(false)
    })
    // it.only = para executar apenas este teste.
    it('Contar quantos caracteres tem na string', () => {
        const response = 'Glauco'
        expect(response).toHaveLength(6)
    })

    it('se possui a propriedade EMAIL', () => {
        const response = {
            name: 'Glauco',
            email: 'glauco@gmail.com'
        }

        expect(response).toHaveProperty('email')
    })


})
