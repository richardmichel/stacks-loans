import Contract from "./schema";

// Record log Contract
export function saveTransaction(data, callback) {
  console.log("**** save *****");
  console.log(data);
  const logTrans = new Contract({
    data,
  });
  logTrans.save((error) => {
    if (error) {
      console.log(error);
      callback(error, true);
    }
    console.log("Log transaction saved correctly!");
    callback(logTrans);
  });
}
