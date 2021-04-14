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