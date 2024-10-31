import { Auth } from "../Auth";
import Leads from "./leads";

class API {
  static auth = new Auth();
  static leads = new Leads();
}

export default API;
