import Realm, { UpdateMode } from 'realm'
import uuid from 'react-native-uuid'
import { getRealm } from '../realm'

export class EventRepository {
    private realm:Realm

    private constructor(realm:Realm) {
        this.realm = realm
    }

    static async start() {
        const realm = await getRealm()
        return new EventRepository(realm)
    }

    close () {
        this.realm.close()
    }

    create ({
        date, name, frequency }: EventEntity) {
        this.realm.write(() => {
            this.realm.create('Event', {
                _id: uuid.v4(),
                date,
                name,
                frequency,
                created_at: new Date(),
                updated_at: new Date()
            })
        })
    }

    update ({
        id, date, name, frequency, createdAt }: EventEntity) {
        this.realm.write(() => {
            this.realm.create('Event', {
                _id: id,
                date,
                name,
                frequency,
                created_at: createdAt,
                updated_at: new Date()
            },UpdateMode.Modified)
        })
    }

    delete (id: string) {
        this.realm.write(() => {
            this.realm.delete(this.realm.objectForPrimaryKey('Event', id))
        })
    }

    
}