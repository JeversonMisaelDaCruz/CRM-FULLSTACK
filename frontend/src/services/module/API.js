import { Auth } from "../Auth";
import { Leads } from "../Leads";
import { PipelinePhase } from "../PipelinePhase";

class API {
  static auth = new Auth();
  static leads = new Leads();
  static PipelinePhase = new PipelinePhase();
}

export default API;
