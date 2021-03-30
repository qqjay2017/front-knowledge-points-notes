import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.delete('/news/:newsId/:commentId',controller.new.deleteById)
};
