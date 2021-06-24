import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../entities/user.entity";

class UserController {
  async getOne(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get one user'
    try {
      let id = req.params;
      const user = await getConnection()
        .getRepository(User)
        .findOne(id, { relations: ["sponsor"] });
      if (!user) {
        return res.status(401).json({
          msg: "L'utilisateur n'existe pas",
        });
      }
      /* #swagger.responses[200] = {
                    description: 'User successfully obtained.',
                    schema: { $ref: '#/definitions/User' }
            } */
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getAll(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get all users'
    try {
      const users = await getConnection()
        .getRepository(User)
        .find({ relations: ["sponsor"] });
      /* #swagger.responses[200] = {
                    description: 'Users successfully obtained.',
                    schema: [{ $ref: '#/definitions/User' }]
            } */
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async createOne(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create one user'
    try {
      const userToAdd = req.body;
      console.log(userToAdd);
      if (!userToAdd.email || !userToAdd.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        return res.status(400).json({
          msg: "Requête invalide",
        });
      }

      //Insert user
      const newUser = await getConnection()
        .getRepository(User)
        .create(userToAdd);
      getConnection().getRepository(User).save(newUser);
      /*  #swagger.parameters['user'] = {
                in: 'body',
                description: 'Add an user',
                schema: { $ref: '#/definitions/User' }
        } */
      return res.status(200).json(req.body);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async updateOne(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update one user'
    try {
      console.log("update One");
      console.log(req.body);
      let user = req.body;
      if (!user.id) {
        /* #swagger.responses[400] = {
                    description: 'User id is missing.'
            } */
        return res.status(400).json({
          msg: "Il manque l'id de l'utilisateur",
        });
      }

      const updateUser = await getConnection()
        .getRepository(User)
        .update(user.id, user);
      // getConnection().getRepository(User).save(newUser);
      /*  #swagger.parameters['user'] = {
                in: 'body',
                description: 'Update an User',
                schema: { $ref: '#/definitions/User' }
        } */
      delete user.password;
      /* #swagger.responses[200] = {
                    description: 'User successfully updated.',
                    schema: {user:{ $ref: '#/definitions/User' },msg:"User successfully updated"}
            } */
      return res.status(200).json({ user, msg: "User successfully updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  }
  async deleteOne(req: Request, res: Response) {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete one user'
    try {
      const id = req.params;
      if (!id) {
        /* #swagger.responses[400] = {
                    description: 'User id is missing.'
            } */
        return res.status(400).json({
          msg: "Il manque l'id de l'utilisateur",
        });
      }
      const updateUser = await getConnection().getRepository(User).delete(id);
      // getConnection().getRepository(User).save(newUser);
      return res.status(200).json({ msg: "L'utilisateur a bien été supprimé" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
