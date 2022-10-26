export const EventSchema = {
    name: 'Event',
    properties: {
        _id: 'string',
        date: 'date',
        name: 'string',
        done: 'bool',
        frequency: 'int',
        created_at: 'date',
        updated_at: 'date'
    },
    primaryKey: '_id'
}