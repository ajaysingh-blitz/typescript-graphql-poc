
import App from "./app";
import ExternalRoute from "./routes/external.route";
import IndexRoute from "./routes/index.route";
class Server {

public app: App;

constructor(){
    this.app = new App([new IndexRoute(), new ExternalRoute()]);
    this.app.listen();
}
}

export default new Server();