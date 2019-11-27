import org.restlet.Application;
import org.restlet.Component;
import org.restlet.Restlet;
import org.restlet.data.Protocol;
import org.restlet.routing.Router;

public class Main extends Application {
     static String MONGO_URL = "mongodb+srv://kowshhal:gopi123@devconnector-kskyr.mongodb.net/test?retryWrites=true&w=majority";
     static String collection="accounts";
     static String database="test";
    public static void main(String[] args) {
        try {
            Component server = new Component();
            server.getServers().add(Protocol.HTTP, 80);
            server.getDefaultHost().attach(new Main());
            try {
                server.start();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public Restlet createInboundRoot() {
        Router router = new Router(getContext());
        router.attach("/", Reccuring.class);
        router.attach("/transfer",Transfer.class);
        return router;
    }

}
