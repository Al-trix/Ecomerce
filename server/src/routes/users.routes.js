import { Router } from 'express';

const usersRoutes = Router();

const routeAuth = '/auth';

usersRoutes.get(`${routeAuth}/users`, (req, res) => {
  res.end('Login');
});

usersRoutes.get(`${routeAuth}/login/:id`, (req, res) => {
  res.end('User' + req.params.id);
});

usersRoutes.post(`${routeAuth}/register`, (req, res) => {
  res.end('User');
});

usersRoutes.delete(`${routeAuth}/user/:id`, (req, res) => {
  res.end('User' + req.params.id);
});

usersRoutes.put(`${routeAuth}/user/:id`, (req, res) => {
  res.end('Actualizando user' + req.params.id);
});


export default usersRoutes;
