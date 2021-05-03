import {gql} from "@apollo/client";

export const FIND_CONVERSATIONS = gql`
    query findConversations($filter: String, $attributes: String, $page: Int, $limit: Int) {
        findConversations(filter: $filter, attributes: $attributes, page: $page, limit: $limit) {
            currentPage
            totalPage
            conversations {
                id
                name
                updatedAt
                lastMessage {
                    message
                    type
                    users {
                        name
                    }
                }
                image
                type
                participants {
                    id
                    name
                    avatar
                }
            }
        }
    }
`;