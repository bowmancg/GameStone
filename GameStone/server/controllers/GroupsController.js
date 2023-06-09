import { Auth0Provider } from "@bcwdev/auth0provider";
import { groupsService } from "../services/GroupsService";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";
import { groupMemberService } from "../services/GroupMembersService";
import { logger } from "../utils/Logger.js";


export class GroupsController extends BaseController {
    constructor() {
        super('api/groups')
        this.router
            .get("", this.getAllGroups)
            .get("/:id", this.getGroupById)
            .get("/:id/groupMembers", this.getGroupMembers)
            .get("/:id/comments", this.getGroupComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put("/:id", this.editGroup)
            .delete("/:id", this.deleteGroup)
            .post("", this.createGroup)
    }

    async getAllGroups(req, res, next) {
        try {
            let query = req.query.query
            let groups = await groupsService.getAllGroups(query)
            res.send(groups)
        } catch (error) {
            next(error)
        }
    }

    async createGroup(req, res, next) {
        try {
            let groupData = req.body
            groupData.creatorId = req.userInfo.id
            let group = await groupsService.createGroup(groupData)
            res.send(group)
        } catch (error) {
            next(error)
        }
    }

    async getGroupById(req, res, next) {
        try {
            let groupId = req.params.id
            let group = await groupsService.getGroupById(groupId)
            res.send(group)
        } catch (error) {
            next(error)
        }
    }
    async editGroup(req, res, next) {
        try {
            const groupEdit = req.body
            const groupId = req.params.id
            const userId = req.userInfo.id
            logger.log('GROUP CONTROLLER', groupEdit, groupId, userId)
            const editedGroup = await groupsService.editGroup(groupEdit, groupId, userId)
            res.send(editedGroup)
        } catch (error) {
            next(error)
        }
    }

    async deleteGroup(req, res, next) {
        try {
            let userId = req.userInfo.id
            let groupId = req.params.id
            let message = await groupsService.deleteGroup(groupId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getGroupComments(req, res, next) {
        try {
            let groupId = req.params.id
            let comments = await commentsService.getGroupComments(groupId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async getGroupMembers(req, res, next) {
        try {
            let groupId = req.params.id
            let members = await groupMemberService.getGroupMembers(groupId)
            res.send(members)
        } catch (error) {
            next(error)
        }
    }
}