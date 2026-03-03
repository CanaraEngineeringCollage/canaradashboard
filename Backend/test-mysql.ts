import { DataSource } from 'typeorm';
const ds = new DataSource({
  type: 'mysql',
  database: 'test',
});
const qb = ds.manager.createQueryBuilder().select('f').from('faculty', 'f');
qb.orderBy('f.priority IS NULL', 'ASC');
qb.addOrderBy('f.priority', 'ASC');
console.log(qb.getSql());
