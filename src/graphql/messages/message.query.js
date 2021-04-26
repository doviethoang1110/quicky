import {gql} from "@apollo/client";

export const FIND_MESSAGES = gql`
    query findMessages($conversationsId: Int, $attributes: String, $page: Int, $limit: Int) {
        findMessages(conversationsId: $conversationsId, attributes: $attributes, page: $page, limit: $limit) {
            currentPage
            totalPage
            messages {
                id
                message
                users {
                    id
                    name
                    avatar
                }
                createdAt
                type
            }
        }
    }
`;