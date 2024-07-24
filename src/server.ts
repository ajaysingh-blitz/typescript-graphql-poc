
import App from "./app";
import IndexRoute from "./routes/index.route";
class Server {

public app: App;

constructor(){
    this.app = new App([new IndexRoute()]);
    this.app.listen();
}
}

export default new Server();