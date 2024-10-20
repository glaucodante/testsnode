import { list } from './../controllers/apiController';
import request from 'supertest'
import app from '../app'
import { User } from '../models/User'

describe('Testing api routes', () => {

    // email padrão para o teste
    let email = 'teste@jest.com'
    let password = '1234'

    // beforeAll = execute essa função ANTES de todos os testes
    beforeAll(async () => {
        await User.sync({ force: true })
    })

    it('should ping pong', (done) => {
        request(app)
            .get('/ping')
            .then(response => {
                expect(response.body.pong).toBeTruthy()
                return done()
            })
    })
    // deve registrar novo usuário 
    it('should register a new user', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`) // para mandar os dados no formato URL ENCODED
            .then(response => {
                expect(response.body.error).toBeUndefined() // se vier undefined então deu certo
                expect(response.body).toHaveProperty('id')
                return done()
            })
    })

    // tentando registrar um usuário com o mesmo email
    // não deve registrar um usuário com um email existente
    it('should not allow register with existing email', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`) // para mandar os dados no formato URL ENCODED
            .then(response => {
                expect(response.body.error).not.toBeUndefined()
                return done()
            })
    })

    // registro sem a senha
    it('should not allow to register without password', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}`) // para mandar os dados no formato URL ENCODED
            .then(response => {
                expect(response.body.error).not.toBeUndefined()
                return done()
            })
    })

    // registro sem o email
    it('should not allow to register without email', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}`) // para mandar os dados no formato URL ENCODED
            .then(response => {
                expect(response.body.error).not.toBeUndefined()
                return done()
            })
    })

    // registro sem mandar os dados
    it('should not allow to register without any data', (done) => {
        request(app)
            .post('/register')
            .send(``)
            .then(response => {
                expect(response.body.error).not.toBeUndefined()
                return done()
            })
    })

    // Deve fazer o login com os dados corretos
    it('should login correctly', (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=${password}`) // para mandar os dados no formato URL ENCODED
            .then(response => {
                expect(response.body.error).toBeUndefined()
                expect(response.body.status).toBeTruthy()
                return done()
            })
    })

    // fazendo login com os dados INcorretos (senha errada)
    it('should not login with incorrect data', (done) => {
        request(app)
            .post('/login')
            .send(`email=${email}&password=invalid`) // para mandar os dados no formato URL ENCODED
            .then(response => {
                expect(response.body.error).toBeUndefined()
                expect(response.body.status).toBeFalsy()
                return done()
            })
    })

    // Deve listar usuários
    it('should list users', (done) => {
        request(app)
            .get('/list')
            .then(response => {
                expect(response.body.error).toBeUndefined()
                expect(response.body.list.length).toBeGreaterThanOrEqual(1) // pelo menos 1 item
                expect(response.body.list).toContain(email) // tem que conter o email
                return done()
            })
    })
})