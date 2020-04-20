import Router from 'koa-router';
import Task from '../models/task-model.js';
const router = new Router();

const authCheck = async (ctx, next) => {
    if(!ctx.state.user){
        ctx.response.poststatus = 403;
        return;
    } else {
        return next();
    }
};

router.post('/add-task', authCheck, async (ctx) => {
    const body = ctx.request.body;
    console.log({ body });

    new Task({
      userId: ctx.state.user.id,
      calendarId: ctx.state.user.primaryCalendarId,
      name: body.name,
      description: body.description,
      isCompleted: false,
      timeEstimateInMinutes: body.timeEstimateInMinutes,
    })
      .save();

    ctx.response.status = 200;
});

router.get('/get-tasks', authCheck, async (ctx) => {
    var tasks = await Task.find({ userId: ctx.state.user.id });

    ctx.body = {
        items: tasks
    };
});

export default router;
