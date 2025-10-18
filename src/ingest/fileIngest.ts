   return records.map((record) => ({
     timestamp: record.timestamp,
     level: record.level,
     message: record.message,
   }));