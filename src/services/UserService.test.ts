import { User, UserInstance } from '../models/User'
import * as UserService from './UserService'

describe('Testing user service', () => {
    // email padrão para o teste
    let email = 'teste@jest.com'
    let password = '1234'

    // beforeAll = execute essa função ANTES de todos os testes
    beforeAll(async () => {
        await User.sync({ force: true })
    })
    // criando usuário
    it('should create a new user', async () => {
        const newUser = await UserService.createUser(email, password) as UserInstance
        expect(newUser).not.toBeInstanceOf(Error) // espero que o usuário nâo seja uma instância de erro
        expect(newUser).toHaveProperty('id') // usuário tem que ter ID
        expect(newUser.email).toBe(email) // verificando se o email enviado é de fato o email criado
    })
    // se tentar criar usuário com email existente
    it('should not allow to create a user with existing email', async () => {
        const newUser = await UserService.createUser(email, password)
        expect(newUser).toBeInstanceOf(Error)
    })
    // procure um usuário pelo email
    it('should find a user by the email', async () => {
        const user = await UserService.findByEmail(email) as UserInstance
        expect(user.email).toBe(email)
    })
    // verificando senha - (deu certo)
    it('should match the password from database', async () => {
        const user = await UserService.findByEmail(email) as UserInstance
        const match = UserService.matchPassword(password, user.password)
        expect(match).toBeTruthy()
    })
    // não verificando a senha - (não deu certo)
    it('should not match the password from database', async () => {
        const user = await UserService.findByEmail(email) as UserInstance
        const match = UserService.matchPassword('invalid', user.password)
        expect(match).toBeFalsy()
    })
    // buscando a lista
    it(' should get a list of users', async () => {
        const users = await UserService.all()
        expect(users.length).toBeGreaterThanOrEqual(1)
        for (let i in users) {
            expect(users[i]).toBeInstanceOf(User)
        }
    })
})