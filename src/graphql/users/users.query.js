import gql from "graphql-tag";

export const FIND_USERS = gql`
    query findUsers($filter: String, $page: Int, $limit: Int) {
        getUsers(filter: $filter, page: $page, limit: $limit) {
            currentPage
            totalPage
            users {
                id
                name
                avatar
            }
        }
    }
`;

export const FIND_USERS_BY_ID = gql`
    query findUsersById($id: Int!) {
        getUsersById(id: $id) {
            id
            name
            birthday
            phone
            avatar
            email
            userActionId
            status
        }
    }
`;

export const FIND_LIST_FRIENDS = gql`
    query findListFriends($filter: String) {
        findListFriends(filter: $filter) {
            id
            name
            avatar
            email
        }
    }
`;