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

    findMany (query: string, ...args: any[]): EventEntity[] {
        const data = this.realm.objects('Event')
                        .filtered(query,...args)
                        .toJSON()
        const events = data.map<EventEntity>(item => {
            return {
                id: item._id,
                name: item.name,
                date: item.date,
                frequency: item.frequency,
                done: item.done,
                createdAt: item.created_at,
                updatedAt: item.updated_at
            }
        })

        return events
    }
    create ({
        date, name, frequency }: EventEntity) {
        return this.realm.write(() => {
            return this.realm.create('Event', {
                _id: uuid.v4(),
                date,
                name,
                frequency,
                done: false,
                created_at: new Date(),
                updated_at: new Date()
            })
        })
    }

    update ({
        id, date, name, frequency, done, createdAt }: EventEntity) {
        return this.realm.write(() => {
            return this.realm.create('Event', {
                _id: id,
                date,
                name,
                frequency,
                done,
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