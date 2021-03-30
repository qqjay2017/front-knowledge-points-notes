import { Controller } from "egg";


export default class NewController extends Controller {
    public async deleteById() {
        const { ctx } = this
        const {newsId , commentId } = ctx.params
   
        ctx.body = {
            newsId,
            commentId
        }
    }

}