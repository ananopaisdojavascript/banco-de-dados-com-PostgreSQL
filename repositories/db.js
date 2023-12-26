import pg from "pg"

const connect = async() => {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString: "postgres://bfovaunj:Y9Tq91yHm0kt_gqJbpVYq83M9IX2t4NW@drona.db.elephantsql.com/bfovaunj"
  })
  global.connection = pool
  return pool.connect()
}

export default connect