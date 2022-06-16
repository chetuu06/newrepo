public class batchClass implements Database.batchable{ 
    public Database.QueryLocator start(Database.BatchableContext info){ 
        return new CustomAccountIterable(); 
    }     
    public void execute(Database.BatchableContext info, List<Account> scope){
        List<Account> accsToUpdate = new List<Account>();
        for(Account a : scope){ 
            a.Name = 'true'; 
            a.NumberOfEmployees = 70; 
            accsToUpdate.add(a); 
        } 
        update accsToUpdate; 
    }     
    public void finish(Database.BatchableContext info){     
    } 
 }