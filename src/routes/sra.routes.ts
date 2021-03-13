import { Router } from 'express';
const routes = Router();

routes.get('/', (req, res, next) => {
  res.json({message: "Tudo ok por aqui!"});
})

routes.post('/send', (req, res, next) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const assunto = req.body.assunto;
  const mensagem = req.body.mensagem;
  require("../controller/nodemail")(nome, email, assunto, mensagem)
      .then((response: Response) => res.json(response))
      .catch((error: Error) => res.json(error));
})

export default routes;