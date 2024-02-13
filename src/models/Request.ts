export interface Request<TEntity>{
  config:any
  data:TEntity
  headers:any
  request:{}
  status:number
  statusText:string
}
