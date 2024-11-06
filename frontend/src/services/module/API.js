import { Auth } from "../Auth";
import { Leads } from "../Leads";
import { LeadsStatus } from "../LeadsStatus";

class API {
  static auth = new Auth();
  static leads = new Leads();
  static leadStatus = new LeadsStatus();
}

export default API;
