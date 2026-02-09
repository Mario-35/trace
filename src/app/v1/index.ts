import { Router } from "express"
import { userRoutesV1 } from "./example-users/http"

export const v1Routes = Router()

// Registra todas as rotas da v1
v1Routes.use("/users", userRoutesV1)

// Rota de informação da versão
v1Routes.get("/", (_req, res) => {
  res.json({
    version: "v1",
    description: "API version 1"
  })
})
