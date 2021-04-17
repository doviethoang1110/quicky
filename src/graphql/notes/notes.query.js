import {gql} from '@apollo/client';

export const FIND_NOTES = gql`
    query findNotes($filter: String, $sort: String, $attributes: String) {
        getNotes(filter: $filter, sort: $sort, attributes: $attributes) {
            id
            title
            details
            tag
            date
        }
    }
`;