import Realm from 'realm'

import { EventSchema } from './schema/EventSchema'

export const getRealm = async () => await Realm.open({
    path: 'event-control',
    schema: [ EventSchema ],
    schemaVersion: 2
})