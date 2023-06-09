import { Logger } from "sass"
import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { groupsService } from "./GroupsService"


class GroupMemberService {
    async getProfileGroups(profileId) {
        const groups = await dbContext.GroupMember.find({ profileId })
            .populate('profile').populate('group')
            // .populate('profile')
        return groups
    }

    async createMember(memberData) {
        const memberCheck = await dbContext.GroupMember.exists(memberData);
        if (memberCheck) {
            throw new BadRequest("You can't take another spot.")
        }
        const group = await groupsService.getGroupById(memberData.groupId)
        if (group.isPublic == false) {
            throw new Forbidden("This is a private group.")
        }
        const member = await dbContext.GroupMember.create(memberData)
        await member.populate("profile", "name picture")
        await member.populate("group")
        member.isRestricted = false
        await member.save()
        return member
    }

    async getMyGroups(groupId) {
        let groups = await dbContext.Groups.find({ groupId })
            .populate({
                path: "group",
                populate: {
                    path: "profile",
                    select: "name picture"
                }
            })
        return groups
    }

    async getGroupMembers(groupId) {
        let members = await dbContext.GroupMember.find({ groupId })
            .populate('profile', 'name picture')
        return members
    }

    // async getGroupMemberById(groupMemberId) {
    //     const groupMember = await dbContext.GroupMember.findById(groupMemberId)
    //         .populate("profile", "name picture")
    //     if (groupMember == null) {
    //         throw new BadRequest("ERROR ERROR")
    //     }
    //     return groupMember
    // }

    async deleteGroupMember(groupMemberId, userId) {
        let groupMember = await dbContext.GroupMember.findById(groupMemberId)
        if (groupMember == null) {
            throw new BadRequest('That member is not found.')
        }
        if (groupMember.profileId != userId) {
            throw new Forbidden("You are not allowed to delete this.")
        }

        // if (groupMember.isRestricted == true) {
        //     throw new BadRequest("You cannot access this group.")
        // }
        // groupMember.isRestricted = true
        await groupMember.remove()
        return groupMember
    }
}

export const groupMemberService = new GroupMemberService()