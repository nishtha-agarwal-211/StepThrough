// Vercel serverless functions have a read-only filesystem, 
// so we use an in-memory mock database here for deployment demo purposes.
let memoryDb: any = { users: [] };

export function getDb() {
  return memoryDb;
}

export function saveDb(data: any) {
  memoryDb = data;
}

