import org.restlet.representation.* ;
import org.restlet.data.* ;
import org.restlet.ext.json.* ;
import org.restlet.resource.* ;
import org.restlet.ext.jackson.* ;

import org.json.* ;
import nojava.* ;
import java.io.IOException ;



import java.io.IOException;

public class Reccuring extends ServerResource {
    @Get
    public Representation get_action (Representation rep) throws IOException {
        setStatus( org.restlet.data.Status.SERVER_ERROR_INTERNAL ) ;
//        StringRepresentation(doc, MediaType.APPLICATION_JSON);
        Status status = new Status() ;
        status.message="API test";
        status.status="OK!";
        return new JacksonRepresentation<>(status) ;
    }

}
