import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import org.json.JSONException;
import org.restlet.data.MediaType;
import org.restlet.ext.jackson.JacksonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;
import com.mongodb.MongoClient ;
import com.mongodb.MongoClientURI ;
import com.mongodb.client.MongoCollection ;
import com.mongodb.client.MongoDatabase ;
import org.bson.Document ;
import org.bson.BsonString ;
import sun.lwawt.macosx.CSystemTray;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Transfer extends ServerResource {

    @Put
    public Representation put_action(Representation rep) throws JSONException {
        MongoClient mongo = new MongoClient( new MongoClientURI( Main.MONGO_URL ) ) ;

        // Accessing the database
        MongoDatabase database = mongo.getDatabase(Main.database) ;
        MongoCollection<Document> collection = database.getCollection(Main.collection) ;
        JacksonRepresentation<TransferData> transRep =
                new JacksonRepresentation<TransferData> ( rep, TransferData.class ) ;

        try {
            TransferData transferObject = transRep.getObject();
            BasicDBObject dbObject=new BasicDBObject();
            dbObject.put("email",transferObject.accountId1);
            MongoCursor<Document> cursor = collection.find(dbObject).iterator();
            try {
                while (cursor.hasNext()) {
                    Document doc=cursor.next();
                    System.out.println(doc.getString("firstdeposit"));
                }
            } finally {
                cursor.close();
            }
        }
        catch (Exception e){
            System.out.println(e);
        }

        return new StringRepresentation("Transaction Success", MediaType.APPLICATION_JSON);
    }
}
