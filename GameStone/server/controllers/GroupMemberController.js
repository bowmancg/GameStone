import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { groupMemberService } from "../services/GroupMembersService";
import { logger } from "../utils/Logger.js";


export class GroupMemberController extends BaseController {
    constructor() {
        super('api/groupMembers')
        this.router
            // .get("/:id", this.getGroupMemberById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createMember)
            .delete('/:id', this.deleteMember)
    }

    // async getGroupMemberById(req, res, next) {
    //     try {
    //         let groupMemberId = req.params.id
    //         let groupMember = await groupMemberService.getGroupMemberById(groupMemberId)
    //         res.send(groupMember)
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    async createMember(req, res, next) {
        try {
            let memberData = req.body
            memberData.profileId = req.userInfo.id
            let member = await groupMemberService.createMember(memberData)
            res.send(member)
        } catch (error) {
            next(error)
        }
    }

    async deleteMember(req, res, next) {
        try {
            logger.log('deleteMember Controller', req)
            let userId = req.userInfo.id
            let groupMemberId = req.params.id
            let message = await groupMemberService.deleteGroupMember(groupMemberId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }
}