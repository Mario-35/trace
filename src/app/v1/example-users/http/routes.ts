import { Router } from "express"
// import { PrismaUserRepository } from "../repository"
// import UserHttpController from "./controller"
// import { UserCreateUseCase } from "../use-cases"

export const userRoutesV1 = Router()

// Factory function para criar o controller com suas dependências
// function createUserController() {
//   const userRepository = new PrismaUserRepository()

//   return new UserHttpController({
//     get: new UserGetUseCase(userRepository),
//     save: new UserCreateUseCase(userRepository),
//     update: new UserUpdateUseCase(userRepository),
//     delete: new UserDeleteUseCase(userRepository),
//     list: new UserListUseCase(userRepository)
//   })
// }

// const controller = createUserController()

// Registra todas as rotas da v1
// userRoutesV1.post("/", async (req: Request, res: Response) => {
//   const httpResponse = await controller.create(req)
//   res.status(httpResponse.statusCode).json(httpResponse.body)
// })

// userRoutesV1.get("/", async (req: Request, res: Response) => {
//   const httpResponse = await controller.list(req)
//   res.status(httpResponse.statusCode).json(httpResponse.body)
// })
