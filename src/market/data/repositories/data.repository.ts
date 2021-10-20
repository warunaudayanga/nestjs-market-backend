import { EntityRepository, Repository } from "typeorm";
import { Data } from "../entities/data.entity";

@EntityRepository(Data) export class DataRepository extends Repository<Data> {}
