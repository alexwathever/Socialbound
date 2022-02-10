import DatabaseMySQL from "../DB/DatabaseMySQL";
import Account from "../Model/Account";

class AccountRepository{
    db = DatabaseMySQL.instance();

    findByUsernameAndPassword(username, password){
        return new Promise(async (resolve, reject) => {   
            var self = this;
            var sql = "SELECT * FROM `account` WHERE `username` = ? AND `password` = ?";
            var params = [username, password];
            this.db.connection
            .query(sql, params, function(err, result, fields){
                self.db.connection.end();
                if(err){
                    reject(err);
                }
                if(result.length > 0){
                    var account = Account.fromHashMap(result[0]);
                    resolve(account);
                }
                else{
                    resolve(null);
                }
            });
        })
    }
}

export default AccountRepository;