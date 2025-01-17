export interface ICounterRepository {
    findAndUpdateSequence(name: string): Promise<number>
}