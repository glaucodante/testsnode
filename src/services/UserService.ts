import bcrypt from 'bcrypt'
import { User } from '../models/User'

// função para criar usuário
export const createUser = async (email: string, password: string) => {
    const hasUSer = await User.findOne({ where: { email } }) // verificando se o email já existe
    if (!hasUSer) {
        const hash = bcrypt.hashSync(password, 10) // criptografa a senha
        const newUser = await User.create({
            email,
            password: hash
        })
        return newUser
    } else {
        return new Error('E-mail já existe')
    }

}
// buscando pelo email
export const findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } })
}
// comparando a senha pura com o hash da senha
export const matchPassword = (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted)
}
// listando todos
export const all = async () => {
    return await User.findAll()
}